import Signup from '../components/Signup';

function SignupPage() {
  const handleSignup = (credentials) => {
    console.log('Signup submitted:', credentials);
    // Add backend API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Signup onSubmit={handleSignup} />
    </div>
  );
}

export default SignupPage;