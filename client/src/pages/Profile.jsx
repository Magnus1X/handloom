import { useState, useEffect } from 'react';
import { User, MapPin, Package, Edit, Plus, RotateCcw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ordersAPI, profileAPI } from '../utils/api';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', phone: '', currentPassword: '', newPassword: '' });
  const [addressData, setAddressData] = useState({
    type: 'home',
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, addressesRes] = await Promise.all([
        ordersAPI.getAll(),
        profileAPI.getAddresses()
      ]);
      setOrders(ordersRes.data.slice(0, 5));
      setAddresses(addressesRes.data);
    } catch (error) {
      toast.error('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setProfileData({ name: user?.name || '', phone: user?.phone || '', currentPassword: '', newPassword: '' });
    setShowEditProfile(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Updating profile...');
    
    try {
      const updateData = { name: profileData.name, phone: profileData.phone };
      if (profileData.newPassword) {
        updateData.currentPassword = profileData.currentPassword;
        updateData.newPassword = profileData.newPassword;
      }
      const response = await profileAPI.update(updateData);
      setUser(response.data);
      setShowEditProfile(false);
      toast.success('Profile updated successfully!', { id: loadingToast });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile', { id: loadingToast });
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Adding address...');
    
    try {
      const response = await profileAPI.addAddress(addressData);
      setAddresses(response.data);
      setShowAddAddress(false);
      setAddressData({
        type: 'home',
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
      });
      toast.success('Address added successfully!', { id: loadingToast });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add address', { id: loadingToast });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    toast((t) => (
      <div className="flex items-center space-x-3">
        <div>
          <p className="font-medium text-earth-brown dark:text-white">Delete Address?</p>
          <p className="text-sm text-earth-brown/70 dark:text-white/70">This action cannot be undone.</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              deleteAddress(addressId);
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 font-medium"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-earth-brown/10 text-earth-brown px-3 py-1 rounded text-sm hover:bg-earth-brown/20 font-medium dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: 'white',
        color: '#8B4513',
        border: '1px solid #E8DCC0',
        padding: '16px',
        minWidth: '300px'
      }
    });
  };

  const deleteAddress = async (addressId) => {
    const loadingToast = toast.loading('Deleting address...');
    
    try {
      const response = await profileAPI.deleteAddress(addressId);
      setAddresses(response.data);
      toast.success('Address deleted successfully!', { id: loadingToast });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete address', { id: loadingToast });
    }
  };

  const isReturnEligible = (orderDate) => {
    const returnPolicyDays = 14;
    const orderDateTime = new Date(orderDate);
    const currentTime = new Date();
    const diffTime = Math.abs(currentTime - orderDateTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= returnPolicyDays;
  };

  const handleReturn = (orderId) => {
    toast.success(`Return request initiated for order ${orderId.slice(-8)}. You will be contacted within 24 hours.`);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>
              My Profile
            </h1>
            <p className={`text-xl ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
              Manage your account and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-1">
              <Card className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>
                      Full Name
                    </label>
                    <p className={`text-lg ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                      {user?.name || 'User Name'}
                    </p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>
                      Email Address
                    </label>
                    <p className={`text-lg ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  {user?.phone && (
                    <div>
                      <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>
                        Phone
                      </label>
                      <p className={`text-lg ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                        {user.phone}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>
                      Member Since
                    </label>
                    <p className={`text-lg ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'January 2024'}
                    </p>
                  </div>
                  <Button className="w-full mt-4" onClick={handleEditProfile}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Saved Addresses */}
              <Card className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                      <MapPin className="h-5 w-5 mr-2" />
                      Saved Addresses
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setShowAddAddress(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        className={`p-4 rounded-lg border ${isDark ? 'border-white/10 bg-white/5' : 'border-earth-beige bg-earth-cream/20'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} capitalize`}>
                            {address.type} {address.isDefault && '(Default)'}
                          </span>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteAddress(address._id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-white/80' : 'text-earth-brown/80'} mb-1`}>
                          {address.fullName}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mb-1`}>
                          {address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mb-1`}>
                          {address.city}, {address.state} {address.pincode}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                          {address.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                  {addresses.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-white/40' : 'text-earth-brown/40'}`} />
                      <p className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                        No addresses saved. Add your first address!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                      <Package className="h-5 w-5 mr-2" />
                      Recent Orders
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={() => navigate('/orders')}>
                      View All Orders
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => {
                        const returnEligible = isReturnEligible(order.createdAt);
                        return (
                          <div
                            key={order._id}
                            onClick={() => navigate(`/order/${order._id}`)}
                            className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-earth-beige bg-earth-cream/20 hover:bg-earth-cream/30'}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                                Order #{order._id.slice(-8)}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm px-2 py-1 rounded-full ${
                                  order.status === 'delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                                {returnEligible && order.status === 'delivered' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReturn(order._id);
                                    }}
                                    className="text-xs"
                                  >
                                    <RotateCcw className="h-3 w-3 mr-1" />
                                    Return
                                  </Button>
                                )}
                              </div>
                            </div>
                            <p className={`text-sm ${isDark ? 'text-white/80' : 'text-earth-brown/80'} mb-1`}>
                              {order.items.length} item(s) • ₹{order.totalAmount}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                              {returnEligible && order.status === 'delivered' && (
                                <p className="text-xs text-green-600">
                                  Return eligible (14 days policy)
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-white/40' : 'text-earth-brown/40'}`} />
                      <p className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                        No orders yet. Start shopping to see your orders here!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-black border-white/10' : 'bg-white border-earth-beige'} border rounded-lg p-6 w-full max-w-md mx-4`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-earth-brown'}`}>Edit Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Name</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  required
                  className={isDark ? 'bg-white/10 border-white/20 text-white' : ''}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Phone</label>
                <Input
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className={isDark ? 'bg-white/10 border-white/20 text-white' : ''}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Current Password (if changing password)</label>
                <Input
                  type="password"
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                  className={isDark ? 'bg-white/10 border-white/20 text-white' : ''}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>New Password</label>
                <Input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                  className={isDark ? 'bg-white/10 border-white/20 text-white' : ''}
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">Update</Button>
                <Button type="button" variant="outline" onClick={() => setShowEditProfile(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-black border-white/10' : 'bg-white border-earth-beige'} border rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-earth-brown'}`}>Add Address</h3>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Type</label>
                <select
                  value={addressData.type}
                  onChange={(e) => setAddressData({...addressData, type: e.target.value})}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-earth-brown/20 text-earth-brown'}`}
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Full Name</label>
                <Input
                  value={addressData.fullName}
                  onChange={(e) => setAddressData({...addressData, fullName: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Phone</label>
                <Input
                  value={addressData.phone}
                  onChange={(e) => setAddressData({...addressData, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Address Line 1</label>
                <Input
                  value={addressData.addressLine1}
                  onChange={(e) => setAddressData({...addressData, addressLine1: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Address Line 2</label>
                <Input
                  value={addressData.addressLine2}
                  onChange={(e) => setAddressData({...addressData, addressLine2: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>City</label>
                  <Input
                    value={addressData.city}
                    onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>State</label>
                  <Input
                    value={addressData.state}
                    onChange={(e) => setAddressData({...addressData, state: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Pincode</label>
                <Input
                  value={addressData.pincode}
                  onChange={(e) => setAddressData({...addressData, pincode: e.target.value})}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={addressData.isDefault}
                  onChange={(e) => setAddressData({...addressData, isDefault: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="isDefault" className={`text-sm ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>
                  Set as default address
                </label>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">Add Address</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddAddress(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;