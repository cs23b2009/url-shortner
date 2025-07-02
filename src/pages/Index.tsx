import { UrlShortener } from '@/components/UrlShortener';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, BarChart3 } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-12">
          {/* <h1 className="text-2xl font-bold text-blue-900">URL Shortener</h1> */}
          <div className="flex gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shorten Your URLs with Ease
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create short, memorable links from long URLs. 
            {!user && " Anonymous users get 1 free link - sign up for unlimited access!"}
          </p>
        </div>

        <UrlShortener />

        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🚀 Fast & Simple</h3>
            <p className="text-gray-600">Shorten URLs instantly with just one click</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">📊 Track Clicks</h3>
            <p className="text-gray-600">Monitor how many times your links are clicked</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🔐 Secure & Reliable</h3>
            <p className="text-gray-600">Your links are safely stored and always accessible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
