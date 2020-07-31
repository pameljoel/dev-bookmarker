import React from 'react';

const Header = ({
  url, onKeypress, updateInput, setUrl,
}) => (
  <div className="url-hero">
    <div className="container">
      <h1>Dev Bookmarker</h1>
      <h2>The bookmarker for devs</h2>
      <div className="url-hero__description">
        Want to bookmark your pages on multiple
        {' '}
        <strong>sub-domains</strong>
        ,
        {' '}
        <strong>domains</strong>
        ,
        {' '}
        <strong>ports</strong>
        ? MAybe with different parameters every
        time?
        <br />
        This is your lucky day.
        {' '}
        <strong>Try it out.</strong>
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
            onChange={(e) => {
              updateInput(e.target.value);
              onKeypress(e.keyCode);
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
