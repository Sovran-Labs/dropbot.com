"use strict"
// components/CardContent.client.tsx

interface CardContentProps {
    children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default CardContent;
