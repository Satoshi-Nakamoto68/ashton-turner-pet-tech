import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, Check, Truck, RefreshCw, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PRODUCTS, BUSINESS_INFO } from "@/lib/constants";
import { getProductImage } from "@/lib/productImages";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: getProductImage(product.image),
      });
    }
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/shop" className="text-muted-foreground hover:text-foreground">Shop</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <AnimatedSection>
          <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden">
              <img
                src={getProductImage(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {"badge" in product && product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection delay={100} className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating)
                        ? "text-accent fill-accent"
                        : "text-border"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {"originalPrice" in product && product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {"originalPrice" in product && product.originalPrice && (
                <span className="px-2 py-1 bg-accent/10 text-accent text-sm font-medium rounded">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-muted-foreground">
              Experience the future of pet care with our {product.name}. Designed for modern pet owners, this smart device combines cutting-edge technology with user-friendly features. Compatible with both iOS and Android apps for seamless control from anywhere.
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button size="lg" onClick={handleAddToCart} className="flex-1 sm:flex-none">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              <Button size="lg" variant="outline" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-1 text-primary" />
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-1 text-primary" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-1 text-primary" />
                <span className="text-xs text-muted-foreground">1 Year Warranty</span>
              </div>
            </div>

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="features">
                <AccordionTrigger>Features & Benefits</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Smart app control for iOS and Android</li>
                    <li>• Wi-Fi enabled for remote access</li>
                    <li>• Energy-efficient design</li>
                    <li>• Easy to clean and maintain</li>
                    <li>• Durable, pet-safe materials</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Connectivity:</span>
                      <span className="ml-2">Wi-Fi 2.4GHz</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">App Support:</span>
                      <span className="ml-2">iOS & Android</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Material:</span>
                      <span className="ml-2">BPA-Free Plastic</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Warranty:</span>
                      <span className="ml-2">1 Year</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Free standard shipping on orders over $50. Express shipping available.
                    30-day money-back guarantee for unused items.
                  </p>
                  <p className="text-sm">
                    Contact: {BUSINESS_INFO.email} | {BUSINESS_INFO.phone}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedSection>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <AnimatedSection className="mb-8">
              <h2 className="text-2xl font-bold">Complete Your Pet Setup</h2>
              <p className="text-muted-foreground">Products that go great together</p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 75}>
                  <ProductCard
                    {...product}
                    image={getProductImage(product.image)}
                  />
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
