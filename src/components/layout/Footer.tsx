import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-4 group">
              <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                <Home className="h-6 w-6" />
              </div>
              <span className="bg-gradient-to-r from-primary-foreground to-secondary-foreground bg-clip-text text-transparent">
                FindMyEstate
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-6">
              Your premier destination for luxury real estate. Connecting dreams with reality since 2024.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-all hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-all hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-all hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-all hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-secondary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/properties" className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 inline-block transition-all">
                  → Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 inline-block transition-all">
                  → About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 inline-block transition-all">
                  → Contact
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 inline-block transition-all">
                  → Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-secondary">For Sellers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/add-property" className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 inline-block transition-all">
                  → List Your Property
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 inline-block transition-all">
                  → Dashboard
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 inline-block transition-all">
                  → My Listings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-secondary">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group">
                <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                </div>
                <span>123 Luxury Estate Ave<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group">
                <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                </div>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group">
                <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                </div>
                <span>info@findmyestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              &copy; {new Date().getFullYear()} FindMyEstate. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/70">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-primary-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
