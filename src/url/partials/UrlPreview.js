import React from 'react';
import './UrlPreview.css';

export const UrlPreview = ({ url }) => (
  <a className="preview-url" href={url} target="_blank" rel="noopener noreferrer">
    {url}
  </a>
);
