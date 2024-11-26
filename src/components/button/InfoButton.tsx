import React, { useState } from 'react';
import budgetImage from '../../assets/images/budget_divide.jpg';
import Button from "./Button.tsx";


const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLElement;
    target.style.transform = 'scale(1.1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLElement;
    target.style.transform = 'scale(1)';
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative', paddingLeft: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px', 
          borderRadius: '50%',
          background: '#007BFF',
          color: '#fff',
          textAlign: 'center',
          lineHeight: '20px', 
          fontSize: '10px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background-color 0.3s ease', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
          top: '-20px'
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        i
      </span>

      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',  
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px', 
            width: '400px',
            color: '#333',
            fontSize: '14px',
          }}
        >
          <img src={budgetImage} alt="How to divide budget" style={{ width: '100%' }}>
          </img>

          <div className="btn">
            <Button
                text="Close"
                onClick={handleClick}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
