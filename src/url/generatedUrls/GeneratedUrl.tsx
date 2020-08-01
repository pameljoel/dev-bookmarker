import React from 'react';
import './GeneratedUrl.scss';

type Props = {
  url: string[],
}

const GeneratedUrl: React.FC<Props> = ({ url }) => {
  const normalizedUrl = url ? url.join('') : '';
  return (
    <div className="preview-url">
      {normalizedUrl}
      <a href={normalizedUrl} className="preview-url-button" target="_blank" rel="noopener noreferrer">open url</a>
    </div>
  );
};

export default GeneratedUrl;
