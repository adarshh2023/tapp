import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { verifyOtp } from '../services/api';

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) {
      toast.error('Phone number not found');
      return;
    }
    try {
      const response = await verifyOtp(mobile, otp);
      localStorage.setItem('token', response.token);
      navigate('/projects');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="p-6 w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Verify OTP</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter 6-digit OTP"
            pattern="[0-9]{6}"
            maxLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Verify OTP
        </button>

        <button
          type="button"
          onClick={() => navigate('/phone-login')}
          className="w-full text-blue-600 hover:text-blue-700"
        >
          Back to Phone Login
        </button>
      </form>
    </div>
  );
}