import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    
    // If no error after login, redirect to dashboard
    if (!error) {
      navigate('/');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="character-sheet">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-primary-600 mb-2">Welcome Back</h2>
              <p className="text-neutral-600">
                Sign in to access your Daggerheart characters
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                id="email"
                name="email"
                label="Email Address"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                icon={<Mail className="h-5 w-5 text-neutral-400" />}
              />
              
              <Input
                type="password"
                id="password"
                name="password"
                label="Password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={<Lock className="h-5 w-5 text-neutral-400" />}
              />
              
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;