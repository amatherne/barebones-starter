// ../app/[...filename]/client-page.tsx

'use client';

import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { tinaField, useTina } from 'tinacms/dist/react';
import { PageQuery } from '../../tina/__generated__/types';
import { Img } from '../components/utilities/img';


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

  const images = data.page.gallery || null;

  // const pageSeoTitle = data?.page?.seo_title? || ""; 
  // const pageSeoText = data?.page?.seo_text? || ""; 

  const showTitle = props.params.filename.join("/") !== "home";

  return (
    <>  

      {images && (
        <div className="gallery">
          {/*{images.map((image, index) => (
            image && image.src ? (
              <div key={index}>
                <div>image.src: ${image.src}</div>
                <Img src={image.src} alt={image.alt} className="hero-image" />
              </div>
            ) : null
          ))}*/}
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
