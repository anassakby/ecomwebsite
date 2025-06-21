import { Link } from "wouter";
import { ShoppingCart, User, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { CartModal } from "@/components/cart-modal";
import { DeleteAccountModal } from "@/components/delete-account-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                E-commerce
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => {
                  console.log('Cart button clicked, items count:', cartItemsCount);
                  setShowCartModal(true);
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="cart-badge">
                    {cartItemsCount}
                  </span>
                )}

              </Button>

              {/* User Account */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>{user?.firstName || user?.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleLogout}>
                      Se déconnecter
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setShowDeleteModal(true)}
                      className="text-destructive focus:text-destructive"
                    >
                      Supprimer le compte
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowAuthModal(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Se connecter
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {theme === "light" ? (
                      <>
                        <Moon className="h-4 w-4 mr-2" />
                        Mode sombre
                      </>
                    ) : (
                      <>
                        <Sun className="h-4 w-4 mr-2" />
                        Mode clair
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowCartModal(true)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Panier ({cartItemsCount})
                  </DropdownMenuItem>
                  {isAuthenticated ? (
                    <DropdownMenuItem onClick={handleLogout}>
                      Se déconnecter
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => setShowAuthModal(true)}>
                      <User className="h-4 w-4 mr-2" />
                      Se connecter
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <CartModal open={showCartModal} onOpenChange={setShowCartModal} />
      <DeleteAccountModal open={showDeleteModal} onOpenChange={setShowDeleteModal} />
    </>
  );
}
