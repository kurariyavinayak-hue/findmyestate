import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, FileText, CheckCircle, XCircle, Eye, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  status: string;
  tax_receipt_url: string | null;
  created_at: string;
  seller_id: string;
  featured: boolean;
}

interface Profile {
  id: string;
  name: string;
  email: string;
}

interface PropertyWithSeller extends Property {
  seller: Profile | null;
}

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<PropertyWithSeller[]>([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    pendingVerification: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    checkAdminAccess();
  }, [user, isAuthenticated]);

  const checkAdminAccess = async () => {
    if (!isAuthenticated || !user) {
      navigate('/auth?mode=login');
      return;
    }

    try {
      // Check if user has admin role using the security definer function
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      });

      if (error) throw error;

      if (!data) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }

      setIsAdmin(true);
      loadDashboardData();
    } catch (error) {
      console.error('Error checking admin access:', error);
      toast.error('Failed to verify admin access');
      navigate('/');
    }
  };

  const loadDashboardData = async () => {
    try {
      // Load all properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (propertiesError) throw propertiesError;

      // Load all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Join properties with sellers
      const propertiesWithSellers: PropertyWithSeller[] = (propertiesData || []).map(property => ({
        ...property,
        seller: profilesData?.find(p => p.id === property.seller_id) || null,
      }));

      setProperties(propertiesWithSellers);

      // Load user count
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (userError) throw userError;

      // Calculate stats
      const totalProps = propertiesData?.length || 0;
      const pendingVerification = propertiesData?.filter(p => p.tax_receipt_url).length || 0;

      setStats({
        totalProperties: totalProps,
        pendingVerification,
        totalUsers: userCount || 0,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const viewTaxReceipt = (url: string) => {
    window.open(url, '_blank');
  };

  const updatePropertyStatus = async (propertyId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .eq('id', propertyId);

      if (error) throw error;

      toast.success(`Property status updated to ${newStatus}`);
      loadDashboardData();
    } catch (error) {
      console.error('Error updating property status:', error);
      toast.error('Failed to update property status');
    }
  };

  const toggleFeaturedStatus = async (propertyId: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ featured: !currentFeatured })
        .eq('id', propertyId);

      if (error) throw error;

      toast.success(`Property ${!currentFeatured ? 'marked as featured' : 'removed from featured'}`);
      loadDashboardData();
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast.error('Failed to update featured status');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage properties and verify listings</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProperties}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">With Tax Receipts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingVerification}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
          </div>

          {/* Properties Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Properties</CardTitle>
              <CardDescription>
                Manage and verify property listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Tax Receipt</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">
                        <button
                          onClick={() => navigate(`/properties/${property.id}`)}
                          className="text-primary hover:underline cursor-pointer text-left"
                        >
                          {property.title}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{property.seller?.name || 'Unknown'}</span>
                          <span className="text-xs text-muted-foreground">{property.seller?.email || 'No email'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{property.city}, {property.state}</TableCell>
                      <TableCell>₹{property.price.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <Badge variant={
                          property.status === 'available' ? 'default' : 
                          property.status === 'rejected' ? 'destructive' : 
                          'secondary'
                        }>
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {property.status === 'available' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeaturedStatus(property.id, property.featured)}
                            className="hover:bg-accent"
                          >
                            <Star 
                              className={`h-5 w-5 ${property.featured ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`} 
                            />
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {property.tax_receipt_url ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewTaxReceipt(property.tax_receipt_url!)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">No receipt</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {property.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updatePropertyStatus(property.id, 'available')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => updatePropertyStatus(property.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {property.status === 'available' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updatePropertyStatus(property.id, 'pending')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Suspend
                            </Button>
                          )}
                          {property.status === 'rejected' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updatePropertyStatus(property.id, 'pending')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Review Again
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {properties.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No properties found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;