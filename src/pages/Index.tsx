import { Link } from 'react-router-dom';
import { Home, Users, TrendingUp, ArrowRight, Shield, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/property/PropertyCard';
import SearchBar from '@/components/search/SearchBar';
import { useProperties } from '@/hooks/useProperties';

const Index = () => {
  const { properties } = useProperties();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-32 md:py-40 overflow-hidden">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600')] bg-cover bg-center opacity-[0.07]" />
        
        {/* Animated gold accent elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 animate-fade-in-down">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-accent">Premium Real Estate Marketplace</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up bg-gradient-to-br from-primary-foreground via-primary-foreground to-accent bg-clip-text">
              Discover Your Perfect
              <span className="block mt-2 text-accent">Luxury Estate</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Experience refined living with our curated collection of premium properties
            </p>
            
            <div className="relative group animate-scale-in max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 to-accent/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500" />
              <div className="relative bg-background/95 backdrop-blur-md p-6 rounded-xl shadow-elegant">
                <SearchBar 
                  size="lg"
                  inputClassName="text-base"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold hover:shadow-xl transition-all duration-300 group">
                <Link to="/properties">
                  Browse Properties
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 hover:bg-primary-foreground/20 backdrop-blur-sm">
                <Link to="/add-property">
                  List Your Property
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent">1000+</div>
                <div className="text-sm text-primary-foreground/70">Properties</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent">500+</div>
                <div className="text-sm text-primary-foreground/70">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
                <div className="text-sm text-primary-foreground/70">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-luxury relative">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg">Excellence in every detail</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group text-center border border-accent/20 shadow-elegant hover:shadow-gold transition-all duration-500 hover:scale-105 bg-gradient-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
              <CardContent className="pt-12 pb-8 relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Curated Selection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Handpicked premium properties that meet our strict quality standards
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center border border-accent/20 shadow-elegant hover:shadow-gold transition-all duration-500 hover:scale-105 bg-gradient-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
              <CardContent className="pt-12 pb-8 relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Verified Listings</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every property is thoroughly vetted for authenticity and quality
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center border border-accent/20 shadow-elegant hover:shadow-gold transition-all duration-500 hover:scale-105 bg-gradient-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
              <CardContent className="pt-12 pb-8 relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Prime Locations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Exclusive properties in the most desirable neighborhoods
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="flex items-center justify-between mb-12 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <Star className="h-3 w-3 text-accent fill-accent" />
                <span className="text-sm font-medium text-accent">Featured Collection</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">Exclusive Properties</h2>
              <p className="text-muted-foreground text-lg">Discover your dream estate from our premium selection</p>
            </div>
            <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10 group hidden md:flex">
              <Link to="/properties">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10 group">
              <Link to="/properties">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        {/* Animated gold accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-glow" />
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6 animate-fade-in-down">
            <Star className="h-4 w-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-accent">Start Your Journey Today</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up bg-gradient-to-br from-primary-foreground to-accent bg-clip-text">
            Ready to Find Your Dream Estate?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 text-primary-foreground/80 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Join our exclusive community of discerning buyers and sellers
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold hover:shadow-xl transition-all duration-300 group">
              <Link to="/auth?mode=signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 hover:bg-primary-foreground/20 backdrop-blur-sm">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
