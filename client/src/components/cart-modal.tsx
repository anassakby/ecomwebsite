import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartModal({ open, onOpenChange }: CartModalProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide. Ajoutez des produits pour continuer.",
        variant: "destructive",
      });
      return;
    }

    // Redirect to checkout page
    onOpenChange(false);
    window.location.href = '/checkout';
  };

  if (cart.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Panier d'achat</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-8">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Votre panier est vide</h3>
            <p className="text-muted-foreground mb-4">
              Ajoutez des produits pour commencer vos achats
            </p>
            <Button onClick={() => onOpenChange(false)}>
              Continuer vos achats
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Panier d'achat</span>
              <Badge variant="secondary">{cart.length} articles</Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Vider
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">€{item.price}</p>
                  <Badge variant="outline" className="text-xs">
                    {item.brand}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter className="border-t pt-4">
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-primary">€{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Continuer vos achats
              </Button>
              <Button 
                onClick={handleCheckout}
                className="flex-1 btn-gradient"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Valider la commande
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
