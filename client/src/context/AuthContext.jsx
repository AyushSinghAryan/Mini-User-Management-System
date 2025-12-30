import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on app load
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser({ ...data.data, token }); // Ensure token is part of user obj if needed
                } catch (error) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);

        // Fetch full user details immediately after login
        const meResponse = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${data.token}` }
        });
        setUser(meResponse.data.data);
        return true;
    };

    const register = async (name, email, password) => {
        await api.post('/auth/register', { name, email, password });
        return true;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};