import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Droplets, MapPin, Camera, Sparkles, Gamepad2, Heart, Mail, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PRODUCTS, CATEGORIES, BUSINESS_INFO } from "@/lib/constants";
import { getProductImage } from "@/lib/productImages";
import heroPets from "@/assets/hero-pets.jpg";

const categoryIcons: Record<string, React.ReactNode> = {
  feeders: <Utensils className="h-6 w-6" />,
  fountains: <Droplets className="h-6 w-6" />,
  trackers: <MapPin className="h-6 w-6" />,
  cameras: <Camera className="h-6 w-6" />,
  litter: <Sparkles className="h-6 w-6" />,
  toys: <Gamepad2 className="h-6 w-6" />,
  health: <Heart className="h-6 w-6" />,
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <AnimatedSection animation="fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Premium Pet Technology
                </span>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                  Smarter Tech for{" "}
                  <span className="text-gradient">Happier Pets</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Discover innovative smart devices designed to enhance your pet's life. From automated feeders to GPS trackers – we've got your furry friends covered.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="hero" size="xl">
                    <Link to="/shop">
                      Shop Smart Pet Tech
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="xl">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </AnimatedSection>

              {/* Trust indicators */}
              <AnimatedSection animation="fade-up" delay={400}>
                <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Verified Business</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-primary transition-colors">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-primary transition-colors">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Hero Image */}
            <AnimatedSection animation="scale-in" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                <img
                  src={heroPets}
                  alt="Happy pets with smart technology"
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of smart pet products designed to make life easier for you and your pets.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((category, index) => (
              <AnimatedSection key={category.id} delay={index * 50}>
                <Link
                  to={category.href}
                  className="group flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {categoryIcons[category.id]}
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Trust Us</h2>
            <p className="text-muted-foreground">
              We believe in transparency and customer satisfaction
            </p>
          </AnimatedSection>
          <TrustBadges />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Our most popular smart pet devices
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/shop">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 8).map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 75}>
                <ProductCard
                  {...product}
                  image={getProductImage(product.image)}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 gradient-hero text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Upgrade Your Pet's Life?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of happy pet owners who trust our smart technology for their beloved companions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="xl" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/trust">Learn About Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-12 bg-surface border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-lg mb-1">{BUSINESS_INFO.name}</h3>
              <p className="text-muted-foreground">{BUSINESS_INFO.fullAddress}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {BUSINESS_INFO.email}
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
