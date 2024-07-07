
import React, { useState } from 'react';
import { Button } from './ui/button';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { IoReload } from 'react-icons/io5';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SmartDocSide = ({ previews, selectedImageIndex, setSelectedImageIndex, open, setOpen }) => {

  return (
    <div
      className={`absolute border-r-2 border-gray-300 shadow-lg bg-gray-200  py-2  h-full w-[220px] max-w-[220px] ${
        !open ? "-translate-x-48" : ""
      } `}
    >
      <div className="flex item justify-between gap-2">
        <Button
          veriant={"outline"}
          onClick={() => setSelectedImageIndex(null)}
          className="btn btn-primary mb-2 ml-2 bg-gray-900"
        >
          {" "}
          Reset <IoReload size={20} className="ml-2" />
        </Button>
        <Button
          className={`-mr-5 bg-gray-900 p-1 transition-all $ ${
            open ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setOpen((val) => !val)}
        >
          {" "}
          <ChevronRight />{" "}
        </Button>
      </div>
      <div className="s overflow-y-scroll h-full pt-2">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="c cursor-pointer mx-1.5 mb-2 "
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={preview}
              alt={`Document ${index + 1}`}
              className={` object-contain  rounded-xl h-[160px] w-full border-[3px] bg-gray-300 ${
                selectedImageIndex === index ? "border border-[#FFFECA]" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartDocSide;

