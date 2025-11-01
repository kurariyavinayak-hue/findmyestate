import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useUserProperties } from '@/hooks/useProperties';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { properties: userProperties, loading, refetch } = useUserProperties(user?.id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Property deleted successfully');
    refetch();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container">
          {/* User Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back, {profile?.name || 'User'}!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{profile?.email}</p>
                </div>
                {profile?.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Listings</p>
                  <p className="font-medium">{userProperties.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Properties Section */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Properties</h2>
            <Button asChild>
              <Link to="/add-property">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Property
              </Link>
            </Button>
          </div>

          {loading ? (
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground">Loading properties...</p>
            </Card>
          ) : userProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {userProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-64 md:flex-shrink-0">
                      {property.images.length > 0 && (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="h-48 w-full object-cover md:h-full"
                        />
                      )}
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{property.title}</h3>
                            {property.featured && <Badge>Featured</Badge>}
                            <Badge variant="outline" className="capitalize">
                              {property.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {property.city}, {property.state}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ${Number(property.price).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">{property.description}</p>

                      <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/properties/${property.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground mb-4">
                You haven't listed any properties yet
              </p>
              <Button asChild size="lg">
                <Link to="/add-property">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  List Your First Property
                </Link>
              </Button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
