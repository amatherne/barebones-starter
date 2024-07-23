// ../app/websites/[...filename]/client-page.tsx

"use client";

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import { WebsiteQuery } from "../../../tina/__generated__/types";
import Blocks from '../../components/blocks';

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: { website: WebsiteQuery['website'] };
  params: { filename: string[] };
}

const Website = (props: ClientPageProps) => {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const settings = data.website.blocks || [];

  return (
    <>
      
      <Blocks settings={settings} content={data.website} />

    </>
  );
};

export default Website;
