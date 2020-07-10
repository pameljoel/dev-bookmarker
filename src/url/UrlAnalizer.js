import UrlComponent from "./UrlComponent";
import React from "react";
import {Header} from "./Header";

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
    <div className="saved-urls">
      {savedUrls.map((savedUrl, i) => (
        <div className="saved-url" key={`${savedUrl}-${i}`}>
          {savedUrl}
        </div>
      ))}
    </div>
  </div>
</div>
}
