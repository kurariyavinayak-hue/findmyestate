import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Calendar, User, Phone, Mail, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useProperty } from '@/hooks/useProperties';

const PropertyDetails = () => {
  const { id } = useParams();
  const { property, loading } = useProperty(id || '');

  const formatIndianPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
            <Button asChild>
              <Link to="/properties">Back to Properties</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/properties">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Image Carousel */}
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {property.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`${property.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
                {property.featured && (
                  <Badge className="absolute top-4 left-4 bg-secondary">Featured</Badge>
                )}
              </div>

              {/* Property Details */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-5 w-5" />
                          <span>
                            {property.address}, {property.city}, {property.state} {property.zip_code}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">
                          {formatIndianPrice(Number(property.price))}
                        </div>
                        <Badge variant="outline" className="mt-2 capitalize">
                          {property.property_type}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <Bed className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="font-semibold">{property.bedrooms}</div>
                        <div className="text-sm text-muted-foreground">Bedrooms</div>
                      </div>
                      <div className="text-center">
                        <Bath className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="font-semibold">{property.bathrooms}</div>
                        <div className="text-sm text-muted-foreground">Bathrooms</div>
                      </div>
                      <div className="text-center">
                        <Maximize className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="font-semibold">{Number(property.area).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Sqft</div>
                      </div>
                      <div className="text-center">
                        <Calendar className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="font-semibold">{new Date(property.created_at).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground">Listed</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Seller Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{property.seller?.name || 'Unknown'}</div>
                          <div className="text-sm text-muted-foreground">Property Owner</div>
                        </div>
                      </div>

                      {property.seller && (
                        <div className="space-y-3 pt-4 border-t">
                          {property.seller.phone && (
                            <a
                              href={`tel:${property.seller.phone}`}
                              className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                            >
                              <Phone className="h-4 w-4" />
                              <span>{property.seller.phone}</span>
                            </a>
                          )}
                          <a
                            href={`mailto:${property.seller.email}`}
                            className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                          >
                            <Mail className="h-4 w-4" />
                            <span>{property.seller.email}</span>
                          </a>
                        </div>
                      )}
                      </div>
                    </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Button className="w-full" size="lg">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Seller
                    </Button>
                    <Button className="w-full" variant="outline" size="lg">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                      By contacting the seller, you agree to our Terms of Service
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
