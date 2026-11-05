
import { notFound } from "next/navigation";
import { client } from "../../../tina/__generated__/client";
import PageClient from "./client-page";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { slug: "about" },
    { slug: "ministries" },
    { slug: "visit" },
  ];
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const [pageResponse, ministryResponse] = await Promise.all([
      client.queries.page({
        relativePath: `${slug}.json`,
      }),
      client.queries.ministryConnection({
        first: 100,
      }),
    ]);

    const ministries = (
      ministryResponse.data.ministryConnection.edges ?? []
    )
      .map((edge: any) => edge?.node)
      .filter((ministry: any) => ministry && ministry.isActive !== false)
      .sort(
        (a: any, b: any) =>
          (a.order ?? Number.MAX_SAFE_INTEGER) -
          (b.order ?? Number.MAX_SAFE_INTEGER)
      );

    return (
      <PageClient
        {...pageResponse}
        ministries={ministries}
      />
    );
  } catch {
    notFound();
  }
}
