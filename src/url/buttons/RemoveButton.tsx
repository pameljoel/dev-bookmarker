import React from "react";

type Props = {
  onClick: () => void,
  handleOnKeyDown: (e: any) => void
  chunkId: number;
  valueId: number;
};

const RemoveButton: React.FC<Props> = ({ onClick, handleOnKeyDown, chunkId, valueId }) => {
  return <button
    type="button"
    className="remove-value"
    onClick={onClick}
    onKeyDown={e => handleOnKeyDown({
      key: e.keyCode,
      chunkId: chunkId,
      valueId: valueId
    })}
  >
    Delete
  </button>;
};

export default RemoveButton;
