
import { client } from "../../tina/__generated__/client";
import PageClient from "./[slug]/client-page";

export default async function HomePage() {
  const [pageResponse, ministryResponse, sermonResponse] =
    await Promise.all([
      client.queries.page({
        relativePath: "home.json",
      }),
      client.queries.ministryConnection({
        first: 100,
      }),
      client.queries.sermonsConnection({
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

  // Find the featured sermon that is also visible on the Watch page.
  const featuredSermon = (
    sermonResponse.data.sermonsConnection.edges ?? []
  )
    .map((edge: any) => edge?.node)
    .filter(
      (sermon: any) =>
        sermon &&
        sermon.isFeatured === true &&
        sermon.isVisible === true
    )
    .sort((a: any, b: any) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
    )
    .map((sermon: any) => ({
      title: sermon.title,
      videoUrl: sermon.videoUrl,
      date: sermon.publishedAt,
      thumbnail:
        sermon.thumbnailUrl ||
        (sermon.videoId
          ? `https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`
          : undefined),
      speaker: sermon.speaker
        ? { name: sermon.speaker }
        : undefined,
      series: sermon.series
        ? { title: sermon.series }
        : undefined,
    }))[0] ?? null;

  return (
    <PageClient
      {...pageResponse}
      ministries={ministries}
      featuredSermon={featuredSermon}
    />
  );
}
