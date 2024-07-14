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

const ClientPage: React.FC<ClientPageProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  const { page } = data;
  const { body, title } = page || {};

  const gallerySettings = data.page.hero || {
    height: null,
    min_height: null,
    max_height: null,
    gallery: [],
  };

  const showTitle = props.params.filename.join("/") !== "home";

  return (
    <>

      {gallerySettings && (
        <Gallery gallerySettings={gallerySettings} />
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
