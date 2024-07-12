// ../app/websites/[...filename]/client-page.tsx

"use client";

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import { WebsiteQuery } from "../../../tina/__generated__/types";
import { Img } from '../../../components/utilities/Img';
import Head from '../../../components/Head';

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: WebsiteQuery;
}

const Website = (props: ClientPageProps) => {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { website } = data;
  const { body, title, gallery } = website || {};
  const images = gallery || [];
  const hero = images.find(item => item?.hero) || null;

  const pageSeoTitle = data?.website?.seo_title || ""; 
  const pageSeoText = data?.website?.seo_text || "";   

  return (
    <>
      
      <Head seoTitle={pageSeoTitle} seoText={pageSeoText} />

      <div>
        
        
        {hero && hero.src !== '' && (
          <Img src={hero.src} alt={hero.alt} className="hero-image" />
        )}

        <h1>{title}</h1>

        {body && (
          <div data-tina-field={tinaField(website, "body")}>
            <TinaMarkdown content={body} />
          </div>
        )}

       {/* <code>
          <pre style={{ backgroundColor: "lightgray" }}>
            {JSON.stringify(website, null, 2)}
          </pre>
        </code>*/}
      </div>
    </>
  );
};

export default Website;
