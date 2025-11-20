import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AddProperty = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [taxReceiptFile, setTaxReceiptFile] = useState<File | null>(null);
  const [taxReceiptPreview, setTaxReceiptPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const taxReceiptInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthenticated, navigate]);

  // Load property data when in edit mode
  useEffect(() => {
    const loadPropertyData = async () => {
      if (!isEditMode || !id) return;

      setIsLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Failed to load property data');
        navigate('/dashboard');
        return;
      }

      if (data.seller_id !== user?.id) {
        toast.error('You can only edit your own properties');
        navigate('/dashboard');
        return;
      }

      setFormData({
        title: data.title,
        price: data.price.toString(),
        type: data.property_type,
        bedrooms: data.bedrooms.toString(),
        bathrooms: data.bathrooms.toString(),
        area: data.area.toString(),
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zip_code,
        description: data.description,
        phone: '',
      });

      if (data.images && data.images.length > 0) {
        setImagePreviews(data.images);
      }

      setIsLoading(false);
    };

    loadPropertyData();
  }, [isEditMode, id, user, navigate]);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    phone: '',
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

      if (!isValidType) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} exceeds 10MB size limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Add to existing files
    setImageFiles(prev => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    toast.success(`${validFiles.length} image(s) selected`);
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleTaxReceiptSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type and size
    const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

    if (!isValidType) {
      toast.error('Tax receipt must be an image or PDF file');
      return;
    }
    if (!isValidSize) {
      toast.error('File exceeds 10MB size limit');
      return;
    }

    setTaxReceiptFile(file);

    // Create preview for images only
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTaxReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setTaxReceiptPreview('');
    }

    toast.success('Tax receipt selected');
  };

  const removeTaxReceipt = () => {
    setTaxReceiptFile(null);
    setTaxReceiptPreview('');
    if (taxReceiptInputRef.current) {
      taxReceiptInputRef.current.value = '';
    }
  };

  const uploadTaxReceipt = async (): Promise<string | null> => {
    if (!taxReceiptFile) return null;

    const fileExt = taxReceiptFile.name.split('.').pop();
    const fileName = `${user?.id}/tax-receipts/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(fileName, taxReceiptFile);

    if (error) {
      console.error('Tax receipt upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('property-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return [];

    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate tax receipt is uploaded (only required for new properties)
    if (!isEditMode && !taxReceiptFile) {
      toast.error('Please upload a tax receipt to proceed');
      return;
    }
    
    setIsLoading(true);

    try {
      let imageUrls = imagePreviews;
      let taxReceiptUrl = null;

      // Upload new images if any
      if (imageFiles.length > 0) {
        const uploadedImageUrls = await uploadImages();
        imageUrls = isEditMode ? [...imagePreviews, ...uploadedImageUrls] : uploadedImageUrls;
      }
      
      // Upload tax receipt if provided
      if (taxReceiptFile) {
        taxReceiptUrl = await uploadTaxReceipt();
      }

      const propertyData = {
        seller_id: user?.id,
        title: formData.title,
        price: parseInt(formData.price),
        property_type: formData.type,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        description: formData.description,
        images: imageUrls,
        ...(taxReceiptUrl && { tax_receipt_url: taxReceiptUrl }),
        ...(isEditMode && { status: 'pending' }), // Reset status to pending on edit
      };

      if (isEditMode) {
        // Update existing property
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Property updated successfully!');
      } else {
        // Insert new property
        const { error } = await supabase
          .from('properties')
          .insert(propertyData);

        if (error) throw error;
        toast.success('Property listed successfully!');
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'list'} property. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{isEditMode ? 'Edit Property' : 'List Your Property'}</CardTitle>
              <CardDescription>
                {isEditMode ? 'Update your property details' : 'Fill in the details below to list your property for sale'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Modern Luxury Villa with Ocean View"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="425000"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Property Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleChange('type', value)} required>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms *</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        placeholder="3"
                        value={formData.bedrooms}
                        onChange={(e) => handleChange('bedrooms', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms *</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        placeholder="2"
                        value={formData.bathrooms}
                        onChange={(e) => handleChange('bathrooms', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area">Area (sqft) *</Label>
                      <Input
                        id="area"
                        type="number"
                        placeholder="2200"
                        value={formData.area}
                        onChange={(e) => handleChange('area', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Location</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Austin"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="TX"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="78701"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Property Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your property in detail..."
                      className="min-h-32"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Images Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Property Images</h3>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Click to upload property images</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB (Multiple images allowed)
                    </p>
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tax Receipt Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tax Receipt *</h3>
                  <p className="text-sm text-muted-foreground">Upload a recent tax receipt for land verification purposes</p>
                  
                  <input
                    ref={taxReceiptInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleTaxReceiptSelect}
                    className="hidden"
                  />
                  
                  <div 
                    onClick={() => taxReceiptInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                  >
                    <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Click to upload tax receipt</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or PDF up to 10MB
                    </p>
                  </div>

                  {/* Tax Receipt Preview */}
                  {taxReceiptFile && (
                    <div className="relative">
                      {taxReceiptPreview ? (
                        <div className="relative group">
                          <img
                            src={taxReceiptPreview}
                            alt="Tax receipt preview"
                            className="w-full max-w-sm h-48 object-cover rounded-lg mx-auto"
                          />
                          <button
                            type="button"
                            onClick={removeTaxReceipt}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg max-w-sm mx-auto">
                          <span className="text-sm font-medium">{taxReceiptFile.name}</span>
                          <button
                            type="button"
                            onClick={removeTaxReceipt}
                            className="bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1" disabled={isLoading}>
                    {isLoading ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update Property' : 'Publish Property')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(-1)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddProperty;
