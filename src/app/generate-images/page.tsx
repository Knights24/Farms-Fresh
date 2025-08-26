'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, Image as ImageIcon, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { produce } from '@/lib/data';

interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  productName: string;
  category: string;
}

export default function ImageGeneratorPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Vegetables',
    description: '',
    style: 'realistic'
  });

  const categories = ['Vegetables', 'Fruits', 'Herbs', 'Dairy'];
  const styles = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic product shots' },
    { value: 'stylized', label: 'Stylized', description: 'Artistic with vibrant colors' },
    { value: 'minimal', label: 'Minimal', description: 'Clean, minimalist composition' }
  ];

  const handleProductSelect = (productId: string) => {
    const product = produce.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(productId);
      setFormData({
        productName: product.name,
        category: product.category,
        description: product.description,
        style: 'realistic'
      });
    }
  };

  const generateImage = async () => {
    if (!formData.productName || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in product name and description.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setGeneratedImage(result);
        toast({
          title: "Image Generated Successfully!",
          description: `Generated image for ${result.productName}`,
        });
      } else {
        throw new Error(result.error || 'Failed to generate image');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate product image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedImage.productName.toLowerCase().replace(/\s+/g, '-')}-product-image.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Image Downloaded",
        description: "Product image has been saved to your downloads.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the image. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Wand2 className="h-16 w-16 mx-auto text-green-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Product Image Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate high-quality product images for your Farm Fresh catalog using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Generate Product Image
              </CardTitle>
              <CardDescription>
                Enter product details or select from existing products to generate custom images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Product Selector */}
              <div className="space-y-2">
                <Label htmlFor="existing-product">Quick Select (Optional)</Label>
                <Select onValueChange={handleProductSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose from existing products..." />
                  </SelectTrigger>
                  <SelectContent>
                    {produce.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - {product.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Product Details</h3>
                
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    placeholder="e.g., Organic Tomatoes"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: string) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the product's key characteristics..."
                    rows={3}
                  />
                </div>

                {/* Style Selection */}
                <div className="space-y-2">
                  <Label htmlFor="style">Image Style</Label>
                  <Select value={formData.style} onValueChange={(value: string) => setFormData({...formData, style: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div>
                            <div className="font-medium">{style.label}</div>
                            <div className="text-sm text-gray-500">{style.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={generateImage} 
                  disabled={isGenerating}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Image...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated Image Display */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Image</CardTitle>
              <CardDescription>
                Your AI-generated product image will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImage ? (
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={generatedImage.imageUrl}
                      alt={generatedImage.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">{generatedImage.productName}</h3>
                    <p className="text-sm text-gray-600">Category: {generatedImage.category}</p>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 font-mono">
                        <strong>Prompt:</strong> {generatedImage.prompt}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={downloadImage} variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatedImage.imageUrl);
                        toast({
                          title: "URL Copied",
                          description: "Image URL copied to clipboard"
                        });
                      }} 
                      variant="outline" 
                      className="flex-1"
                    >
                      Copy URL
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">No image generated yet</p>
                    <p className="text-sm">Fill in the form and click "Generate Image"</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
