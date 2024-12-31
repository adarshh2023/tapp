import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginWithEmail } from '../services/api';
import { Logo } from './ui/Logo';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginWithEmail(email, password);
      localStorage.setItem('token', response.token);
      navigate('/projects');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-sm mx-auto space-y-8 pt-12">
        <Logo />
        
        <div className="space-y-2">
          <h1 className="text-white text-5xl font-bold">Welcome</h1>
          <p className="text-white text-4xl font-light">user message</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            forgotPassword
            required
          />

          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <div className="pt-4 space-y-4">
            <Button type="submit">
              Continue with email
            </Button>

            <Button 
              type="button"
              variant="secondary"
              onClick={() => navigate('/phone-login')}
            >
              <div className="flex items-center justify-center space-x-2">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span>Login with Google</span>
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}