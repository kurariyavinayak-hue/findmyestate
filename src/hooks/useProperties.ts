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
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Fetch seller profiles separately
      const sellerIds = [...new Set(data.map(p => p.seller_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, email, phone')
        .in('id', sellerIds);

      const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

      const formattedProperties: Property[] = data.map((prop: any) => ({
        ...prop,
        property_type: prop.property_type as Property['property_type'],
        status: prop.status as Property['status'],
        seller: profilesMap.get(prop.seller_id),
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
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        // Fetch seller profile separately
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email, phone')
          .eq('id', data.seller_id)
          .single();

        setProperty({
          ...data,
          property_type: data.property_type as Property['property_type'],
          status: data.status as Property['status'],
          seller: profile || undefined,
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
