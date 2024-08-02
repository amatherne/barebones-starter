// ../app/components/utilities/breadcrumbs.tsx

import React from 'react';
import Link from 'next/link';
import { cleanPath, capitalizeFirstWord } from '../../../utils/helpers';

export const Breadcrumbs = ({ content, title }) => {

  let hasBreadcrumb                                     = false;
  const breadcrumbPath                                  = cleanPath(content._sys.path);
  const breadcrumbTitle                                 = capitalizeFirstWord(breadcrumbPath);
  
  if (breadcrumbPath && breadcrumbPath != 'page') {
    hasBreadcrumb                                       = true;
  }
  
  return hasBreadcrumb ? (
    <div className="breadcrumbs">
      <ul className="list-unstyled breadcrumbs__list">
        <li className="breadcrumbs__item"><Link className="breadcrumbs__link" href="/">Home</Link></li>
        <li className="breadcrumbs__item"><Link className="breadcrumbs__link" href={`/${breadcrumbPath}`}>{breadcrumbTitle}</Link></li>
        <li className="breadcrumbs__item">{title}</li>
      </ul>
    </div>
  ) : null;
}

export default Breadcrumbs;