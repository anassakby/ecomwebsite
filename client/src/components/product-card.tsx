import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { ProductModal } from "@/components/product-modal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('=== PRODUCT CARD ADD TO CART ===');
    console.log('Product being added:', product);
    console.log('AddToCart function:', addToCart);
    addToCart(product);
    console.log('=== PRODUCT CARD ADD TO CART END ===');
  };

  return (
    <>
      <Card className="product-card cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="relative overflow-hidden">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            className="product-image"
          />
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive">
              -{Math.round(product.discountPercentage)}%
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <Badge variant="outline">{product.brand}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">
                €{product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  €{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>
            
            <Button 
              size="sm"
              className="btn-gradient"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      <ProductModal 
        product={product}
        open={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
}
