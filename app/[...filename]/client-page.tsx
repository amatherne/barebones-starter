// ../app/[...filename]/client-page.tsx

'use client';

import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { tinaField, useTina } from 'tinacms/dist/react';
import { PageQuery } from '../../tina/__generated__/types';
import Gallery from '../components/gallery';

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

  const gallerySettings = data.page.hero || null;

  const transformedGallerySettings = gallerySettings
    ? {
        height: gallerySettings.height,
        min_height: gallerySettings.min_height,
        max_height: gallerySettings.max_height,
        gallery: gallerySettings.gallery?.map((item) =>
          item?.src ? { src: item.src, alt: item.alt || '' } : null
        ).filter((item) => item !== null) || [],
      }
    : null;

  const showTitle = props.params.filename.join("/") !== "home";

  return (
    <>
      {transformedGallerySettings && (
        <Gallery gallerySettings={transformedGallerySettings} />
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
