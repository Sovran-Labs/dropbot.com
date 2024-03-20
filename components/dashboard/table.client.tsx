"use client";
// components/Table.client.tsx

interface TableProps {
    children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
    return <table className="min-w-full">{children}</table>;
};

export default Table;
