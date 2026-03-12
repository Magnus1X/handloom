import { useState, useEffect, useMemo } from 'react';
import { Plus, Edit, Trash2, Package, ShoppingCart, BarChart3, ChevronDown, ChevronUp, Search, X, Eye, MessageSquare, CreditCard, Truck, IndianRupee, Users, TrendingUp, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useTheme } from '../context/ThemeContext';
import { productsAPI } from '../utils/api';

const SUBCATEGORIES = {
  clothing: ['Sarees', 'Kurtas', 'Lehengas', 'Fabrics', 'Traditional Wear'],
  home: ['Pottery', 'Textiles', 'Kitchenware', 'Furniture', 'Decor'],
  beauty: ['Skincare', 'Haircare', 'Natural Cosmetics', 'Essential Oils'],
  accessories: ['Jewelry', 'Bags', 'Footwear', 'Handicrafts']
};

const CATEGORIES = [
  { key: 'all', label: 'All Products', icon: null },
  { key: 'clothing', label: 'Clothing', icon: null },
  { key: 'home', label: 'Home', icon: null },
  { key: 'beauty', label: 'Beauty', icon: null },
  { key: 'accessories', label: 'Accessories', icon: null }
];

const DELIVERY_STATUSES = ['Order Placed', 'Processing', 'Shipping', 'Out for Delivery', 'Delivered', 'Cancelled'];
const PAYMENT_STATUSES = ['Pending', 'Paid', 'Refunded', 'Failed'];

