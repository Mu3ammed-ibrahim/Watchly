import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Film, Search } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const menuVariants = {
    hidden: {
      x: '-100%',
      transition: { type: 'tween', duration: 0.3 }
    },
    visible: {
      x: 0,
      transition: { type: 'tween', duration: 0.3 }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#141414] text-white z-50 font-sans shadow-md">
      <div className="flex items-center justify-between p-4">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden z-50"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center space-x-2">
            <Film size={24} className="text-[#e50914]" />
            <h2 className="text-xl font-bold text-white">Watchly</h2>
          </div>
        </div>

        {/* Desktop Navigation and Search */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <ul className="hidden md:flex items-center space-x-6 font-sans">
            <li><a href="/" className="hover:text-[#e50914] transition-colors">Home</a></li>
            <li><a href="/watchlist" className="hover:text-[#e50914] transition-colors">Watchlist</a></li>
            <li><a href="/about" className="hover:text-[#e50914] transition-colors">About</a></li>
          </ul>

          {/* Search Icon */}
          <div className="relative">
            <button onClick={toggleSearch} aria-label="Search">
              <Search size={22} className="hover:text-[#e50914] transition-colors duration-200" />
            </button>

            {/* Search input visible only on md+ screens */}
            {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="hidden md:block absolute top-8 right-0 bg-[#000000] text-white border border-gray-700 rounded px-3 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-[#e50914] transition-all duration-200"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed top-0 left-0 w-64 h-full bg-[#1c1c1c] md:hidden z-40 pt-16"
          >
            <ul className="flex flex-col space-y-4 p-4">
              <li className="hover:bg-[#2a2a2a] p-2 rounded">
                <a href="/" className="block w-full">Home</a>
              </li>
              <li className="hover:bg-[#2a2a2a] p-2 rounded">
                <a href="/watchlist" className="block w-full">Watchlist</a>
              </li>
              <li className="hover:bg-[#2a2a2a] p-2 rounded">
                <a href="/about" className="block w-full">About</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={toggleMenu}
          className="fixed inset-0 bg-black md:hidden z-30"
        />
      )}
    </nav>
  );
};

export default Navbar;
