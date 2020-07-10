import UrlPart from "./UrlPart";
import React from "react";

type Props = {
  parts: any,
  addAdditionalValueCallback: () => void, removeAdditionalValueCallback: () => void, updateAdditionalValueCallback: () => void
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

export const UrlParts: React.FC<Props> = ({ parts, addAdditionalValueCallback, removeAdditionalValueCallback, updateAdditionalValueCallback }) => {
  return <div className="url">
    {parts.map((part: Part) => {
      console.log('aaaaa part', {part})
       return <UrlPart
          key={part.partId}
          partName={part.name}
          cssClass={part.cssClass}
          values={part.values}
          partType={part.partType}
          partId={part.partId}
          additionalValues={part.additionalValues}
          isAdditionalValue={part.isAdditionalValue}
          addAdditionalValueCallback={addAdditionalValueCallback}
          removeAdditionalValueCallback={removeAdditionalValueCallback}
          updateAdditionalValueCallback={updateAdditionalValueCallback}
        />
    }

    )}
  </div>
}
