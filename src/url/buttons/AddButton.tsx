import React from "react";

const AddButton = ({ onClick, onKeyDown }: { onClick: () => void, onKeyDown: (e: any) => void }) => {
  return <button
    type="button"
    className="add-value"
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    Add value
  </button>;
}

export default AddButton;
