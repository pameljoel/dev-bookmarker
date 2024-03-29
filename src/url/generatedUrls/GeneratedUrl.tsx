import React from 'react';

type Props = {
  url: string[],
}

const GeneratedUrl: React.FC<Props> = ({ url }) => {
  const normalizedUrl = url.length > 0 ? url.join('') : '';
  return (
    <div className="preview-url">
      {normalizedUrl}
      <a href={normalizedUrl} className="preview-url-button" target="_blank" rel="noopener noreferrer">open url</a>
    </div>
  );
};

export default GeneratedUrl;
