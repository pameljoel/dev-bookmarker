import React from 'react';
import './UrlPreview.scss';

type Props = {
  url: string[],
}

const UrlPreview: React.FC<Props> = ({ url }) => {
  const normalizedUrl = url ? url.join('') : '';
  return (
    <div className="preview-url">
      {normalizedUrl}
      <a href={normalizedUrl} className="preview-url-button" target="_blank" rel="noopener noreferrer">open url</a>
    </div>
  );
};

export default UrlPreview;
