import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Login from '../components/Login';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const { email, password } = credentials;
      
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log('Login successful:', data);
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      // Pass error back to Login component
      return { error: error.message };
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Login onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;