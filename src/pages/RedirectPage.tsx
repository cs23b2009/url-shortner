
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const RedirectPage = () => {
  const { shortId } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortId) {
        setError('Invalid short URL');
        return;
      }

      try {
        // Find the URL by short_id
        const { data: urlData, error: fetchError } = await supabase
          .from('urls')
          .select('original_url, id, click_count')
          .eq('short_id', shortId)
          .single();

        if (fetchError || !urlData) {
          setError('URL not found');
          return;
        }

        // Increment click count
        await supabase
          .from('urls')
          .update({ click_count: (urlData.click_count || 0) + 1 })
          .eq('id', urlData.id);

        // Redirect to original URL
        window.location.href = urlData.original_url;
      } catch (error) {
        console.error('Redirect error:', error);
        setError('Failed to redirect');
      }
    };

    handleRedirect();
  }, [shortId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default RedirectPage;
