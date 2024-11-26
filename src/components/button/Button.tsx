import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: string; 
  disabled?: boolean; 
}

const Button: React.FC<ButtonProps> = ({ text, onClick, color = '#04aa6d', disabled = false }) => {
  return (
    <StyledButton 
      onClick={onClick} 
      color={color} 
      disabled={disabled} 
    >
      {text}
    </StyledButton>
  );
};

// Define the button styles using styled-components
const StyledButton = styled.button<{ color: string; disabled: boolean }>`
  display: inline-block;
  padding: 1px 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  text-align: center;
  justify-content: flex-end;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: ${(props) => props.disabled ? '#ccc' : props.color};  // Change color when disabled
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px #999;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => props.disabled ? '#ccc' : darkenColor(props.color)};
  }

  &:active {
    background-color: ${(props) => props.disabled ? '#ccc' : darkenColor(props.color)};
    box-shadow: ${(props) => props.disabled ? 'none' : '0 5px #666'};
    transform: ${(props) => props.disabled ? 'none' : 'translateY(4px)'};  // Disable active transform when disabled
  }
`;

// Function to darken the color, to make hover effect more visible
const darkenColor = (color: string) => {
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgb = hexToRgb(color);
  return `rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)})`;
};

export default Button;
