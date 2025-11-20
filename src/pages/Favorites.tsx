import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/property/PropertyCard';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Property } from '@/hooks/useProperties';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    fetchFavorites();
  }, [user, isAuthenticated]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      // Fetch favorites with property details
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          property_id,
          properties (
            id,
            title,
            description,
            price,
            bedrooms,
            bathrooms,
            area,
            property_type,
            images,
            address,
            city,
            state,
            zip_code,
            status,
            featured,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match Property interface
      const properties = data
        ?.map(item => item.properties)
        .filter(Boolean) as Property[];

      setFavoriteProperties(properties || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 bg-gradient-hero">
          <div className="container">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 backdrop-blur-sm">
                <Heart className="h-4 w-4 text-secondary fill-secondary" />
                <span className="text-sm font-semibold text-foreground">Your Collection</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  My Favorites
                </span>
              </h1>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Properties you've saved for later
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-muted-foreground">Loading your favorites...</p>
              </div>
            ) : favoriteProperties.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="h-20 w-20 mx-auto text-muted-foreground/30 mb-4" />
                <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start exploring properties and add them to your favorites
                </p>
                <a
                  href="/properties"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse Properties
                </a>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
