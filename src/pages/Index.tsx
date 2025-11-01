import { Link } from 'react-router-dom';
import { Home, Shield, Star, MapPin, ArrowRight, Sparkles, TrendingUp, Users, Award, CheckCircle, Quote, Mail } from 'lucide-react';
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
      <section className="relative bg-gradient-hero text-primary-foreground py-32 md:py-48 overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600')] bg-cover bg-center opacity-[0.08]" />
        
        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/20 border border-secondary/30 backdrop-blur-sm animate-fade-in-down shadow-coral">
              <Sparkles className="h-4 w-4 text-secondary animate-pulse" />
              <span className="text-sm font-semibold text-foreground">Where Dreams Meet Reality</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fade-in-up">
              <span className="text-foreground">
                Your Perfect Home
              </span>
              <br />
              <span className="text-primary">Awaits Discovery</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Explore handpicked luxury properties in prime locations. 
              <br className="hidden md:block" />
              Your journey to the perfect estate starts here.
            </p>
            
            {/* Search Bar */}
            <div className="relative group animate-scale-in max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -inset-2 bg-gradient-to-r from-secondary/40 via-accent/30 to-secondary/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-glow" />
              <div className="relative bg-background/98 backdrop-blur-xl p-8 rounded-2xl shadow-vibrant border border-primary/20">
                <SearchBar 
                  size="lg"
                  inputClassName="text-base"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-5 pt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-coral hover:shadow-xl transition-all duration-300 group px-8 h-14 text-lg">
                <Link to="/properties">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore Properties
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-2 border-primary-foreground/40 hover:bg-primary-foreground/20 backdrop-blur-sm h-14 px-8 text-lg">
                <Link to="/add-property">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  List Property
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-foreground dark:text-foreground mb-2 group-hover:scale-110 transition-transform">1000+</div>
                <div className="text-sm text-foreground/75 dark:text-foreground/80">Premium Properties</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-foreground dark:text-foreground mb-2 group-hover:scale-110 transition-transform">5000+</div>
                <div className="text-sm text-foreground/75 dark:text-foreground/80">Happy Clients</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-foreground dark:text-foreground mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-sm text-foreground/75 dark:text-foreground/80">Prime Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-vibrant relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Excellence in Every Detail
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Experience unmatched service and find your perfect property with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Listings",
                description: "Every property is thoroughly vetted for authenticity and quality. Your trust is our priority.",
                gradient: "from-primary/20 to-primary/5"
              },
              {
                icon: Star,
                title: "Premium Selection",
                description: "Handpicked exclusive properties that meet our strict luxury standards.",
                gradient: "from-secondary/20 to-secondary/5"
              },
              {
                icon: MapPin,
                title: "Prime Locations",
                description: "Access to properties in the most sought-after neighborhoods worldwide.",
                gradient: "from-accent/20 to-accent/5"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="group relative text-center border-2 border-primary/10 shadow-vibrant hover:shadow-coral transition-all duration-500 hover:scale-105 bg-gradient-card overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                <CardContent className="pt-14 pb-10 relative z-10">
                  <div className={`w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="h-12 w-12 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors text-foreground dark:text-foreground opacity-100">{feature.title}</h3>
                  <p className="text-muted-foreground dark:text-muted-foreground leading-relaxed text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/20 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Home in 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> 3 Easy Steps</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />
              
              {[
                {
                  step: "01",
                  title: "Search & Discover",
                  description: "Browse our curated collection of premium properties using advanced filters",
                  icon: Home
                },
                {
                  step: "02",
                  title: "Connect & Explore",
                  description: "Schedule viewings and connect directly with verified property owners",
                  icon: Users
                },
                {
                  step: "03",
                  title: "Secure Your Dream",
                  description: "Complete your purchase with confidence through our secure platform",
                  icon: Award
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative z-10 text-center">
                    <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 shadow-vibrant">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <step.icon className="h-16 w-16 text-primary" />
                      </div>
                    </div>
                    <div className="text-6xl font-bold text-primary/10 dark:text-primary/20 mb-4">{step.step}</div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground dark:text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground dark:text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-gradient-vibrant relative">
        <div className="container">
          <div className="flex items-center justify-between mb-16 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                <Star className="h-4 w-4 text-secondary fill-secondary animate-pulse" />
                <span className="text-sm font-semibold text-secondary">Handpicked Collection</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Exclusive 
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"> Featured Properties</span>
              </h2>
              <p className="text-muted-foreground text-xl">Discover the finest estates in prime locations</p>
            </div>
            <Button asChild variant="outline" className="border-2 border-primary/30 hover:bg-primary/10 group hidden lg:flex">
              <Link to="/properties">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

          <div className="text-center lg:hidden">
            <Button asChild variant="outline" className="border-2 border-primary/30 hover:bg-primary/10 group">
              <Link to="/properties">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/20 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Quote className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              What Our 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                content: "FindMyEstate made finding my dream home effortless. The platform is intuitive and the properties are truly premium quality.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Property Investor",
                content: "As an investor, I've found incredible opportunities here. The verification process gives me complete confidence in every listing.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "First-time Buyer",
                content: "The team guided me through every step. From search to closing, the experience was seamless and professional.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card 
                key={index}
                className="border-2 border-primary/10 shadow-vibrant hover:shadow-coral transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-8 pb-8">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground dark:text-muted-foreground mb-6 leading-relaxed text-base italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-bold text-lg text-foreground dark:text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground dark:text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 bg-gradient-hero text-primary-foreground overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl animate-glow" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/30 border border-secondary/40 backdrop-blur-sm mb-8 animate-fade-in-down shadow-coral">
            <Sparkles className="h-4 w-4 text-foreground dark:text-foreground animate-pulse" />
            <span className="text-sm font-semibold text-foreground dark:text-foreground">Start Your Journey</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up">
            <span className="text-foreground dark:text-foreground">
              Ready to Find Your
            </span>
            <br />
            <span className="text-primary dark:text-primary">Dream Estate?</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-foreground/80 dark:text-foreground/85 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Join thousands of satisfied clients who found their perfect property with us
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-coral hover:shadow-xl transition-all duration-300 group px-10 h-16 text-lg">
              <Link to="/auth?mode=signup">
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/80 dark:bg-background/60 border-2 border-primary/30 hover:bg-background/90 dark:hover:bg-background/70 backdrop-blur-sm h-16 px-10 text-lg text-foreground dark:text-foreground">
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
