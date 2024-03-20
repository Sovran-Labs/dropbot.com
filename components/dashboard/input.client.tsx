"use client";
// components/Input.client.tsx

interface InputProps {
    className?: string;
    placeholder?: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({ className, placeholder, type = 'text' }) => {
    return (
        <input
            className={className}
            placeholder={placeholder}
            type={type}
            // Add any other props or functionality you need
        />
    );
};

export default Input;
