import { Loader2 } from 'lucide-react';

const Button = ({ children, loading, variant = 'primary', onClick, type = 'button', className = '' }) => {
    const baseStyles = "flex items-center justify-center px-4 py-2 rounded font-bold focus:outline-none focus:shadow-outline transition duration-200";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        destructive: "bg-red-500 hover:bg-red-600 text-white",
        outline: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`${baseStyles} ${variants[variant]} ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
        >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;