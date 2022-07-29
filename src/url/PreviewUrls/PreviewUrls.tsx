import React from "react";
import GeneratedUrl from "../generatedUrls/GeneratedUrl";
import {canUseDOM} from "../../utils";
import {SavedUrlWithParts} from "../../type";

type Props = {
    name?: string;
    originalUrl?: string;
    savedUrls: SavedUrlWithParts;
    handleOnClick?: any;
}

const normalizedUrl = (url: string[]): string => url.join('');

const openAllLinks = (e: any, listOfUrls: any) => {
    e.preventDefault();
    if (canUseDOM) listOfUrls.map((url: string[], index: number) => {
        window.open(normalizedUrl(url), `${index === 0 ? '_new' : index.toString()}`);
    });
}

const getLabel = (name?: string, originalUrl?: string) => {
    if (name) return name;
    if (originalUrl) return originalUrl;
    return 'Generated urls:';
}

const PreviewUrls = ({ name, originalUrl, savedUrls, handleOnClick }: Props) => {
    const hasSavedUrls = savedUrls && savedUrls.length > 0;

    const label = getLabel(name, originalUrl);

    return hasSavedUrls ? <div className="container">
        <div className="preview-urls-title">
            <h4>{label}</h4>
            <button className="button dark small" onClick={(e) => openAllLinks(e, savedUrls)}>open all links</button>
        </div>
        <div className="preview-urls">
            {savedUrls && savedUrls.map((url: any, i: number) => <GeneratedUrl url={url} key={`${url}-${i}`}/>)}
        </div>
        {handleOnClick && <button type="button" className="big-button" onClick={handleOnClick}>save</button>}
    </div> : null;
}

export default PreviewUrls;