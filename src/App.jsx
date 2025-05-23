import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import UserDetails from './components/UserDetails';
function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const publicRoutes = ['/login', '/signup'];
      if (session) {
        // Redirect to home if logged in and trying to access login/signup
        if (publicRoutes.includes(location.pathname)) {
          navigate('/');
        }
      } else {
        // Allow access to login and signup routes; redirect to login for other routes
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/login');
        }
      }
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user-details" element={<UserDetails session={session} />} />
      </Routes>
    </div>
  );
}

export default App;