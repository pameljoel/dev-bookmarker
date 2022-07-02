import React from "react";
import GeneratedUrl from "../generatedUrls/GeneratedUrl";
import {canUseDOM} from "../../utils";
import {SavedUrlWithParts} from "../../type";

type Props = {
    savedUrls: SavedUrlWithParts;
    handleOnClick?: any;
}

const normalizedUrl = (url: string[]): string => url.join('');

const openAllLinks = (e: any, listOfUrls: any) => {
    e.preventDefault();
    if (canUseDOM) listOfUrls.map((url: string[]) => window.open(normalizedUrl(url)));
}

const PreviewUrls = ({savedUrls, handleOnClick}: Props) => {
    const hasSavedUrls = savedUrls && savedUrls.length > 0;

    return hasSavedUrls ? <div className="container">
        <div className="preview-urls-title">
            <h4>Generated urls:</h4>
            <button className="add-value" onClick={(e) => openAllLinks(e, savedUrls)}>open all links</button>
        </div>
        <div className="preview-urls">
            {savedUrls && savedUrls.map((url: any, i: number) => <GeneratedUrl url={url} key={`${url}-${i}`}/>)}
        </div>
        {handleOnClick && <button type="button" className="big-button" onClick={handleOnClick}>save</button>}
    </div> : null;
}

export default PreviewUrls;