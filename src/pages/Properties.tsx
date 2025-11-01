import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { useProperties } from '@/hooks/useProperties';

const Properties = () => {
  const { properties, loading } = useProperties();
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const handleFilter = (filters: any) => {
    let filtered = [...properties];

    if (filters.location) {
      filtered = filtered.filter(
        (p) =>
          p.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.state.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((p) => p.property_type === filters.type);
    }

    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter(
        (p) =>
          Number(p.price) >= (filters.minPrice || 0) &&
          Number(p.price) <= (filters.maxPrice || 5000000)
      );
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
              {loading ? 'Loading...' : `${filteredProperties.length} properties available`}
            </p>
          </div>

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
