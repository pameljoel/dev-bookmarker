import UrlComponent from "./UrlComponent";
import React from "react";
import Header from "./partials/Header";
import GeneratedUrl from "./generatedUrls/GeneratedUrl";
import {canUseDOM, saveDoc} from "../utils";
import {Chunks, RemoveAdditionalValue, SavedUrls} from "../type";

type Props = {
  chunks: Chunks,
  savedUrls: SavedUrls,
  addAdditionalValue: () => void,
  removeAdditionalValue: RemoveAdditionalValue;
  updateAdditionalValue: () => void,
  saveUrls: () => void,
  originalUrl: string,
}

const normalizedUrl = (url: string[]): string => url.join('');

const openAllLinks = (e: any, listOfUrls: any) => {
  e.preventDefault();
  if (canUseDOM) listOfUrls.map((url: string[]) => window.open(normalizedUrl(url)));
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
    {hasSavedUrls && <div className="container">
      <h4>Generated urls:</h4>
      <div className="preview-urls">
        {savedUrls && savedUrls.map((url: any, i: number) => <GeneratedUrl url={url} key={`${url}-${i}`} />)}
        <button className="add-value" onClick={(e) => openAllLinks(e, savedUrls)}>open all links</button>
      </div>
      <button
          type="button"
          className="big-button"
          onClick={handleOnClick}
      >
        save
      </button>
    </div>}
  </div>
}

export default UrlAnalyzer;
