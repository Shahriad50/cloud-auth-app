import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function UserDetailsPage({ session }) {
  const [details, setDetails] = useState({
    username: '',
    date_of_birth: '',
    country: '',
    city: '',
    blood_group: '',
    profession: '',
    company_name: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('userinfo')
          .select('username, date_of_birth, country, city, blood_group, profession, company_name')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        setDetails({
          username: data.username || 'Not set',
          date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toLocaleDateString() : 'Not set',
          country: data.country || 'Not set',
          city: data.city || 'Not set',
          blood_group: data.blood_group || 'Not set',
          profession: data.profession || 'Not set',
          company_name: data.company_name || 'Not set',
        });
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setError('Failed to load profile details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Profile</h1>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mt-4"></div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
            <Link
              to="/user-details"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Details
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Username</span>
              <span className="text-gray-800">{details.username}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Date of Birth</span>
              <span className="text-gray-800">{details.date_of_birth}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Country</span>
              <span className="text-gray-800">{details.country}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">City</span>
              <span className="text-gray-800">{details.city}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Blood Group</span>
              <span className="text-gray-800">{details.blood_group}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Profession</span>
              <span className="text-gray-800">{details.profession}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Company Name</span>
              <span className="text-gray-800">{details.company_name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetailsPage;