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
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header} className="px-4 py-2 border">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-2 border">{renderCellContent(cell)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
