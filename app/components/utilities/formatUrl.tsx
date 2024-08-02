// ../app/components/utilities/formatUrl.tsx

import { cleanPath } from '../../../utils/helpers';

interface SysInfo {
  filename: string;
  basename: string;
  breadcrumbs: string[];
  path: string;
  relativePath: string;
  extension: string;
}

interface Content {
  __typename: string;
  _sys: SysInfo;
  title: string;
}

export const formatUrl = (content: Content | string): string => {
  const basePath = '/';
  let formattedUrl = '';

  if (typeof content === 'string') {
    return content; 
  }

  const newPath = cleanPath(content._sys.path);

  if (newPath != 'page') {
    formattedUrl = `${basePath}${newPath}/${content._sys.filename}`;
  } else {
    formattedUrl = `${basePath}${content._sys.filename}`; 
  }

  return formattedUrl;
}
