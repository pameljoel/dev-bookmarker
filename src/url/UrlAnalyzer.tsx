import UrlComponent from "./UrlComponent";
import React from "react";
import Header from "./partials/Header";
import UrlPreview from "./urlPreview/UrlPreview";

type Props = {
  chunks: any,
  savedUrls: any,
  addAdditionalValue: () => void,
  removeAdditionalValue: RemoveAdditionalValue;
  updateAdditionalValue: () => void,
  saveUrls: () => void,
}

const UrlAnalyzer: React.FC<Props> = ({
  chunks,
  savedUrls,
  addAdditionalValue,
  removeAdditionalValue,
  updateAdditionalValue,
  saveUrls
}) => {
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
    <div className="container">
      <div className="preview-urls">
        {savedUrls && savedUrls.map((url: any, i: number) => <UrlPreview url={url} key={`${url}-${i}`} />)}
      </div>
    </div>
  </div>
}

export default UrlAnalyzer;
