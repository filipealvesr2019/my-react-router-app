// ColorSquare.js
import React from 'react';

const ColorSquare = ({ color }) => {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: color,
        border: '1px solid #000',
        marginRight: '0.5rem',
      }}
    ></div>
  );
};

export default ColorSquare;
