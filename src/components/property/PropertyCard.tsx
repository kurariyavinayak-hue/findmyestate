import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/hooks/useProperties';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatIndianPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link to={`/properties/${property.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {property.featured && (
            <Badge className="absolute top-4 left-4 bg-secondary">
              Featured
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorited(!isFavorited);
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-destructive text-destructive' : ''}`} />
          </Button>
        </div>
      </Link>

      <CardContent className="p-5">
        <Link to={`/properties/${property.id}`}>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <span className="font-bold text-xl text-primary whitespace-nowrap">
                {formatIndianPrice(property.price)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">
                {property.city}, {property.state}
              </span>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t">
              <div className="flex items-center gap-1.5 text-sm">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Maximize className="h-4 w-4 text-muted-foreground" />
                <span>{property.area.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
