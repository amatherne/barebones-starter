// ../app/websites/[...filename]/page.tsx

import Website from "./client-page";
import client from "../../../tina/__generated__/client";

export async function generateStaticParams() {
  const pages = await client.queries.websiteConnection();
  const paths = pages.data?.websiteConnection?.edges?.map((edge) => ({
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
    <Website {...data}></Website>
  );
}