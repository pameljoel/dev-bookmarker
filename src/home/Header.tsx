import React from 'react';
import {HandleOnKeyPress, SetUrl, UpdateUrl} from "../type";

type Props = {
  url: string;
    handleOnKeyPress: HandleOnKeyPress;
  updateInput: UpdateUrl;
  setUrl: SetUrl;
}

const Header = ({ url, handleOnKeyPress, updateInput, setUrl }: Props) => (
  <div className="url-hero">
    <div className="container">
      <h1>Dev Bookmarker</h1>
      <h2>The bookmarker for devs</h2>
      <div className="url-hero__description">
        Want to bookmark your pages on multiple
        <strong> sub-domains</strong>,
        <strong> domains</strong>,
        <strong> ports</strong>?
        <br/>
        Maybe with different parameters every time?
        <br />
        <br />
        This is your lucky day. <strong>Try it out.</strong>
      </div>
      <div
        id="labelForInput"
        className="url-hero__label"
      >
        Bookmark an url
        <div className="url-hero__url">
          <input
            type="text"
            value={url}
            name="bookmarkInput"
            id="bookmarkInput"
            className="url-hero__input"
            placeholder="Paste an url here"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateInput(e.target.value);
              // @ts-ignore
                handleOnKeyPress(e.keyCode);
            }}
          />
          <button
            className="url-hero__save big-button"
            type="button"
            onClick={() => setUrl(url)}
          >
            save
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
