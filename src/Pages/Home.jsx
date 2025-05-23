import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Home({ session }) {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      // Fetch username from userinfo table
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('userinfo')
            .select('username')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;
          setUsername(data.username);
        } catch (error) {
          console.error('Error fetching userinfo:', error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUserInfo();
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Session state will be updated by App.js listener
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {session ? (
        <div className="text-center">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">
                Welcome back, {username || 'User'}!
              </h1>
              <p className="text-gray-600 mb-6">
                You are logged in to AuthApp.
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to AuthApp</h1>
          <p className="text-gray-600 mb-6">
            Please login or signup to continue.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;