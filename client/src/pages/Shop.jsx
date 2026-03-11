import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const { isDark } = useTheme();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    sort: searchParams.get('sort') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    gender: searchParams.get('gender') || ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const newSearch = searchParams.get('search') || '';
    const newCategory = searchParams.get('category') || '';
    const newSubcategory = searchParams.get('subcategory') || '';
    const newSort = searchParams.get('sort') || '';
    const newMinPrice = searchParams.get('minPrice') || '';
    const newMaxPrice = searchParams.get('maxPrice') || '';

    setFilters({
      search: newSearch,
      category: newCategory,
      subcategory: newSubcategory,
      sort: newSort,
      minPrice: newMinPrice,
      maxPrice: newMaxPrice,
      gender: searchParams.get('gender') || ''
    });

    fetchProducts({ search: newSearch, category: newCategory, subcategory: newSubcategory, sort: newSort, minPrice: newMinPrice, maxPrice: newMaxPrice, gender: searchParams.get('gender') || '' });
  }, [searchParams]);

  const fetchProducts = async (filterParams = filters) => {
    try {
      setLoading(true);
      // Map 'indian-taste' virtual category to 'home' which is how it's stored in DB
      const apiParams = { ...filterParams };
      if (apiParams.category === 'indian-taste') {
        apiParams.category = 'home';
      }
      const response = await productsAPI.getAll(apiParams);
      let filteredProducts = response.data;

      // Apply price filter
      if (filterParams.minPrice || filterParams.maxPrice) {
        filteredProducts = filteredProducts.filter(product => {
          const price = product.price;
          const min = filterParams.minPrice ? Number(filterParams.minPrice) : 0;
          const max = filterParams.maxPrice ? Number(filterParams.maxPrice) : Infinity;
          return price >= min && price <= max;
        });
      }

      // Apply sorting
      if (filterParams.sort) {
        filteredProducts.sort((a, b) => {
          switch (filterParams.sort) {
            case 'price_low':
              return a.price - b.price;
            case 'price_high':
              return b.price - a.price;
            case 'rating_high':
              return (b.rating || 0) - (a.rating || 0);
            case 'rating_low':
              return (a.rating || 0) - (b.rating || 0);
            case 'newest':
              return new Date(b.createdAt) - new Date(a.createdAt);
            default:
              return 0;
          }
        });
      }

      setAllProducts(filteredProducts);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters({ search: filters.search });
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', subcategory: '', sort: '', minPrice: '', maxPrice: '', gender: '' });
    setSearchParams({});
  };

  // Pagination logic
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Shop</h1>
            <p className="text-sm md:text-base text-muted-foreground">Discover our collection of sustainable, handcrafted products</p>
          </div>
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Filters'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar: always visible on lg, collapsible on mobile */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 lg:sticky lg:top-20 lg:self-start`}>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <h3 className="font-semibold text-card-foreground mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>

                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => updateFilters({ category: e.target.value, subcategory: '' })}
                      className="w-full p-2 border border-border rounded-md bg-input text-foreground"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {filters.category && (
                    <div>
                      <label className="text-sm font-medium text-card-foreground mb-2 block">Subcategory</label>
                      <select
                        value={filters.subcategory}
                        onChange={(e) => updateFilters({ subcategory: e.target.value })}
                        className="w-full p-2 border border-border rounded-md bg-input text-foreground"
                      >
                        <option value="">All {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}</option>
                        {filters.category === 'clothing' && (
                          <>
                            <option value="sarees">Sarees</option>
                            <option value="kurtas">Kurtas</option>
                            <option value="lehengas">Lehengas</option>
                            <option value="fabrics">Fabrics</option>
                          </>
                        )}
                        {filters.category === 'home' && (
                          <>
                            <option value="pottery">Pottery</option>
                            <option value="textiles">Textiles</option>
                          </>
                        )}
                        {filters.category === 'indian-taste' && (
                          <>
                            <option value="spices">Spices</option>
                            <option value="tea">Tea</option>
                            <option value="grains">Grains</option>
                            <option value="pickles">Pickles</option>
                            <option value="sweets">Sweets</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Sort By</label>
                    <select
                      value={filters.sort}
                      onChange={(e) => updateFilters({ sort: e.target.value })}
                      className="w-full p-2 border border-border rounded-md bg-input text-foreground"
                    >
                      <option value="">Default</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="rating_high">Rating: High to Low</option>
                      <option value="rating_low">Rating: Low to High</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Price Range</label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <Button
                      onClick={() => updateFilters({ minPrice: filters.minPrice, maxPrice: filters.maxPrice })}
                      className="w-full mt-2"
                      size="sm"
                    >
                      Apply
                    </Button>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Gender</label>
                    <select
                      value={filters.gender}
                      onChange={(e) => updateFilters({ gender: e.target.value })}
                      className="w-full p-2 border border-border rounded-md bg-input text-foreground"
                    >
                      <option value="">All Genders</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>

                  {(filters.search || filters.category || filters.subcategory || filters.sort || filters.minPrice || filters.maxPrice || filters.gender) && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full bg-secondary border-border text-secondary-foreground hover:bg-muted"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {loading ? 'Loading...' : `${allProducts.length} products found`}
              </p>
              {totalPages > 1 && (
                <p className="text-muted-foreground text-sm">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white/10 aspect-[3/4] rounded-lg mb-4"></div>
                    <div className="h-4 bg-white/10 rounded mb-2"></div>
                    <div className="h-4 bg-white/10 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : allProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4 bg-secondary border-border text-secondary-foreground hover:bg-muted"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bg-secondary border-border text-secondary-foreground hover:bg-muted"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(page)}
                            className={currentPage === page ? "" : "bg-secondary border-border text-secondary-foreground hover:bg-muted"}
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <span key={page} className="text-muted-foreground">...</span>;
                      }
                      return null;
                    })}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="bg-secondary border-border text-secondary-foreground hover:bg-muted"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;