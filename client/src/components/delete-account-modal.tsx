import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface DeleteAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAccountModal({ open, onOpenChange }: DeleteAccountModalProps) {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre mot de passe pour confirmer la suppression.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);

    try {
      await apiRequest("DELETE", "/api/auth/delete-account", { password });
      
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès.",
      });
      
      await logout();
      onOpenChange(false);
      setPassword("");
    } catch (error: any) {
      toast({
        title: "Erreur de suppression",
        description: error.message || "Une erreur est survenue lors de la suppression du compte.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <span>Supprimer le compte</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium mb-2">
              ⚠️ Action irréversible
            </p>
            <p className="text-sm text-muted-foreground">
              Cette action supprimera définitivement votre compte et toutes vos données. 
              Cette action ne peut pas être annulée.
            </p>
          </div>

          <form onSubmit={handleDelete} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delete-password">
                Confirmez avec votre mot de passe
              </Label>
              <Input
                id="delete-password"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDeleting}
                className="border-destructive/30 focus:border-destructive"
              />
            </div>
            
            <DialogFooter className="space-x-2">
              <Button 
                type="button"
                variant="outline" 
                onClick={handleCancel}
                disabled={isDeleting}
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                variant="destructive"
                disabled={isDeleting || !password}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  "Supprimer définitivement"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}