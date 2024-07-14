// ../app/[...filename]/client-page.tsx

'use client';

import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { tinaField, useTina } from 'tinacms/dist/react';
import { PageQuery } from '../../tina/__generated__/types';
import ImgOutput from '../components/utilities/img';

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: { page: PageQuery['page'] };
  params: { filename: string[] }; // Add params to props
}

const ClientPage = (props: ClientPageProps) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;

  const { page } = data;
  const { body, title } = page || {};

  // console.log(data);

  const GallerySettings   = data.page.hero || null;
  
  const GalleryDef        = GallerySettings?.height || null;
  const GalleryMin        = GallerySettings?.min_height || null;
  const GalleryMax        = GallerySettings?.max_height || null;

  const GalleryImages     = GallerySettings?.gallery || null;

  const galleryStyle: React.CSSProperties = {
    ...(GalleryDef && { '--height--default': GalleryDef.replace('%','vw') }),
    ...(GalleryMin && { '--height--min': GalleryMin.replace('%','vw') }),
    ...(GalleryMax && { '--height--max': GalleryMax.replace('%','vw') }),
  };

  const galleryClass = `
    ${GalleryDef && GalleryMin && GalleryMax ? 'set-height--clamp' : ''}
    ${GalleryDef && !GalleryMin && !GalleryMax ? 'set-height--default' : ''}
    ${GalleryDef && GalleryMin && !GalleryMax ? 'set-height--min' : ''}
    ${GalleryDef && !GalleryMin && GalleryMax ? 'set-height--max' : ''}
  `.trim();

  // Check if the current page is not the home page to show the title
  const showTitle = props.params.filename.join("/") !== "home";

  return (
    <>
      {GalleryImages && (
        <div 
          className={`gallery ${galleryClass ? 'set-height '+galleryClass : ''}`}
          style={galleryStyle}
        >
          {GalleryImages.map((image, index) => (
            image?.src ? (
              <div key={index} className="gallery--item">
                <ImgOutput src={image.src} alt={image.alt} className="gallery--image" />
              </div>
            ) : null
          ))}
        </div>
      )}

      <section className="page page--default">
        <div className="page-width">
          {showTitle && <h1>{title}</h1>}
          <div className="rte" data-tina-field={tinaField(data.page, 'body')}>
            <TinaMarkdown content={content} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientPage;
