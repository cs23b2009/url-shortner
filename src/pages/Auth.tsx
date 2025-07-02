
import { AuthForm } from '@/components/AuthForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
