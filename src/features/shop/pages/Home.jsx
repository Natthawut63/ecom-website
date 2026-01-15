import React from "react";
import ContentCarousel from "../../home/components/ContentCarousel";
import BestSeller from "../../home/components/BastSeller";
import NewProduct from "../../home/components/NewProduct";
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative">
        <ContentCarousel />
      </section>

      {/* Features Bar */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Free Shipping</p>
                <p className="text-sm text-gray-500">On orders over ฿1,000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Secure Payment</p>
                <p className="text-sm text-gray-500">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">24/7 Support</p>
                <p className="text-sm text-gray-500">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Popular Products
              </h2>
              <p className="text-gray-500 mt-1">Best sellers from our store</p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <BestSeller />
          <Link
            to="/shop"
            className="sm:hidden flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-6 transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 md:p-12">
            <div className="relative z-10">
              <span className="inline-block bg-accent-400 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Limited Time Offer
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Get 20% Off Your First Order
              </h3>
              <p className="text-primary-100 mb-6 max-w-md">
                Sign up today and receive exclusive discounts on all products.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                New Arrivals
              </h2>
              <p className="text-gray-500 mt-1">Check out our latest products</p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <NewProduct />
          <Link
            to="/shop"
            className="sm:hidden flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-6 transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold">Store</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Your one-stop shop for quality products. We're committed to providing the best shopping experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
            <p>© 2026 Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
