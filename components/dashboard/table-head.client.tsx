"use strict"
// components/TableHead.client.tsx

interface TableHeadProps {
    className?: string;
    children: React.ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ className, children }) => {
    return <th className={`px-6 py-3 text-xs font-medium tracking-wider text-left uppercase ${className}`}>{children}</th>;
};

export default TableHead;
