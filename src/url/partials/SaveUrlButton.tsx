import React from "react";

type Props = {
  onClick: () => void;
}

const SaveUrlButton: React.FC<Props> = ({ onClick }) => {
  return (
      <button
        type="button"
        className="big-button"
        onClick={onClick}
      >
        generate urls
      </button>
  );
}

export default SaveUrlButton;
