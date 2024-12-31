import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  const baseStyles = "w-full py-4 rounded-full font-medium text-lg transition-colors";
  const variants = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-500",
    secondary: "bg-white text-black hover:bg-gray-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};