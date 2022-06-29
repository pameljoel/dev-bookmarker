import React from "react";
import GeneratedUrl from "../generatedUrls/GeneratedUrl";
import { canUseDOM } from "../../utils";
import {generateUrlsToSave} from "../../home/Home";
import {Chunks} from "../../type";

type Props = {
    chunks: Chunks;
    handleOnClick?: any;
}

const normalizedUrl = (url: string[]): string => url.join('');

const openAllLinks = (e: any, listOfUrls: any) => {
    e.preventDefault();
    if (canUseDOM) listOfUrls.map((url: string[]) => window.open(normalizedUrl(url)));
}

const PreviewUrls = ({chunks, handleOnClick}: Props) => {
    const urls= generateUrlsToSave(chunks);
    const hasSavedUrls = urls && urls.length > 0;

    return hasSavedUrls ? <div className="container">
        <h4>Generated urls:</h4>
        <div className="preview-urls">
            {urls && urls.map((url: any, i: number) => <GeneratedUrl url={url} key={`${url}-${i}`}/>)}
            <button className="add-value" onClick={(e) => openAllLinks(e, urls)}>open all links</button>
        </div>
        {handleOnClick && <button type="button" className="big-button" onClick={handleOnClick}>save</button>}
    </div> : null;
}

export default PreviewUrls;