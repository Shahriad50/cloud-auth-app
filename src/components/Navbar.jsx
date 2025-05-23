import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">AuthApp</Link>
        <div>
          <Link to="/login" className="text-white mr-4 hover:underline">Login</Link>
          <Link to="/signup" className="text-white hover:underline">Signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;