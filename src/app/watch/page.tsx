
import { client } from "../../../tina/__generated__/client";
import WatchClient from "./watch-client";

export default async function WatchPage() {
  const response = await client.queries.sermonsConnection({
    first: 100,
  });

  const sermons = (
    response.data.sermonsConnection.edges ?? []
  )
    .map((edge: any) => edge?.node)
    .filter(
      (sermon: any) =>
        sermon && sermon.isVisible === true
    )
    .sort(
      (a: any, b: any) =>
        (a.sortOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.sortOrder ?? Number.MAX_SAFE_INTEGER)
    );

  return <WatchClient sermons={sermons} />;
}
