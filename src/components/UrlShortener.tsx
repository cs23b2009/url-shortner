
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface UrlShortenerProps {
  onUrlCreated?: () => void;
}

export function UrlShortener({ onUrlCreated }: UrlShortenerProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const generateShortId = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const checkAnonymousLimit = async () => {
    if (user) return true; // Authenticated users have no limit

    // Get session ID from localStorage or create one
    let sessionId = localStorage.getItem('urlShortenerSession');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('urlShortenerSession', sessionId);
    }

    // Check if this session has already created a URL
    const { data } = await supabase
      .from('anonymous_usage')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    return !data; // Return true if no previous usage found
  };

  const trackAnonymousUsage = async () => {
    if (user) return; // Only track for anonymous users

    const sessionId = localStorage.getItem('urlShortenerSession');
    await supabase
      .from('anonymous_usage')
      .insert({
        ip_address: 'browser-session', // We can't get real IP in browser
        session_id: sessionId
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive"
      });
      return;
    }

    if (!isValidUrl(originalUrl)) {
      toast({
        title: "Error", 
        description: "Please enter a valid URL (including http:// or https://)",
        variant: "destructive"
      });
      return;
    }

    // Check anonymous user limit
    const canCreate = await checkAnonymousLimit();
    if (!canCreate) {
      toast({
        title: "Limit Reached",
        description: "Anonymous users can only shorten one URL. Please sign up for unlimited access!",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const shortId = generateShortId();
      
      const { error } = await supabase
        .from('urls')
        .insert({
          original_url: originalUrl,
          short_id: shortId,
          user_id: user?.id || null
        });

      if (error) throw error;

      // Track anonymous usage
      await trackAnonymousUsage();

      const shortenedUrl = `${window.location.origin}/${shortId}`;
      setShortUrl(shortenedUrl);
      
      toast({
        title: "Success!",
        description: "URL shortened successfully",
      });

      onUrlCreated?.();
    } catch (error: any) {
      console.error('Error creating short URL:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to shorten URL",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">URL Shortener</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter your long URL here..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Shortening...' : 'Shorten'}
            </Button>
          </div>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-2 bg-white border rounded text-sm font-mono break-all">
                {shortUrl}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(shortUrl, '_blank')}
                className="shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {!user && (
          <div className="text-center text-sm text-gray-600 mt-4">
            Anonymous users can shorten 1 URL. <span className="font-medium">Sign up for unlimited access!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
