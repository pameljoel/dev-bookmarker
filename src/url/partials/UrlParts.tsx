import UrlPart from "./UrlPart";
import React from "react";

type Props = {
  parts: any,
  addAdditionalValue: () => void, removeAdditionalValue: () => void, updateAdditionalValue: () => void
}

type Part = {
  isAdditionalValue: any;
  additionalValues: any;
  values: any;
  partType: string;
  cssClass: string;
  name: string;
  partId: string,
}

const UrlParts: React.FC<Props> = ({ parts, addAdditionalValue, removeAdditionalValue, updateAdditionalValue }) => {
  return <div className="url">
    {parts.map((part: Part) => {
       return <UrlPart
          key={part.partId}
          partName={part.name}
          cssClass={part.cssClass}
          values={part.values}
          partType={part.partType}
          partId={part.partId}
          additionalValues={part.additionalValues}
          isAdditionalValue={part.isAdditionalValue}
          addAdditionalValue={addAdditionalValue}
          removeAdditionalValue={removeAdditionalValue}
          updateAdditionalValue={updateAdditionalValue}
        />
    }
    )}
  </div>
}

export default UrlParts;
