"use strict"
// components/TableCell.client.tsx

interface TableCellProps {
    className?: string;
    children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ className, children }) => {
    return <td className={`text-black px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>;
};

export default TableCell;