const STATUS_COLORS = {
  'Order Placed': 'bg-sky-500/20 text-sky-300 border-sky-400/50',
  'Processing': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Shipping': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Out for Delivery': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Delivered': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Cancelled': 'bg-red-500/20 text-red-500 border-red-500/30',
  'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Paid': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Refunded': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Failed': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const Admin = () => {
  const { isDark } = useTheme();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [editingNotes, setEditingNotes] = useState({});
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [productData, setProductData] = useState({
    title: '', price: '', category: 'clothing', subcategory: '', description: '', stock: '', gender: '', sizes: [{ size: '', stock: '' }], images: []
  });

  const resetProductData = () => setProductData({ title: '', price: '', category: 'clothing', subcategory: '', description: '', stock: '', gender: '', sizes: [{ size: '', stock: '' }], images: [] });

  useEffect(() => { fetchProducts(); fetchOrders(); }, []);

  const fetchProducts = async () => {
    try { const r = await productsAPI.getAll(); setProducts(r.data); } catch { toast.error('Failed to fetch products'); } finally { setLoading(false); }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const r = await fetch(`${import.meta.env.VITE_API_URL}/admin/orders`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (r.ok) setOrders(await r.json());
    } catch { toast.error('Failed to fetch orders'); }
  };

  const handleUpdateOrder = async (orderId, data) => {
    try {
      const token = localStorage.getItem('token');
      const r = await fetch(`${import.meta.env.VITE_API_URL}/admin/orders/${orderId}/status`, {
        method: 'PUT', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      });
      if (r.ok) { const updated = await r.json(); setOrders(prev => prev.map(o => o._id === orderId ? updated : o)); toast.success('Order updated'); }
    } catch { toast.error('Failed to update order'); }
  };

  const handleCategoryChange = (category) => setProductData({ ...productData, category, subcategory: '', gender: '', sizes: [{ size: '', stock: '' }] });
  const addSizeField = () => setProductData({ ...productData, sizes: [...productData.sizes, { size: '', stock: '' }] });
  const removeSizeField = (i) => setProductData({ ...productData, sizes: productData.sizes.filter((_, idx) => idx !== i) });
  const updateSizeField = (i, f, v) => { const s = [...productData.sizes]; s[i][f] = v; setProductData({ ...productData, sizes: s }); };

  const submitProduct = async (e, isEdit) => {
    e.preventDefault();
    const loadingToast = toast.loading(isEdit ? 'Updating...' : 'Adding...');
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('subcategory', productData.subcategory);
    formData.append('description', productData.description);
    if (productData.category === 'clothing') { formData.append('gender', productData.gender); formData.append('sizes', JSON.stringify(productData.sizes)); }
    else formData.append('stock', productData.stock);
    for (let i = 0; i < productData.images.length; i++) formData.append('images', productData.images[i]);
    try {
      const token = localStorage.getItem('token');
      const url = isEdit ? `${import.meta.env.VITE_API_URL}/admin/products/${editingProduct._id}` : `${import.meta.env.VITE_API_URL}/admin/products`;
      const r = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData });
      if (r.ok) { toast.success(isEdit ? 'Updated!' : 'Added!', { id: loadingToast }); setShowEditProduct(false); setShowAddProduct(false); setEditingProduct(null); resetProductData(); fetchProducts(); }
      else { const err = await r.json(); toast.error(err.message || 'Failed', { id: loadingToast }); }
    } catch { toast.error('Network error', { id: loadingToast }); }
  };

  const handleEditProduct = (p) => {
    setEditingProduct(p);
    setProductData({ title: p.title, price: p.price, category: p.category, subcategory: p.subcategory, description: p.description, stock: p.stock || '', gender: p.gender || '', sizes: p.sizes || [{ size: '', stock: '' }], images: [] });
    setShowEditProduct(true);
  };

  const handleDeleteProduct = (id) => {
    toast((t) => (
      <div className="flex items-center space-x-3">
        <div><p className="font-medium">Delete Product?</p><p className="text-sm opacity-70">Cannot be undone.</p></div>
        <div className="flex space-x-2">
          <button onClick={() => { toast.dismiss(t.id); deleteProduct(id); }} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
          <button onClick={() => toast.dismiss(t.id)} className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Cancel</button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const deleteProduct = async (id) => {
    const lt = toast.loading('Deleting...');
    try {
      const token = localStorage.getItem('token');
      const r = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (r.ok) { toast.success('Deleted!', { id: lt }); fetchProducts(); } else toast.error('Failed', { id: lt });
    } catch { toast.error('Network error', { id: lt }); }
  };

  // Computed data
  const filteredProducts = useMemo(() => {
    let p = products;
    if (selectedCategory !== 'all') p = p.filter(x => x.category === selectedCategory);
    if (productSearch) p = p.filter(x => x.title.toLowerCase().includes(productSearch.toLowerCase()));
    return p;
  }, [products, selectedCategory, productSearch]);

  const filteredOrders = useMemo(() => {
    let o = orders;
    if (orderFilter !== 'all') o = o.filter(x => x.status === orderFilter);
    if (orderSearch) o = o.filter(x => x._id.includes(orderSearch) || x.userId?.name?.toLowerCase().includes(orderSearch.toLowerCase()) || x.userId?.email?.toLowerCase().includes(orderSearch.toLowerCase()));
    return o;
  }, [orders, orderFilter, orderSearch]);

  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.totalAmount, 0),
    pendingOrders: orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).length,
    categoryCounts: CATEGORIES.filter(c => c.key !== 'all').reduce((acc, c) => { acc[c.key] = products.filter(p => p.category === c.key).length; return acc; }, {}),
    deliveredOrders: orders.filter(o => o.status === 'Delivered').length,
    paidOrders: orders.filter(o => o.paymentStatus === 'Paid').length,
  }), [products, orders]);

  const cls = (base, dark, light) => `${base} ${isDark ? dark : light}`;

  // ── Sidebar Tab Button ──
  const TabBtn = ({ id, label, count }) => (
    <button onClick={() => { setActiveTab(id); setShowMobileSidebar(false); }}
      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left font-bold transition-all duration-300 ${activeTab === id
        ? 'bg-earth-terracotta text-white shadow-xl shadow-earth-terracotta/30 scale-[1.02]'
        : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-earth-brown/60 hover:text-earth-brown hover:bg-earth-brown/5'}`}>
      <span className="tracking-tight">{label}</span>
      {count !== undefined && <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${activeTab === id ? 'bg-white/30 text-white' : isDark ? 'bg-white/10 text-white/50' : 'bg-earth-brown/10 text-earth-brown/50'}`}>{count}</span>}
    </button>
  );

  // ── Stat Card ──
  const StatCard = ({ label, value, color }) => (
    <div className={cls('rounded-3xl p-6 border transition-all duration-300 hover:shadow-2xl', 'bg-white/5 border-white/10 hover:bg-white/[0.07]', 'bg-white border-earth-beige/50 hover:shadow-earth-brown/5')}>
      <div className="flex flex-col gap-1">
        <span className={cls('text-xs font-black uppercase tracking-widest opacity-50', 'text-white', 'text-earth-brown')}>{label}</span>
        <p className={cls('text-3xl font-black mt-1', 'text-white', 'text-earth-brown')}>{value}</p>
      </div>
    </div>
  );

  // ── Select Dropdown ──
  const Select = ({ value, onChange, options, className = '' }) => (
    <select value={value} onChange={onChange}
      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-earth-beige text-earth-brown'} ${className}`}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );

  // ── Product Form Modal ──
  const ProductModal = ({ isEdit }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => { isEdit ? setShowEditProduct(false) : setShowAddProduct(false); }}>
      <div onClick={e => e.stopPropagation()} className={cls('rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto border', 'bg-[#1a1a1a] border-white/10', 'bg-white border-earth-beige')}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={cls('text-xl font-bold', 'text-white', 'text-earth-brown')}>{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={() => isEdit ? setShowEditProduct(false) : setShowAddProduct(false)} className={cls('p-2 rounded-lg', 'hover:bg-white/10 text-white/60', 'hover:bg-earth-brown/10 text-earth-brown/60')}><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={(e) => submitProduct(e, isEdit)} className="space-y-4">
          <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Title</label><Input value={productData.title} onChange={e => setProductData({ ...productData, title: e.target.value })} required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Price (₹)</label><Input type="number" value={productData.price} onChange={e => setProductData({ ...productData, price: e.target.value })} required /></div>
            {productData.category !== 'clothing' && <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Stock</label><Input type="number" value={productData.stock} onChange={e => setProductData({ ...productData, stock: e.target.value })} required /></div>}
          </div>
          {!isEdit && (
            <div className="grid grid-cols-2 gap-4">
              <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Category</label>
                <select value={productData.category} onChange={e => handleCategoryChange(e.target.value)} className={`w-full p-2.5 border rounded-lg ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-earth-beige text-earth-brown'}`}>
                  {Object.keys(SUBCATEGORIES).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Subcategory</label>
                <select value={productData.subcategory} onChange={e => setProductData({ ...productData, subcategory: e.target.value })} className={`w-full p-2.5 border rounded-lg ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-earth-beige text-earth-brown'}`} required>
                  <option value="">Select...</option>
                  {(SUBCATEGORIES[productData.category] || []).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}
          {productData.category === 'clothing' && !isEdit && (
            <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Gender</label>
              <select value={productData.gender} onChange={e => setProductData({ ...productData, gender: e.target.value })} className={`w-full p-2.5 border rounded-lg ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-earth-beige text-earth-brown'}`} required>
                <option value="">Select...</option><option value="men">Men</option><option value="women">Women</option><option value="kids">Kids</option><option value="unisex">Unisex</option>
              </select>
            </div>
          )}
          {productData.category === 'clothing' && (
            <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Sizes & Stock</label>
              {productData.sizes.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input placeholder="Size" value={s.size} onChange={e => updateSizeField(i, 'size', e.target.value)} required />
                  <Input type="number" placeholder="Stock" value={s.stock} onChange={e => updateSizeField(i, 'stock', e.target.value)} required />
                  {productData.sizes.length > 1 && <Button type="button" variant="outline" size="sm" onClick={() => removeSizeField(i)}><X className="h-4 w-4" /></Button>}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addSizeField}><Plus className="h-3 w-3 mr-1" />Add Size</Button>
            </div>
          )}
          <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Description</label>
            <textarea value={productData.description} onChange={e => setProductData({ ...productData, description: e.target.value })} className={`w-full p-2.5 border rounded-lg h-24 resize-none ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-white border-earth-beige text-earth-brown placeholder:text-earth-brown/30'}`} required />
          </div>
          <div><label className={cls('block text-sm font-medium mb-1.5', 'text-white/80', 'text-earth-brown/80')}>Images {isEdit ? '(optional)' : '(1-4)'}</label>
            <input type="file" multiple accept="image/*" onChange={e => setProductData({ ...productData, images: Array.from(e.target.files) })} className={`w-full p-2.5 border rounded-lg ${isDark ? 'bg-white/5 border-white/10 text-white file:bg-white/10 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-2' : 'bg-white border-earth-beige text-earth-brown file:bg-earth-cream file:text-earth-brown file:border-0 file:rounded file:px-3 file:py-1 file:mr-2'}`} required={!isEdit} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">{isEdit ? 'Update Product' : 'Add Product'}</Button>
            <Button type="button" variant="outline" onClick={() => isEdit ? setShowEditProduct(false) : setShowAddProduct(false)}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-earth-cream/20'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto">
          {/* ── Mobile Sidebar Toggle ── */}
          <div className="lg:hidden flex items-center justify-between p-4 rounded-2xl border bg-white/5 border-white/10 mb-4" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-earth-terracotta"></div>
              <span className="font-bold text-white">Menu</span>
            </div>
            {showMobileSidebar ? <X className="h-5 w-5 text-white" /> : <Filter className="h-5 w-5 text-white" />}
          </div>

          {/* ── Sidebar ── */}
          <aside className={cls(`${showMobileSidebar ? 'flex' : 'hidden'} lg:flex lg:w-72 flex-col gap-6 flex-shrink-0 rounded-3xl p-6 border h-fit lg:sticky lg:top-8`, 'bg-white/5 border-white/10 backdrop-blur-3xl', 'bg-white border-earth-beige/50')}>
            <div>
              <h2 className={cls('text-2xl font-black px-2 mb-6 tracking-tighter', 'text-white', 'text-earth-brown')}>Handloom Admin</h2>
              <nav className="space-y-2">
                <TabBtn id="dashboard" label="Dashboard" />
                <TabBtn id="products" label="Products" count={products.length} />
                <TabBtn id="orders" label="Orders" count={orders.length} />
              </nav>
            </div>
            
            <div className={cls('mt-auto pt-6 border-t', 'border-white/10', 'border-earth-beige/50')}>
               <p className={cls('text-[10px] font-black uppercase tracking-[0.2em] px-2 opacity-30', 'text-white', 'text-earth-brown')}>Version 2.0.4</p>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">
            {/* ═══ DASHBOARD ═══ */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h1 className={cls('text-4xl font-black tracking-tighter mb-8', 'text-white', 'text-earth-brown')}>Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard label="Products" value={stats.totalProducts} color="bg-blue-500" />
                  <StatCard label="Orders" value={stats.totalOrders} color="bg-purple-500" />
                  <StatCard label="Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} color="bg-green-500" />
                  <StatCard label="Pending" value={stats.pendingOrders} color="bg-orange-500" />
                </div>
                {/* Category breakdown */}
                <div className={cls('rounded-3xl p-8 border', 'bg-white/5 border-white/10', 'bg-white border-earth-beige/50')}>
                  <h3 className={cls('text-xs font-black uppercase tracking-widest mb-6 opacity-50', 'text-white', 'text-earth-brown')}>Categories</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {CATEGORIES.filter(c => c.key !== 'all').map(c => (
                      <button key={c.key} onClick={() => { setActiveTab('products'); setSelectedCategory(c.key); }}
                        className={cls('rounded-2xl p-6 border text-left transition-all hover:translate-y-[-4px] active:scale-95', 'bg-white/5 border-white/10 hover:bg-white/10 border-earth-terracotta/0 hover:border-earth-terracotta/40', 'bg-earth-cream/30 border-earth-beige hover:border-earth-terracotta/40')}>
                        <p className={cls('text-xs font-black uppercase tracking-widest opacity-40 mb-2', 'text-white', 'text-earth-brown')}>{c.label}</p>
                        <p className={cls('text-3xl font-black', 'text-white', 'text-earth-brown')}>{stats.categoryCounts[c.key] || 0}</p>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Order stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <StatCard label="Delivered" value={stats.deliveredOrders} color="bg-emerald-500" />
                  <StatCard label="Paid" value={stats.paidOrders} color="bg-sky-500" />
                  <StatCard label="Pending Delivery" value={stats.pendingOrders} color="bg-amber-500" />
                </div>
              </div>
            )}

            {/* ═══ PRODUCTS ═══ */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h1 className={cls('text-3xl font-bold', 'text-white', 'text-earth-brown')}>Products</h1>
                  <Button onClick={() => setShowAddProduct(true)}><Plus className="h-4 w-4 mr-2" />Add Product</Button>
                </div>
                {/* Category filter chips */}
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button key={c.key} onClick={() => setSelectedCategory(c.key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === c.key
                        ? 'bg-earth-terracotta text-white shadow-md'
                        : isDark ? 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10' : 'bg-white text-earth-brown/60 hover:bg-earth-cream border border-earth-beige'}`}>
                      {c.icon} {c.label} ({c.key === 'all' ? products.length : stats.categoryCounts[c.key] || 0})
                    </button>
                  ))}
                </div>
                {/* Search */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-white/30' : 'text-earth-brown/30'}`} />
                  <input placeholder="Search products..." value={productSearch} onChange={e => setProductSearch(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-white border-earth-beige text-earth-brown placeholder:text-earth-brown/30'}`} />
                </div>
                {/* Product list */}
                <div className={cls('rounded-2xl border overflow-hidden', 'bg-white/5 border-white/10', 'bg-white border-earth-beige/50')}>
                  <div className={cls('px-6 py-4 border-b', 'border-white/10', 'border-earth-beige/50')}>
                    <p className={cls('font-semibold', 'text-white', 'text-earth-brown')}>
                      Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                      {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                    </p>
                  </div>
                  {loading ? (
                    <div className="p-6 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="animate-pulse h-20 bg-gray-200/20 rounded-xl" />)}</div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="p-12 text-center"><p className={isDark ? 'text-white/40' : 'text-earth-brown/40'}>No products found</p></div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {filteredProducts.map(p => (
                        <div key={p._id} className={cls('px-6 py-4 flex items-center justify-between gap-4 transition-colors', 'hover:bg-white/5', 'hover:bg-earth-cream/30')}>
                          <div className="flex items-center gap-4 min-w-0">
                            <img src={p.imageUrl || p.images?.[0]?.url} alt={p.title} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                            <div className="min-w-0">
                              <h3 className={cls('font-semibold truncate', 'text-white', 'text-earth-brown')}>{p.title}</h3>
                              <div className="flex items-center gap-2 flex-wrap mt-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-earth-cream text-earth-brown/70'}`}>{p.category}</span>
                                <span className={`text-xs ${isDark ? 'text-white/50' : 'text-earth-brown/50'}`}>{p.subcategory}</span>
                                <span className={cls('text-sm font-medium', 'text-green-400', 'text-green-600')}>₹{p.price}</span>
                                <span className={`text-xs ${isDark ? 'text-white/40' : 'text-earth-brown/40'}`}>Stock: {p.totalStock ?? p.stock}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button variant="outline" size="sm" onClick={() => handleEditProduct(p)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteProduct(p._id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ═══ ORDERS ═══ */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h1 className={cls('text-3xl font-bold', 'text-white', 'text-earth-brown')}>Orders</h1>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-white/30' : 'text-earth-brown/30'}`} />
                    <input placeholder="Search by order ID, name, email..." value={orderSearch} onChange={e => setOrderSearch(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-white border-earth-beige text-earth-brown placeholder:text-earth-brown/30'}`} />
                  </div>
                  <Select value={orderFilter} onChange={e => setOrderFilter(e.target.value)}
                    options={[{ value: 'all', label: 'All Statuses' }, ...DELIVERY_STATUSES.map(s => ({ value: s, label: s }))]} className="py-3" />
                </div>
                {/* Order list */}
                <div className="space-y-4">
                  {filteredOrders.length === 0 ? (
                    <div className={cls('rounded-2xl border p-12 text-center', 'bg-white/5 border-white/10', 'bg-white border-earth-beige/50')}>
                      <p className={isDark ? 'text-white/40' : 'text-earth-brown/40'}>No orders found</p>
                    </div>
                  ) : filteredOrders.map(order => (
                    <div key={order._id} className={cls('rounded-2xl border overflow-hidden transition-all', 'bg-white/5 border-white/10', 'bg-white border-earth-beige/50')}>
                      {/* Order header */}
                      <div className={cls('px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer', 'hover:bg-white/5', 'hover:bg-earth-cream/20')}
                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className={cls('font-bold', 'text-white', 'text-earth-brown')}>#{order._id.slice(-8).toUpperCase()}</p>
                            <p className={cls('text-xs opacity-50 font-medium', 'text-white', 'text-earth-brown')}>{order.userId?.name || 'Unknown'} • {order.userId?.email || ''}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.status] || ''}`}>{order.status}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.paymentStatus] || STATUS_COLORS['Pending']}`}>{order.paymentStatus || 'Pending'}</span>
                          <span className={cls('font-bold', 'text-white', 'text-earth-brown')}>₹{order.totalAmount?.toLocaleString()}</span>
                          {expandedOrder === order._id ? <ChevronUp className="h-5 w-5 text-earth-terracotta" /> : <ChevronDown className={cls('h-5 w-5', 'text-white/30', 'text-earth-brown/30')} />}
                        </div>
                      </div>
                      {/* Expanded order details */}
                      {expandedOrder === order._id && (
                        <div className={cls('px-6 py-5 border-t space-y-5', 'border-white/10', 'border-earth-beige/30')}>
                          {/* Items */}
                          <div>
                            <h4 className={cls('text-sm font-semibold mb-3 uppercase tracking-wide', 'text-white/50', 'text-earth-brown/50')}>Items</h4>
                            <div className="space-y-2">
                              {order.items?.map((item, i) => (
                                <div key={i} className={cls('flex items-center gap-3 p-3 rounded-xl', 'bg-white/5', 'bg-earth-cream/30')}>
                                  {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />}
                                  <div className="flex-1 min-w-0">
                                    <p className={cls('font-medium text-sm truncate', 'text-white', 'text-earth-brown')}>{item.title}</p>
                                    <p className={cls('text-xs', 'text-white/50', 'text-earth-brown/50')}>Qty: {item.quantity} × ₹{item.price}</p>
                                  </div>
                                  <span className={cls('font-semibold text-sm', 'text-white', 'text-earth-brown')}>₹{item.quantity * item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Shipping address */}
                          {order.shippingAddress && (
                            <div>
                              <h4 className={cls('text-sm font-semibold mb-2 uppercase tracking-wide', 'text-white/50', 'text-earth-brown/50')}>Shipping Address</h4>
                              <p className={cls('text-sm', 'text-white/70', 'text-earth-brown/70')}>
                                {order.shippingAddress.name}, {order.shippingAddress.phone}<br />
                                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                              </p>
                            </div>
                          )}
                          {/* Controls grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Delivery Status */}
                            <div>
                              <label className={cls('block text-sm font-semibold mb-2', 'text-white/70', 'text-earth-brown/70')}>Delivery Status</label>
                              <Select value={order.status} onChange={e => handleUpdateOrder(order._id, { status: e.target.value })}
                                options={DELIVERY_STATUSES.map(s => ({ value: s, label: s }))} className="w-full py-2.5" />
                            </div>
                            {/* Payment Status */}
                            <div>
                              <label className={cls('block text-sm font-semibold mb-2', 'text-white/70', 'text-earth-brown/70')}>Payment Status</label>
                              <Select value={order.paymentStatus || 'Pending'} onChange={e => handleUpdateOrder(order._id, { paymentStatus: e.target.value })}
                                options={PAYMENT_STATUSES
                                  .filter(s => s !== 'Refunded' || order.status === 'Cancelled')
                                  .map(s => ({ value: s, label: s }))} className="w-full py-2.5" />
                            </div>
                          </div>
                          {/* Customer Note */}
                          {order.customerNote && (
                            <div>
                              <h4 className={cls('text-sm font-semibold mb-2 uppercase tracking-wide', 'text-white/50', 'text-earth-brown/50')}>Customer Note (Gift/Special Request)</h4>
                              <div className={cls('p-3 rounded-xl border', 'bg-amber-500/10 border-amber-500/20 text-amber-200', 'bg-amber-50 border-amber-200 text-amber-800')}>
                                <p className="text-sm font-medium">{order.customerNote}</p>
                              </div>
                            </div>
                          )}

                          {/* Admin notes */}
                          <div>
                            <label className={cls('block text-sm font-semibold mb-2', 'text-white/70', 'text-earth-brown/70')}>Admin Notes / Feedback</label>
                            <textarea
                              value={editingNotes[order._id] !== undefined ? editingNotes[order._id] : (order.adminNotes || '')}
                              onChange={e => setEditingNotes({ ...editingNotes, [order._id]: e.target.value })}
                              placeholder="Add internal notes about this order..."
                              className={`w-full p-3 rounded-xl border h-24 resize-none text-sm ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-earth-cream/30 border-earth-beige text-earth-brown placeholder:text-earth-brown/30'}`}
                            />
                            <Button size="sm" className="mt-2" onClick={() => {
                              const notes = editingNotes[order._id] !== undefined ? editingNotes[order._id] : (order.adminNotes || '');
                              handleUpdateOrder(order._id, { adminNotes: notes });
                              setEditingNotes(prev => { const n = { ...prev }; delete n[order._id]; return n; });
                            }}><MessageSquare className="h-3 w-3 mr-1" />Save Notes</Button>
                          </div>
                          {/* Meta */}
                          <div className={cls('flex items-center gap-4 text-xs pt-2 border-t', 'border-white/10 text-white/30', 'border-earth-beige/30 text-earth-brown/30')}>
                            <span>Payment: {order.paymentMethod || 'COD'}</span>
                            <span>Placed: {new Date(order.createdAt).toLocaleString()}</span>
                            <span>Updated: {new Date(order.updatedAt).toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {showEditProduct && <ProductModal isEdit />}
      {showAddProduct && <ProductModal isEdit={false} />}
    </div>
  );
};

export default Admin;