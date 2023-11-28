import React from 'react';
import '../App.css';

function Button({ handleData, value, type, className, selected, dropdownValues }) {
  // Clear Button
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

  // Drop Down button
  if (value === "drop-down") {
    return (
      <select style={{ height: "50px" }} value={selected} onChange={(e) => handleData(e.currentTarget.value)}>
        <option value="">-- Select --</option>
        {dropdownValues.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
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
