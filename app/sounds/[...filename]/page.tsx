// ../app/sounds/[...filename]/page.tsx

import Sounds from "./client-page";
import client from "../../../tina/__generated__/client";

export async function generateStaticParams() {
  const pages = await client.queries.soundsConnection();
  const paths = pages.data?.soundsConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}


export default async function PostPage({
  params,
}: {
  params: { filename: string[] };
}) {

  const data = await client.queries.sounds({
    relativePath: `${params.filename}.mdx`,
  });

  return (
    <Sounds {...data}></Sounds>
  );
}