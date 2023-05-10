import React from 'react';
import '../App.css';

function Button({ handleData, value, type, className, selected }) {
  if (value === "") {
    return (
      <input
        onClick={() => handleData("")}
        value="Clear"
        type={type ? type : "button"}
        className={className}
        
      />
    );
  }

  return (
    <input
      onClick={(e) => handleData(e.currentTarget.value)}
      value={value}
      type={type ? type : "button"}
      className={`${className} ${selected ? "selected-btn" : ""}`}

    />
  );
}

export default Button;
