"use client";
// components/CardHeader.client.tsx

interface CardHeaderProps {
    className?: string;
    children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
    return <div className={`flex flex-row items-center justify-between pb-2 space-y-0 ${className}`}>{children}</div>;
};

export default CardHeader;
