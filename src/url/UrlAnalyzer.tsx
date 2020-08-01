import UrlComponent from "./UrlComponent";
import React from "react";
import Header from "./partials/Header";
import GeneratedUrl from "./generatedUrls/GeneratedUrl";

type Props = {
  chunks: any,
  savedUrls: any,
  addAdditionalValue: () => void,
  removeAdditionalValue: RemoveAdditionalValue;
  updateAdditionalValue: () => void,
  saveUrls: () => void,
}

const normalizedUrl = (url: string[]): string => url.join('');

const openAllLinks = (e: any, listOfUrls: any) => {
  e.preventDefault();
  listOfUrls.map((url: string[]) => window.open(normalizedUrl(url)));
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
      <h4>Generated urls:</h4>
      <div className="preview-urls">
        {savedUrls && savedUrls.map((url: any, i: number) => <GeneratedUrl url={url} key={`${url}-${i}`} />)}
        <button className="add-value" onClick={(e) => openAllLinks(e, savedUrls)}>open all links</button>
      </div>
    </div>
  </div>
}

export default UrlAnalyzer;
