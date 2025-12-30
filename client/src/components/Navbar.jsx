import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Shield } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold tracking-wider">User System</Link>
                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                {user.role === 'admin' ? <Shield size={16} className="text-purple-400" /> : <User size={16} />}
                                <span className="font-medium text-white">{user.name}</span>
                            </div>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="hover:text-purple-400 transition">Dashboard</Link>
                            )}
                            <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>
                            <button onClick={logout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition">
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="hover:text-blue-300">Login</Link>
                            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;