import UrlComponent from "./UrlComponent";
import React from "react";
import { Header}  from "./partials/Header";
import { UrlPreview } from "./partials/UrlPreview";

type Props = {
  parts: any,
  savedUrls: any,
  addAdditionalValueCallback: () => void,
  removeAdditionalValueCallback: () => void,
  updateAdditionalValueCallback: () => void,
  saveUrlsCallback: () => void,
}

export const UrlAnalyzer: React.FC<Props> = ({
  parts,
  savedUrls,
  addAdditionalValueCallback,
  removeAdditionalValueCallback,
  updateAdditionalValueCallback,
  saveUrlsCallback
}) => {

return <div className="main-url">
  <div className="container">
    <Header />
    <UrlComponent
      addAdditionalValueCallback={addAdditionalValueCallback}
      removeAdditionalValueCallback={removeAdditionalValueCallback}
      updateAdditionalValueCallback={updateAdditionalValueCallback}
      saveUrlsCallback={saveUrlsCallback}
      parts={parts}
    />
  </div>
  <div className="container">
    <div className="preview-urls">
      {savedUrls.map((url: any, i: number) => <UrlPreview url={url} key={`${url}-index`} />)}
    </div>
  </div>
</div>
}
