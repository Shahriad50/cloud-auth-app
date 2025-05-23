import Signup from '../components/Signup';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
function SignupPage() {
      const navigate = useNavigate();
    const handleSignup = async(credentials) => {
    try {
      const { username, email, password } = credentials;
      
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username } 
        }
      });

      if (error) {
        throw error;
      }

      console.log('Signup successful:', data);
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.message);
      // Pass error back to Signup component
      return { error: error.message };
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Signup onSubmit={handleSignup} />
    </div>
  );
}

export default SignupPage;