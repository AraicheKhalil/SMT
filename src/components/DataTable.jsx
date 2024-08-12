import React from 'react';

const renderCellContent = (cell) => {
    if (typeof cell === 'object' && cell !== null) {
        return JSON.stringify(cell);
    }
    return cell;
};

const DataTable = ({ headers, rows }) => {
    return (
        <div className="overflow-auto max-h-[500px]">
            <table className="min-w-full  border border-black">
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header} className="px-4 py-2 border border-black">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="border border-black">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-2 border border-black">{renderCellContent(cell)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
