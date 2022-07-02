import UrlComponent from "./UrlComponent";
import React from "react";
import Header from "./partials/Header";
import {canUseDOM, saveDoc} from "../utils";
import {
  AddAdditionaValue,
  Chunks,
  RemoveAdditionalValue,
  SavedUrlWithParts,
  SaveUrls,
  UpdateAdditionalValue
} from "../type";
import PreviewUrls from "./PreviewUrls/PreviewUrls";

type Props = {
  chunks: Chunks,
  savedUrls: SavedUrlWithParts,
  addAdditionalValue: AddAdditionaValue,
  removeAdditionalValue: RemoveAdditionalValue;
  updateAdditionalValue: UpdateAdditionalValue,
  saveUrls: SaveUrls,
  originalUrl: string,
}

const UrlAnalyzer: React.FC<Props> = ({
  chunks,
  savedUrls,
  addAdditionalValue,
  removeAdditionalValue,
  updateAdditionalValue,
  saveUrls,
    originalUrl,
}) => {
  const hasSavedUrls = savedUrls && savedUrls.length > 0;

  const handleOnClick = () => {
    saveDoc({
      'original-url': originalUrl,
      chunks
    }).then(response => {
      console.log('saving doc', { response })
    });
  };

  return <div className="main-url">
    <div className="container">
      <Header />
      <UrlComponent
        chunks={chunks}
        addAdditionalValue={addAdditionalValue}
        removeAdditionalValue={removeAdditionalValue}
        updateAdditionalValue={updateAdditionalValue}
        saveUrls={saveUrls}
      />
    </div>
    {hasSavedUrls && <PreviewUrls { ...{savedUrls, handleOnClick } }/>}
  </div>
}

export default UrlAnalyzer;
