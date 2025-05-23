import Login from '../components/Login';

function LoginPage() {
  const handleLogin = (credentials) => {
    console.log('Login submitted:', credentials);
    // Add backend API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Login onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;