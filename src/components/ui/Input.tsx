import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  forgotPassword?: boolean;
}

export const Input = ({ label, forgotPassword, ...props }: InputProps) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <label className="text-white text-lg">{label}</label>
      {forgotPassword && (
        <a href="#" className="text-yellow-400 hover:text-yellow-500">
          Forgot Password?
        </a>
      )}
    </div>
    <input
      className="w-full bg-neutral-800 rounded-lg px-4 py-3 text-white border-2 border-transparent focus:border-yellow-400 focus:outline-none"
      {...props}
    />
  </div>
);