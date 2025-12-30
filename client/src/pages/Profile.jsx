import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [details, setDetails] = useState({ name: user?.name || '', email: user?.email || '' });
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.put('/users/updateprofile', details);
            setUser({ ...user, ...data.data }); // Update context
            toast.success('Profile updated');
        } catch (err) {
            toast.error('Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/users/updatepassword', passwords);
            toast.success('Password updated');
            setPasswords({ currentPassword: '', newPassword: '' });
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

            {/* Profile Details Section */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
                <form onSubmit={handleUpdateProfile}>
                    <Input label="Full Name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                    <Input label="Email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                    <Button type="submit" loading={loading} className="mt-2">Save Changes</Button>
                </form>
            </div>

            {/* Password Change Section */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Change Password</h2>
                <form onSubmit={handleUpdatePassword}>
                    <Input label="Current Password" type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} />
                    <Input label="New Password" type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
                    <Button type="submit" loading={loading} variant="secondary" className="mt-2">Update Password</Button>
                </form>
            </div>
        </div>
    );
};

export default Profile;