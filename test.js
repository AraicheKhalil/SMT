<Pagination>
        <PaginationContent className="">
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {pageNumbers.map((number) => (
            <PaginationItem
              key={number}
              // className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleChangePage(number)}
            >
              <PaginationLink  >
                {number}
              </PaginationLink>
              
            </PaginationItem>
          ))}
           <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>


























import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

// Expanded sample data
const sampleData = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 34 },
  { id: 3, name: 'Sam Brown', age: 23 },
  { id: 4, name: 'Lisa White', age: 45 },
  { id: 5, name: 'Tom Clark', age: 32 },
  { id: 6, name: 'Sara Hall', age: 29 },
  { id: 7, name: 'Paul Adams', age: 41 },
  { id: 8, name: 'Mary Johnson', age: 27 },
  { id: 9, name: 'James Lee', age: 36 },
  { id: 10, name: 'Linda Taylor', age: 38 },
  { id: 11, name: 'Gary Wilson', age: 30 },
  { id: 12, name: 'Emma Brown', age: 22 },
  { id: 13, name: 'Daniel Harris', age: 40 },
  { id: 14, name: 'Sophie Turner', age: 24 },
  { id: 15, name: 'Ethan Johnson', age: 35 },
  { id: 16, name: 'Olivia Martin', age: 33 },
  { id: 17, name: 'Lucas Lee', age: 29 },
  { id: 18, name: 'Mia Lewis', age: 26 },
  { id: 19, name: 'Noah Walker', age: 31 },
  { id: 20, name: 'Chloe Hall', age: 28 },
  { id: 21, name: 'Liam Young', age: 37 },
  { id: 22, name: 'Isabella King', age: 25 },
  { id: 23, name: 'Mason Wright', age: 42 },
  { id: 24, name: 'Emily Scott', age: 27 },
  { id: 25, name: 'Jacob Green', age: 39 },
  { id: 26, name: 'Charlotte Baker', age: 30 },
  { id: 27, name: 'Benjamin Hall', age: 34 },
  { id: 28, name: 'Amelia Lopez', age: 32 },
  { id: 29, name: 'William Hill', age: 33 },
  { id: 30, name: 'Sophia Carter', age: 28 },
];

const TasksTable = () => {
  const [data, setData] = useState(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    // Load data from an API or other source if needed
    // setData(loadedData);
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableRows = () => {
    return currentItems.map((item) => (
      <tr key={item.id} className="border-t">
        <td className="p-2">{item.id}</td>
        <td className="p-2">{item.name}</td>
        <td className="p-2">{item.age}</td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const renderPageNumbers = () => {
    let pageNumbers = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers = [1, 2, 3, 4, '...'];
      } else if (currentPage >= totalPages - 2) {
        pageNumbers = ['...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pageNumbers = ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
      }
    }

    return pageNumbers.map((number, index) => (
      <button
        key={index}
        className={`px-4 py-2 mx-1 ${
          currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
        } ${number === '...' ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={() => number !== '...' && handleChangePage(number)}
        disabled={number === '...'}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full border-b">
            <th className="p-2">ID</th>
            <th className="p-2 flex items-center">
              Name
              <button onClick={() => handleSort('name')} className="ml-2">
                {sortConfig.key === 'name' && sortConfig.direction === 'ascending' ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>
            </th>
            <th className="p-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <button
          className="px-4 py-2 mx-1 bg-gray-200"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className="px-4 py-2 mx-1 bg-gray-200"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TasksTable;
