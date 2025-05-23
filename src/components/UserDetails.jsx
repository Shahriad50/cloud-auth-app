import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function UserDetails({ session }) {
  const [details, setDetails] = useState({
    date_of_birth: '',
    country: '',
    city: '',
    blood_group: '',
    profession: '',
    company_name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch existing user details
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
          .select('date_of_birth, country, city, blood_group, profession, company_name')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        if (data) {
          setDetails({
            date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().split('T')[0] : '',
            country: data.country || '',
            city: data.city || '',
            blood_group: data.blood_group || '',
            profession: data.profession || '',
            company_name: data.company_name || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setError('Failed to load details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [session, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('userinfo')
        .update({
          date_of_birth: details.date_of_birth || null,
          country: details.country || null,
          city: details.city || null,
          blood_group: details.blood_group || null,
          profession: details.profession || null,
          company_name: details.company_name || null,
        })
        .eq('id', session.user.id);

      if (error) throw error;
      navigate('/');
      alert('Details saved successfully!');
    } catch (error) {
      console.error('Error saving user details:', error.message);
      setError('Failed to save details.');
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Details</h1>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={details.date_of_birth}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={details.country}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., United States"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={details.city}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., New York"
            />
          </div>
          <div>
            <label htmlFor="blood_group" className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <select
              id="blood_group"
              name="blood_group"
              value={details.blood_group}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
              Profession
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={details.profession}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={details.company_name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Tech Corp"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? 'Saving...' : 'Save Details'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserDetails;