import React from "react";

const Button = ({ text, onClick, customClasses }) => {
  return (
    <button
      onClick={onClick}
      className={`mt-2 hover:bg-primary hover:text-white text-balck satoshi-500 py-2 px-8 bg-[--black] text-[--golden] rounded-md transition-all border bg-gray-400 ease-in-out duration-500  hover:text-[--black] ${customClasses}`}
    >
      {text}
    </button>
  );
};

export default Button;
