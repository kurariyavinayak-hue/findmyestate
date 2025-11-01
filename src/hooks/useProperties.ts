import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Property {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: 'house' | 'apartment' | 'condo' | 'land' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  featured: boolean;
  status: 'available' | 'pending' | 'sold';
  created_at: string;
  seller?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        profiles!properties_seller_id_fkey (
          name,
          email,
          phone
        )
      `)
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const formattedProperties: Property[] = data.map((prop: any) => ({
        ...prop,
        property_type: prop.property_type as Property['property_type'],
        status: prop.status as Property['status'],
        seller: Array.isArray(prop.profiles) ? prop.profiles[0] : prop.profiles,
      }));
      setProperties(formattedProperties);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    refetch: fetchProperties,
  };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles!properties_seller_id_fkey (
            name,
            email,
            phone
          )
        `)
        .eq('id', id)
        .single();

      if (!error && data) {
        setProperty({
          ...data,
          property_type: data.property_type as Property['property_type'],
          status: data.status as Property['status'],
          seller: Array.isArray(data.profiles) ? data.profiles[0] : data.profiles,
        });
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  return { property, loading };
};

export const useUserProperties = (userId?: string) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProperties = async () => {
    if (!userId) {
      setProperties([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const formattedProperties: Property[] = data.map((prop: any) => ({
        ...prop,
        property_type: prop.property_type as Property['property_type'],
        status: prop.status as Property['status'],
      }));
      setProperties(formattedProperties);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserProperties();
  }, [userId]);

  return { properties, loading, refetch: fetchUserProperties };
};
