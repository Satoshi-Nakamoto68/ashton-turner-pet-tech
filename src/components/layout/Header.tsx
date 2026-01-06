import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-primary-foreground font-bold text-lg">SP</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg text-foreground">Smart Pet</span>
            <span className="block text-xs text-muted-foreground -mt-0.5">Products</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            link.label === "Shop" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname.startsWith("/shop")
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-secondary"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isShopOpen && "rotate-180")} />
                </Link>
                
                {/* Mega Menu */}
                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
                  isShopOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                )}>
                  <div className="bg-card rounded-xl shadow-xl border border-border p-6 min-w-[500px]">
                    <div className="grid grid-cols-2 gap-3">
                      {CATEGORIES.map((category) => (
                        <Link
                          key={category.id}
                          to={category.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <span className="text-lg">🔌</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{category.name}</p>
                            <p className="text-xs text-muted-foreground">{category.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <Link
                        to="/shop"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View all products →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          <Button asChild className="hidden sm:flex" size="sm">
            <Link to="/shop">Shop Now</Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-300 border-t border-border",
        isMenuOpen ? "max-h-[500px]" : "max-h-0"
      )}>
        <nav className="container py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg font-medium transition-colors",
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border mt-2">
            <Button asChild className="w-full">
              <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
                Shop Smart Pet Tech
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
