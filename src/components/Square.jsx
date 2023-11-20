/* eslint-disable react/prop-types */

export const Square = ({ isSelected, updateBoard, index, children }) => {
    const className = `square ${isSelected ? "is-selected" : ""}`;
  
    const handleClick = () => {
      updateBoard(index);
    };
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  };