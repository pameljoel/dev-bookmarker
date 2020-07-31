import React from "react";

type Props = {
  onClick: () => void,
  onKeyDown: (e: any) => void
};

  const RemoveButton: React.FC<Props>= ({ onClick, onKeyDown })  =>{
  return <button
    type="button"
    className="remove-value"
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    Delete
  </button>;
}

export default RemoveButton;
