import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Lock, User } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear errors on change
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;
    
    // Username validation
    if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
      isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Password validation
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await register(formData.username, formData.email, formData.password);
    
    // If no error after registration, redirect to dashboard
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
              <h2 className="text-3xl font-display font-bold text-primary-600 mb-2">Create Account</h2>
              <p className="text-neutral-600">
                Join the Daggerheart community and start your adventure
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                id="username"
                name="username"
                label="Username"
                placeholder="Your username"
                value={formData.username}
                onChange={handleChange}
                error={formErrors.username}
                required
                icon={<User className="h-5 w-5 text-neutral-400" />}
              />
              
              <Input
                type="email"
                id="email"
                name="email"
                label="Email Address"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
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
                error={formErrors.password}
                required
                icon={<Lock className="h-5 w-5 text-neutral-400" />}
              />
              
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
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
                  Create Account
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;