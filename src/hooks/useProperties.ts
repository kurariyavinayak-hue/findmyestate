import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Property {
  id: string;
  title: string;
  price: string | number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: string;
  bedrooms: number;
  bathrooms: string | number;
  area: string | number;
  description: string;
  images: string[];
  featured: boolean;
  seller_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
    email: string;
    phone?: string;
  } | null;
}

export const useProperties = (filters?: {
  city?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('properties')
        .select(`
          *,
          profiles (
            name,
            email,
            phone
          )
        `)
        .eq('status', 'available');

      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      if (filters?.propertyType && filters.propertyType !== 'all') {
        query = query.eq('property_type', filters.propertyType);
      }
      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { properties, loading, refetch: fetchProperties };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles (
            name,
            email,
            phone
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { property, loading, refetch: fetchProperty };
};

export const useUserProperties = (userId: string | undefined) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchUserProperties();
    }
  }, [userId]);

  const fetchUserProperties = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('seller_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { properties, loading, refetch: fetchUserProperties };
};
