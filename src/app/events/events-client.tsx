
type EventsClientProps = {
  events: any[];
};

const CCB_CALENDAR_URL =
  "https://hopecentral.ccbchurch.com/goto/events/public";

export default function EventsClient({
  events,
}: EventsClientProps) {
  return (
    <main>
      {/* PAGE INTRODUCTION */}
      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-primary">
            Despair
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Events
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted">
            Find opportunities to connect, grow, and get involved
            in the life of Despair.
          </p>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      {events.length > 0 && (
        <section className="bg-background px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-primary">
                Coming Up
              </p>

              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Featured Events
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {events.map((event, index) => {
                const eventDate = event.date
                  ? new Date(event.date)
                  : null;

                const formattedDate =
                  eventDate && !Number.isNaN(eventDate.getTime())
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      }).format(eventDate)
                    : null;

                return (
                  <article
                    key={event.id ?? event._sys?.filename ?? index}
                    className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
                  >
                    {event.image && (
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={event.image}
                          alt={event.imageAlt || event.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {formattedDate && (
                        <p className="mb-3 text-sm font-medium text-primary">
                          {formattedDate}
                        </p>
                      )}

                      <h3 className="text-xl font-semibold tracking-tight">
                        {event.title}
                      </h3>

                      {event.description && (
                        <p className="mt-3 text-sm leading-7 text-muted">
                          {event.description}
                        </p>
                      )}

                      {event.location && (
                        <p className="mt-4 text-sm text-foreground">
                          <span className="font-medium">Location:</span>{" "}
                          {event.location}
                        </p>
                      )}

                      {event.registrationUrl && (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85"
                        >
                          {event.buttonText || "Register"}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CCB PUBLIC CALENDAR */}
      <section className="bg-muted-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-primary">
                Stay Connected
              </p>

              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Upcoming Events
              </h2>

              <p className="mt-4 max-w-2xl text-muted">
                Explore the full Despair calendar to see
                everything happening in our &quot;community&quot;.
              </p>
            </div>

            <a
              href={CCB_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit rounded-md bg-primary px-6 py-3 text-sm font-medium text-white! transition-opacity hover:opacity-85"
            >
              View Full Calendar
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <iframe
              src={CCB_CALENDAR_URL}
              title="Despair Events Calendar"
              className="block w-full border-0"
              style={{ height: "800px" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
