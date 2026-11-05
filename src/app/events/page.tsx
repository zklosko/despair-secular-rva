
import { client } from "../../../tina/__generated__/client";
import EventsClient from "./events-client";

export default async function EventsPage() {
  const response = await client.queries.eventsConnection({
    first: 100,
  });

  const events = (
    response.data.eventsConnection.edges ?? []
  )
    .map((edge: any) => edge?.node)
    .filter(
      (event: any) =>
        event && event.isVisible === true
    )
    .sort(
      (a: any, b: any) =>
        (a.sortOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.sortOrder ?? Number.MAX_SAFE_INTEGER)
    )
    .slice(0, 4);

  return <EventsClient events={events} />;
}
