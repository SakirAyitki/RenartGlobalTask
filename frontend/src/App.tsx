import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ProductCarousel from './components/ProductCarousel';
import FilterPanel from './components/FilterPanel';
import { productApi } from './services/api';
import type { Product, FilterOptions } from './types/product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const fetchProducts = async (filters?: FilterOptions) => {
    try {
      setLoading(true);
      setError(null);
      const response = filters && Object.keys(filters).length > 0
        ? await productApi.getFilteredProducts(filters)
        : await productApi.getAllProducts();
      setProducts(response.products);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
      
      // Check if it's a gold price API error
      if (err instanceof Error && err.message.includes('Unable to fetch current gold price')) {
        setError('Unable to load current gold prices. Please try again later.');
      } else {
        setError('An error occurred while loading products. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    fetchProducts(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          <span className="text-gray-600 font-avenir">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg font-avenir mb-4">⚠️ Error</div>
          <p className="text-gray-600 font-avenir mb-4">{error}</p>
          <button
            onClick={() => fetchProducts(activeFilters)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-avenir"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <FilterPanel 
        onFilter={handleApplyFilters}
        onClearFilters={handleClearFilters}
        isLoading={loading}
        appliedFilters={activeFilters}
      />
      {!loading && products.length === 0 && Object.values(activeFilters).some(val => val !== undefined && val !== '') ? (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <p className="text-lg font-avenir text-gray-600">No products found with the selected criteria.</p>
            <p className="text-sm font-avenir text-gray-500 mt-2">Try adjusting your filters to see more results.</p>
          </div>
        </div>
      ) : (
        <ProductCarousel products={products} title="Product List" />
      )}
    </div>
  );
}

export default App;

