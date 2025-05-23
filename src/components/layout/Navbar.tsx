import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import { Menu, X, Shield, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Characters', path: '/characters' },
  ];

  if (isAuthenticated && user?.role === 'admin') {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <nav className="bg-primary-500 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="text-secondary-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white">Daggerheart</h1>
              <p className="text-xs text-secondary-300 -mt-1">Character Manager</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium hover:text-secondary-300 transition-colors ${
                    isActive(link.path) ? 'text-secondary-500' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center text-sm hover:text-secondary-300"
                  >
                    <User className="h-4 w-4 mr-1" />
                    {user?.username}
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:bg-white/10"
                    onClick={logout}
                    icon={<LogOut className="h-4 w-4" />}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="secondary"
                      size="sm"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-secondary-300 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-primary-600"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 font-medium hover:text-secondary-300 ${
                    isActive(link.path) ? 'text-secondary-500' : ''
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center py-2 hover:text-secondary-300"
                    onClick={closeMenu}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile ({user?.username})
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center py-2 hover:text-secondary-300"
                      onClick={closeMenu}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={() => { logout(); closeMenu(); }}
                    className="flex items-center py-2 text-white hover:text-secondary-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={closeMenu}>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white/10"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <Button variant="secondary" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;