import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilters from '@/components/property/PropertyFilters';
import { dummyProperties } from '@/data/properties';

const Properties = () => {
  const [filteredProperties, setFilteredProperties] = useState(dummyProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedType, priceRange);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    applyFilters(searchQuery, type, priceRange);
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
    applyFilters(searchQuery, selectedType, range);
  };

  const applyFilters = (query: string, type: string, range: string) => {
    let filtered = [...dummyProperties];

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.location.city.toLowerCase().includes(query.toLowerCase()) ||
          p.location.state.toLowerCase().includes(query.toLowerCase()) ||
          p.location.zipCode.includes(query) ||
          p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Type filter
    if (type !== 'all') {
      filtered = filtered.filter((p) => p.type === type);
    }

    // Price range filter
    if (range !== 'all') {
      const [min, max] = range.split('-').map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Browse Properties</h1>
            <p className="text-muted-foreground text-lg">
              {filteredProperties.length} properties available
            </p>
          </div>

          <PropertyFilters
            onSearch={handleSearch}
            onTypeChange={handleTypeChange}
            onPriceRangeChange={handlePriceRangeChange}
          />

          {filteredProperties.length > 0 ? (
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
