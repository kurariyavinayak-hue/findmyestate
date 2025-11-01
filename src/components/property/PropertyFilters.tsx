import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PropertyFiltersProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: string) => void;
  onPriceRangeChange: (range: string) => void;
}

const PropertyFilters = ({ onSearch, onTypeChange, onPriceRangeChange }: PropertyFiltersProps) => {
  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Filter Properties</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="search" className="mb-2 block">Search Location</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="City, State, or Zip Code"
              className="pl-10"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="type" className="mb-2 block">Property Type</Label>
          <Select onValueChange={onTypeChange}>
            <SelectTrigger id="type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="price" className="mb-2 block">Price Range</Label>
          <Select onValueChange={onPriceRangeChange}>
            <SelectTrigger id="price">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-300000">Under $300K</SelectItem>
              <SelectItem value="300000-600000">$300K - $600K</SelectItem>
              <SelectItem value="600000-1000000">$600K - $1M</SelectItem>
              <SelectItem value="1000000-99999999">Over $1M</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default PropertyFilters;
