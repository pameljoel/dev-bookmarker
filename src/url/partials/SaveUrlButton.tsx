import React from "react";

type Props = {
  onClick: () => void;
}

const SaveUrlButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="container">
      <button
        type="button"
        className="big-button"
        onClick={onClick}
      >
        save this url
      </button>
    </div>
  );
}

export default SaveUrlButton;
