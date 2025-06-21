import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Lock } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { login, register, isLoginPending, isRegisterPending } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    try {
      await login(loginData);
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
      });
      onOpenChange(false);
      setLoginData({ email: "", password: "" });
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.email || !registerData.password || !registerData.firstName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    try {
      await register(registerData);
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
      onOpenChange(false);
      setRegisterData({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Bienvenue sur E-commerce
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Se connecter</TabsTrigger>
            <TabsTrigger value="register">S'inscrire</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-10"
                    disabled={isLoginPending}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10"
                    disabled={isLoginPending}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-gradient" 
                disabled={isLoginPending}
              >
                {isLoginPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="register-firstName">Prénom *</Label>
                  <Input
                    id="register-firstName"
                    placeholder="Prénom"
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                    disabled={isRegisterPending}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-lastName">Nom</Label>
                  <Input
                    id="register-lastName"
                    placeholder="Nom"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    disabled={isRegisterPending}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="pl-10"
                    disabled={isRegisterPending}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Mot de passe *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="pl-10"
                    disabled={isRegisterPending}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-gradient" 
                disabled={isRegisterPending}
              >
                {isRegisterPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inscription...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Créer mon compte
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
