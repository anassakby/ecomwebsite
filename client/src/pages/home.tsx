import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/animated-background";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Shield, 
  Truck, 
  Users, 
  Star,
  ChevronDown,
  Loader2
} from "lucide-react";
import { useProducts } from "@/hooks/use-products";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const { products, categories, isLoading, filters, setFilters, totalProducts } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto px-4">
          <h1 className="hero-title">
            Découvrez l'Excellence
          </h1>
          <p className="hero-subtitle">
            Une expérience d'achat premium avec des produits de qualité et une livraison rapide
          </p>
          <Button 
            size="lg" 
            className="btn-gradient text-lg px-8 py-3"
            onClick={scrollToProducts}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Commencer vos achats
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="feature-card">
              <CardContent className="p-6 text-center">
                <div className="feature-icon mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Secure Checkout & Multiple Payment Options
                </h3>
                <p className="text-muted-foreground text-sm">
                  Paiement sécurisé avec plusieurs options de paiement disponibles.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6 text-center">
                <div className="feature-icon mb-4">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Fast & Reliable Delivery
                </h3>
                <p className="text-muted-foreground text-sm">
                  Livraison rapide et fiable dans les meilleurs délais.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6 text-center">
                <div className="feature-icon mb-4">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Personalized Shopping
                </h3>
                <p className="text-muted-foreground text-sm">
                  Expérience d'achat personnalisée selon vos préférences.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6 text-center">
                <div className="feature-icon mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Your Account, Your Control
                </h3>
                <p className="text-muted-foreground text-sm">
                  Contrôle total sur votre compte et vos commandes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nos Produits</h2>
            <p className="text-xl text-muted-foreground">
              Découvrez notre collection de produits premium
            </p>
          </div>

          {/* Filters */}
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            totalProducts={totalProducts}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Chargement des produits...</p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && totalProducts === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Essayez de modifier vos filtres pour voir plus de résultats.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    search: '',
                    category: '',
                    priceRange: [0, 2000],
                    sortBy: '',
                  })}
                >
                  Effacer les filtres
                </Button>
              </CardContent>
            </Card>
          )}

          {!isLoading && paginatedProducts.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="justify-center">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}

              {/* Results Info */}
              <div className="text-center mt-6">
                <Badge variant="secondary" className="text-sm">
                  Affichage de {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalProducts)} sur {totalProducts} produits
                </Badge>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">E-commerce</span>
              </div>
              <p className="text-muted-foreground">
                Votre destination premium pour une expérience d'achat exceptionnelle.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>À propos</li>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Conditions d'utilisation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <p className="text-muted-foreground">
                Restez connecté pour les dernières nouveautés et offres spéciales.
              </p>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 E-commerce. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
