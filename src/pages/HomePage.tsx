import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Layout from '../components/layout/Layout';
import { useAuthStore } from '../store/authStore';
import { Shield, Users, BookOpen, Dice } from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: <Shield className="h-12 w-12 text-primary-500" />,
      title: 'Character Management',
      description: 'Create and manage your Daggerheart characters with ease, tracking all their stats and abilities.',
    },
    {
      icon: <Dice className="h-12 w-12 text-accent-500" />,
      title: 'Interactive Dice Rolling',
      description: 'Roll dice directly on your character sheet with our intuitive dice rolling system.',
    },
    {
      icon: <BookOpen className="h-12 w-12 text-secondary-500" />,
      title: 'Inventory Tracking',
      description: 'Keep track of all your equipment, items, and treasures with our comprehensive inventory system.',
    },
    {
      icon: <Users className="h-12 w-12 text-green-500" />,
      title: 'User Management',
      description: 'Create an account, save your characters, and access them from anywhere.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                Manage Your <span className="text-secondary-500">Daggerheart</span> Adventures
              </h1>
              <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-lg">
                Create, customize, and manage your Daggerheart characters with our intuitive character management system.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Link to="/characters">
                    <Button variant="secondary" size="lg">
                      View Your Characters
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button variant="secondary" size="lg">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/7511692/pexels-photo-7511692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Daggerheart Character" 
                className="rounded-lg shadow-2xl max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Powerful Features</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our Daggerheart Character Manager provides everything you need to create and manage your characters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2 text-primary-600">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of Daggerheart players and start managing your characters today.
          </p>
          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <Link to="/characters/new">
                <Button variant="secondary" size="lg">
                  Create a Character
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button variant="secondary" size="lg">
                  Create Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials or Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Character Sheet Preview</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Get a glimpse of our intuitive character management interface.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <img 
              src="https://images.pexels.com/photos/7511701/pexels-photo-7511701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Character Sheet Preview" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;