import React from "react";

type Props = {
  onClick: () => void,
  onKeyDown: (e: any) => void
};

const AddButton: React.FC<Props> = ({ onClick, onKeyDown }) => {
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
