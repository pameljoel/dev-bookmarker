import React from "react";

type Props = {
  onClick: () => void,
  chunkId: number,
  handleOnKeyDown: (e: any) => void
};

const AddButton: React.FC<Props> = ({ onClick, chunkId, handleOnKeyDown }) => {
  return <button
    type="button"
    className="add-value"
    onClick={onClick}
    onKeyDown={e => handleOnKeyDown({ key: e.keyCode, chunkId: chunkId })}
  >
    Add value
  </button>;
}

export default AddButton;
