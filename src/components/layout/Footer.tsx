import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-neutral-300 mt-auto">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-display text-secondary-500 mb-4">Daggerheart Character Manager</h3>
            <p className="text-sm mb-4">
              A custom web application for managing your Daggerheart RPG characters, inventory, and dice rolls.
            </p>
            <div className="flex items-center text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-accent-500" />
              <span>for Daggerheart fans</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display text-secondary-500 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-secondary-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/characters" className="hover:text-secondary-300 transition-colors">
                  Characters
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-secondary-300 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-secondary-300 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-display text-secondary-500 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://daggerheart.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary-300 transition-colors"
                >
                  Official Daggerheart Site
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-secondary-300 transition-colors"
                >
                  <Github className="h-4 w-4 mr-1" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-8 pt-4 text-center text-xs">
          <p>&copy; {currentYear} Daggerheart Character Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;