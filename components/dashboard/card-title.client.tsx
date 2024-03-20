"use client";
// components/CardTitle.client.tsx

interface CardTitleProps {
    className?: string;
    children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => {
    return <h2 className={`text-sm font-medium ${className}`}>{children}</h2>;
};

export default CardTitle;
