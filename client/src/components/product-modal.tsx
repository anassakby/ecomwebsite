import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Package, Truck, Shield } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    console.log('Product modal - adding to cart:', { product, quantity });
    addToCart(product, quantity);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img 
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Price and Rating */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">
                  €{product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      €{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <Badge className="bg-destructive">
                      -{Math.round(product.discountPercentage)}% OFF
                    </Badge>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating})
                </span>
              </div>
            </div>

            {/* Brand and Category */}
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{product.brand}</Badge>
              <Badge variant="outline">{product.category}</Badge>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="font-medium">Quantité:</label>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 border rounded text-center min-w-[50px]">
                  {quantity}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full btn-gradient text-lg py-3"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Ajouter au panier - €{(product.price * quantity).toFixed(2)}
            </Button>

            {/* Features */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm">Paiement sécurisé</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Livraison rapide</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
