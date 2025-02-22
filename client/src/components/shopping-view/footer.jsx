import React from 'react';
import { Link } from 'react-router-dom';
import Shopvibe from '../../assets/shopvibe_footer.png'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  MapPin,
  Phone,
  HousePlug,
  CreditCard,
  Truck,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { Separator } from '../ui/separator';

const ShopFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-12">
      {/* Features Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-lg shadow-sm">
            <Truck className="w-10 h-10 text-primary text-white " />
            <div>
              <h3 className="font-bold text-white">Free Shipping</h3>
              <p className="text-sm text-gray-400">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-lg shadow-sm">
            <ShieldCheck className="w-10 h-10 text-primary  text-white " />
            <div>
              <h3 className="font-bold text-white">Secure Payment</h3>
              <p className="text-sm text-gray-400">100% secure payments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-lg shadow-sm">
            <HeartHandshake className="w-10 h-10 text-primary  text-white " />
            <div>
              <h3 className="font-bold text-white">24/7 Support</h3>
              <p className="text-sm text-gray-400">Dedicated support</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-lg shadow-sm">
            <CreditCard className="w-10 h-10 text-primary  text-white " />
            <div>
              <h3 className="font-bold text-white">Easy Returns</h3>
              <p className="text-sm text-gray-400">30 day returns policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* <HousePlug className="h-6 w-6 text-white" />
               */}
               <img src={Shopvibe} className='mt-[-6rem]' alt="shop-vibe logo" />
              {/* <span className="font-bold text-xl text-white">Shop Vibe</span> */}
            </div>
            <p className="text-gray-400">
              Your one-stop destination for trendy and quality products. Shop with confidence and style.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Products", "About Us", "Contact", "FAQ"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              {["Electronics", "Fashion", "Home & Living", "Beauty", "Sports"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              {[{icon: MapPin, text: "123 Shopping Street, NY 10001, USA"},
                {icon: Phone, text: "+1 234 567 8900"},
                {icon: Mail, text: "support@shopvibe.com"}].map(({icon: Icon, text}, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-400">
                  <Icon className="w-5 h-5 text-primary" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} Shop Vibe. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookies Settings"].map((item, index) => (
                <Link key={index} to="#" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
