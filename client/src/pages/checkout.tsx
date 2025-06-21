import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, ShoppingBag, Check } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setOrderCompleted(true);
      toast({
        title: "Commande passée avec succès!",
        description: "Merci pour votre commande. Vous recevrez un e-mail de confirmation sous peu.",
        className: "success-message",
      });
      
      // Clear cart and redirect after showing success
      setTimeout(() => {
        clearCart();
        setLocation("/");
      }, 3000);
    }, 2000);
  };

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Panier vide</h2>
            <p className="text-muted-foreground mb-6">
              Votre panier est vide. Ajoutez des produits pour continuer.
            </p>
            <Link href="/">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">
              Commande confirmée!
            </h2>
            <p className="text-muted-foreground mb-6">
              Votre commande a été passée avec succès. Vous recevrez un e-mail de confirmation sous peu.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirection automatique vers l'accueil...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Finaliser la commande</h1>
          <p className="text-muted-foreground">
            Vérifiez votre commande avant de procéder au paiement
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantité: {item.quantity}
                        </p>
                        {item.discountPercentage > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            -{item.discountPercentage}%
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {(item.price * item.quantity).toFixed(2)} €
                        </p>
                        {item.discountPercentage > 0 && (
                          <p className="text-sm text-muted-foreground line-through">
                            {((item.price / (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2)} €
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Total de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{cartTotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{cartTotal.toFixed(2)} €</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full btn-gradient"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="loading mr-2" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Procéder au paiement
                    </>
                  )}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  <p>Paiement sécurisé</p>
                  <p>Vos données sont protégées</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}