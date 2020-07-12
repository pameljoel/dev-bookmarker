import UrlComponent from "./UrlComponent";
import React from "react";
import Header from "./partials/Header";
import { UrlPreview } from "./partials/UrlPreview";

type Props = {
  parts: any,
  savedUrls: any,
  addAdditionalValue: () => void,
  removeAdditionalValue: () => void,
  updateAdditionalValue: () => void,
  saveUrls: () => void,
}

const UrlAnalyzer: React.FC<Props> = ({
  parts,
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
      parts={parts}
      addAdditionalValue={addAdditionalValue}
      removeAdditionalValue={removeAdditionalValue}
      updateAdditionalValue={updateAdditionalValue}
      saveUrls={saveUrls}
    />
  </div>
  <div className="container">
    <div className="preview-urls">
      {savedUrls && savedUrls.map((url: any, i: number) => <UrlPreview url={url} key={`${url}-index`} />)}
    </div>
  </div>
</div>
}

export default UrlAnalyzer;
