// ../app/components/utilities/formatUrl.tsx

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

export function formatUrl(content: Content): string {
  const basePath = '/';
  let formattedUrl = '';

  if (content.__typename === 'Website') {
    formattedUrl = `${basePath}websites/${content._sys.filename}`;
  } else if (content.__typename === 'Sounds') {
    formattedUrl = `${basePath}sounds/${content._sys.filename}`;
  } else if (content.__typename === 'Page') {
    formattedUrl = `${basePath}${content._sys.filename}`;
  } else {
    formattedUrl = `${basePath}${content._sys.filename}`; // Default case
  }

  return formattedUrl;
}
