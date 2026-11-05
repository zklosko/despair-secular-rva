
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

type ServiceTime = {
  time: string;
  label?: string;
};

type Location = {
  _id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  serviceTimes?: ServiceTime[];
  directionsUrl?: string;
  description?: string;
  isActive?: boolean;
};

type ServiceTimesProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  locations?: Location[];
  tinaData?: any;
};

export function ServiceTimes({
  eyebrow,
  heading,
  body,
  locations = [],
  tinaData,
}: ServiceTimesProps) {
  const activeLocations = locations
    .map((location, originalIndex) => ({ location, originalIndex }))
    .filter(({ location }) => location.isActive !== false);

  return (
    <section
      className="bg-background py-20 md:py-28"
      aria-labelledby="service-times-heading"
    >
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          {eyebrow && (
            <p
              data-tina-field={tinaField(tinaData, "eyebrow")}
              className="mb-4 text-sm font-medium text-primary"
            >
              {eyebrow}
            </p>
          )}

          <h2
            id="service-times-heading"
            data-tina-field={tinaField(tinaData, "heading")}
            className="text-3xl font-medium tracking-tight md:text-5xl"
          >
            {heading}
          </h2>

          {body && (
            <p
              data-tina-field={tinaField(tinaData, "body")}
              className="mt-5 text-base leading-relaxed text-muted md:text-lg"
            >
              {body}
            </p>
          )}
        </div>

        <div className="grid gap-x-16 md:grid-cols-2">
          {activeLocations.map(({ location, originalIndex }) => {
            const locationAddress = [
              location.address,
              location.city,
              location.state,
              location.zip,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <div
                key={location._id}
                className="border-t border-border py-8 md:py-10"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3
                    data-tina-field={tinaField(
                      tinaData,
                      `locations.${originalIndex}.name`
                    )}
                    className="text-2xl font-medium"
                  >
                    {location.name}
                  </h3>

                  {locationAddress && (
                    <span className="text-sm text-muted">
                      {location.address && (
                        <span
                          data-tina-field={tinaField(
                            tinaData,
                            `locations.${originalIndex}.address`
                          )}
                        >
                          {location.address}
                        </span>
                      )}
                      {location.city && (
                        <>
                          {location.address ? ", " : ""}
                          <span
                            data-tina-field={tinaField(
                              tinaData,
                              `locations.${originalIndex}.city`
                            )}
                          >
                            {location.city}
                          </span>
                        </>
                      )}
                      {location.state && (
                        <>
                          {location.city || location.address ? ", " : ""}
                          <span
                            data-tina-field={tinaField(
                              tinaData,
                              `locations.${originalIndex}.state`
                            )}
                          >
                            {location.state}
                          </span>
                        </>
                      )}
                      {location.zip && (
                        <>
                          {" "}
                          <span
                            data-tina-field={tinaField(
                              tinaData,
                              `locations.${originalIndex}.zip`
                            )}
                          >
                            {location.zip}
                          </span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                {location.description && (
                  <p
                    data-tina-field={tinaField(
                      tinaData,
                      `locations.${originalIndex}.description`
                    )}
                    className="mt-4 text-sm leading-relaxed text-muted"
                  >
                    {location.description}
                  </p>
                )}

                {location.serviceTimes &&
                  location.serviceTimes.length > 0 && (
                    <>
                      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted">
                        Sunday mornings
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {location.serviceTimes.map((service, index) => (
                          <span
                            key={`${location._id}-${service.time}-${index}`}
                            className="text-xl font-medium tracking-tight md:text-2xl"
                          >
                            {index > 0 && (
                              <span
                                className="mr-5 text-muted"
                                aria-hidden="true"
                              >
                                ·
                              </span>
                            )}
                            <span
                              data-tina-field={tinaField(
                                tinaData,
                                `locations.${originalIndex}.serviceTimes.${index}.time`
                              )}
                            >
                              {service.time}
                            </span>
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                {location.directionsUrl && (
                  <Link
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tina-field={tinaField(
                      tinaData,
                      `locations.${originalIndex}.directionsUrl`
                    )}
                    className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    Directions and what to expect
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
