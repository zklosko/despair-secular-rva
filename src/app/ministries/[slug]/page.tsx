
import { notFound } from "next/navigation";
import { client } from "../../../../tina/__generated__/client";
import PageClient from "../../[slug]/client-page";

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await client.queries.ministryConnection({
    first: 100,
  });

  const edges = response.data.ministryConnection.edges ?? [];

  return edges.flatMap((edge: any) => {
    const filename = edge?.node?._sys?.filename;

    if (!filename) {
      return [];
    }

    return [{ slug: filename }];
  });
}

export default async function MinistryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let response: any;

  try {
    response = await client.queries.ministry({
      relativePath: `${slug}.json`,
    });
  } catch {
    notFound();
  }

  return <PageClient {...response} />;
}
