import React from "react";

const RemoveButton = ({ onClick, onKeyDown }: { onClick: () => void, onKeyDown: (e: any) => void })  =>{
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
