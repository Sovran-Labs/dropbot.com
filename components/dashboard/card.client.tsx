"use client";
// components/Card.client.tsx

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-md p-4">
            {children}
        </div>
    );
};

export default Card;
