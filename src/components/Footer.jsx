import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  BookmarkCheck,
  Info,
  Mail,
  Instagram,
  Twitter,
  Github,
  ArrowRight,
  Film,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log("Subscribed with:", email);
      setSubscribed(true);
      setEmail("");

      // Reset the subscribed state after showing the success message
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-[#1c1c1c] text-gray-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Film size={24} className="text-[#e50914]" />
              <span className="text-xl font-bold text-white">Watchly</span>
            </div>
            <p className="text-sm">
              Discover, collect and share your favorite movies and TV shows all
              in one place.
            </p>
            <div className="mt-4 flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#fff" }}
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#fff" }}
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#fff" }}
                className="text-gray-400 hover:text-white"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="/"
                  className="flex items-center text-gray-400 hover:text-[#e50914] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Home size={16} className="mr-2" />
                  Home
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/watchlist"
                  className="flex items-center text-gray-400 hover:text-[#e50914] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <BookmarkCheck size={16} className="mr-2" />
                  Watchlist
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/about"
                  className="flex items-center text-gray-400 hover:text-[#e50914] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Info size={16} className="mr-2" />
                  About Us
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/contact"
                  className="flex items-center text-gray-400 hover:text-[#e50914] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Mail size={16} className="mr-2" />
                  Contact
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="/movies"
                  className="text-gray-400 hover:text-[#e50914] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Movies
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/tv-shows"
                  className="text-gray-400 hover:text-[#e50914] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  TV Shows
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/new-releases"
                  className="text-gray-400 hover:text-[#e50914] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  New Releases
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/top-rated"
                  className="text-gray-400 hover:text-[#e50914] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Top Rated
                </motion.a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-xs text-gray-500 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Watchly. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
