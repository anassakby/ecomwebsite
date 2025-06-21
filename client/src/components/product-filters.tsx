import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterState, Category } from "@/lib/types";

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: Category[];
  totalProducts: number;
}

export function ProductFilters({ 
  filters, 
  onFiltersChange, 
  categories, 
  totalProducts 
}: ProductFiltersProps) {
  
  const updateFilter = (key: keyof FilterState, value: any) => {
    // Handle special values
    if (key === 'category' && value === 'all') {
      value = '';
    }
    if (key === 'sortBy' && value === 'none') {
      value = '';
    }
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      category: '',
      priceRange: [0, 2000],
      sortBy: '',
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.sortBy || 
    filters.priceRange[0] > 0 || filters.priceRange[1] < 2000;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Filtres ({totalProducts} produits)
          </h3>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Effacer
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="search-container relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher des produits..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select 
            value={filters.category || "all"} 
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes catégories</SelectItem>
              {categories?.map((category) => {
                const categoryName = category.name || category.slug;
                const categoryValue = category.slug;
                return (
                  <SelectItem key={categoryValue} value={categoryValue}>
                    {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                  </SelectItem>
                );
              }) || []}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select 
            value={filters.sortBy || "none"} 
            onValueChange={(value) => updateFilter('sortBy', value as FilterState['sortBy'])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucun tri</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="name-asc">Nom A-Z</SelectItem>
              <SelectItem value="name-desc">Nom Z-A</SelectItem>
              <SelectItem value="rating-desc">Meilleure note</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <div className="col-span-1 lg:col-span-2">
            <Label className="text-sm font-medium">
              Prix: €{filters.priceRange[0]} - €{filters.priceRange[1]}
            </Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
              max={2000}
              min={0}
              step={10}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
