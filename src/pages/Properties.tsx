import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilters from '@/components/property/PropertyFilters';
import { useProperties } from '@/hooks/useProperties';

const Properties = () => {
  const { properties, loading } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: '',
    priceRange: ''
  });

  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setFilters(prev => ({ ...prev, search: searchParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...properties];

    // Search filter (location)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.city.toLowerCase().includes(searchLower) ||
          p.state.toLowerCase().includes(searchLower) ||
          p.zip_code.includes(filters.search) ||
          p.address.toLowerCase().includes(searchLower)
      );
    }

    // Type filter
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((p) => p.property_type === filters.type);
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(
        (p) => Number(p.price) >= min && Number(p.price) <= max
      );
    }

    setFilteredProperties(filtered);
  }, [properties, filters]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleTypeChange = (type: string) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handlePriceRangeChange = (range: string) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Browse Properties</h1>
            <p className="text-muted-foreground text-lg">
              {loading ? 'Loading...' : `${filteredProperties.length} properties available`}
            </p>
          </div>

          <PropertyFilters
            onSearch={handleSearch}
            onTypeChange={handleTypeChange}
            onPriceRangeChange={handlePriceRangeChange}
          />

          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Loading properties...</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No properties found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
