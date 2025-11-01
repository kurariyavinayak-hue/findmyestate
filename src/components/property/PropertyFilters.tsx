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
              placeholder="City, State, or PIN Code (e.g., Mumbai, Maharashtra)"
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
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="independent house">Independent House</SelectItem>
              <SelectItem value="builder floor">Builder Floor</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="plot">Plot</SelectItem>
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
              <SelectItem value="0-5000000">Under ₹50 Lac</SelectItem>
              <SelectItem value="5000000-10000000">₹50 Lac - ₹1 Cr</SelectItem>
              <SelectItem value="10000000-25000000">₹1 Cr - ₹2.5 Cr</SelectItem>
              <SelectItem value="25000000-50000000">₹2.5 Cr - ₹5 Cr</SelectItem>
              <SelectItem value="50000000-999999999">Over ₹5 Cr</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default PropertyFilters;
