"use strict"
// components/TableBody.client.tsx

interface TableBodyProps {
    children: React.ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
    return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
};

export default TableBody;