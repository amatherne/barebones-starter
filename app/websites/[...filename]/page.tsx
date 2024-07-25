// ../app/websites/[...filename]/page.tsx

import React from 'react';
import Website from "./client-page";
import client from "../../../tina/__generated__/client";

export async function generateStaticParams() {
  const websites = await client.queries.websiteConnection();
  const paths = websites.data?.websiteConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}

export default async function PostPage({
  params,
}: {
  params: { filename: string[] };
}) {

  const data = await client.queries.website({
    relativePath: `${params.filename}.mdx`,
  });

  return (
    <Website
      query={data.query}
      variables={{ relativePath: `${params.filename.join("/")}.mdx` }}
      data={data.data}
      params={params}
    />
  );
}