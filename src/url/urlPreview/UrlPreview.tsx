import React from 'react';
import './UrlPreview.scss';

type Props = {
  url: string[],
}

const UrlPreview: React.FC<Props> = ({ url }) => {
  const normalizedUrl = url ? url.join('') : '';
  return (
    <a href={normalizedUrl} className="preview-url" target="_blank" rel="noopener noreferrer">
      {normalizedUrl}
    </a>
  );
};

export default UrlPreview;
