import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendOtp } from '../services/api';

export default function PhoneLogin() {
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendOtp(mobile);
      navigate('/verify-otp', { state: { mobile } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="p-6 w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Phone Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="pl-10 w-full p-2 border rounded-lg"
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Send OTP
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full text-blue-600 hover:text-blue-700"
        >
          Back to Email Login
        </button>
      </form>
    </div>
  );
}