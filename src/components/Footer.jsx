import { motion } from "framer-motion";
import { Home, BookmarkCheck, Info, Film } from "lucide-react";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Branding Section */}
        <motion.section variants={itemVariants} aria-labelledby="footer-brand">
          <div className="flex items-center space-x-2 mb-4">
            <Film size={24} className="text-[#e50914]" />
            <span
              id="footer-brand"
              className="text-xl font-bold text-white"
            >
              Watchly
            </span>
          </div>
          <p className="text-sm">
            Discover and keep track of your favorite movies and TV shows.
          </p>
        </motion.section>

        {/* Navigation Links */}
        <motion.nav
          variants={itemVariants}
          aria-labelledby="footer-links-heading"
        >
          <h3 id="footer-links-heading" className="text-white font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2" role="list">
            <li role="listitem">
              <motion.a
                href="/"
                className="flex items-center text-gray-400 hover:text-[#e50914] transition-colors"
                whileHover={{ x: 5 }}
              >
                <Home size={16} className="mr-2" />
                Home
              </motion.a>
            </li>
            <li role="listitem">
              <motion.a
                href="/watchlist"
                className="flex items-center text-gray-400 hover:text-[#e50914] transition-colors"
                whileHover={{ x: 5 }}
              >
                <BookmarkCheck size={16} className="mr-2" />
                Watchlist
              </motion.a>
            </li>
            <li role="listitem">
              <motion.a
                href="/about"
                className="flex items-center text-gray-400 hover:text-[#e50914] transition-colors"
                whileHover={{ x: 5 }}
              >
                <Info size={16} className="mr-2" />
                About
              </motion.a>
            </li>
          </ul>
        </motion.nav>
      </div>

      {/* Footer Bottom */}
      <motion.div
        variants={itemVariants}
        className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500"
      >
        <small>
          © {new Date().getFullYear()} <strong>Watchly</strong>. All rights reserved.
        </small>
      </motion.div>
    </motion.div>
  </footer>
);

}
