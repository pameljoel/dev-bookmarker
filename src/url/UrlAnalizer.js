import UrlComponent from "./UrlComponent";
import React from "react";
import {Header} from "./partials/Header";
import {UrlPreview} from "./partials/UrlPreview";

export const UrlAnalizer = ({
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
      {savedUrls.map((url, i) => <UrlPreview url={url} />)}
    </div>
  </div>
</div>
}
