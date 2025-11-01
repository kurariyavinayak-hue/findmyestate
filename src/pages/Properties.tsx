import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilters from '@/components/property/PropertyFilters';
import { useProperties } from '@/hooks/useProperties';

const Properties = () => {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 5000000,
  });

  const { properties, loading } = useProperties({
    city: filters.location,
    propertyType: filters.propertyType,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Browse Properties</h1>
            <p className="text-muted-foreground text-lg">
              {loading ? 'Loading...' : `${properties.length} properties available`}
            </p>
          </div>

          <PropertyFilters
            onSearch={(query) => setFilters({ ...filters, location: query })}
            onTypeChange={(type) => setFilters({ ...filters, propertyType: type })}
            onPriceRangeChange={(range) => {
              if (range === 'all') {
                setFilters({ ...filters, minPrice: 0, maxPrice: 5000000 });
              } else {
                const [min, max] = range.split('-').map(Number);
                setFilters({ ...filters, minPrice: min, maxPrice: max });
              }
            }}
          />

          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Loading properties...</p>
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id}
                  property={{
                    id: property.id,
                    title: property.title,
                    price: Number(property.price),
                    location: {
                      address: property.address,
                      city: property.city,
                      state: property.state,
                      zipCode: property.zip_code,
                    },
                    type: property.property_type as any,
                    bedrooms: property.bedrooms,
                    bathrooms: Number(property.bathrooms),
                    area: Number(property.area),
                    description: property.description,
                    images: property.images,
                    featured: property.featured,
                    sellerId: property.seller_id,
                    sellerName: property.profiles?.name || 'Unknown',
                    sellerEmail: property.profiles?.email || '',
                    sellerPhone: property.profiles?.phone || '',
                    listedDate: property.created_at,
                    status: property.status as any,
                  }}
                />
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
