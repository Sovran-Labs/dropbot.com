// components/Button.js
// components/Button.tsx
"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void; // Define the type for the onClick function
  className?: string;
  size?: string;
  variant: string;
  bgColor?: string;
}

// components/Button.tsx

const Button: React.FC<ButtonProps> = ({ onClick, children, bgColor }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: bgColor ? bgColor : "",
      }}
      className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {children}
    </button>
  );
};

export default Button;
