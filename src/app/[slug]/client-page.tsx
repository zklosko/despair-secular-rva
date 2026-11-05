
"use client";

import { useTina } from "tinacms/dist/react";

import { Hero } from "@/lib/components/sections/Hero";
import { ImageText } from "@/lib/components/sections/ImageText";
import { ServiceTimes } from "@/lib/components/sections/ServiceTimes";
import { FeaturedSermon } from "@/lib/components/sections/FeaturedSermon";
import { NextSteps } from "@/lib/components/sections/NextSteps";
import { ClosingInvitation } from "@/lib/components/sections/ClosingInvitation";
import { RichTextContent } from "@/lib/components/sections/RichTextContent";
import { CallToAction } from "@/lib/components/sections/CallToAction";
import { CardGrid } from "@/lib/components/sections/CardGrid";
import { MinistryGrid } from "@/lib/components/sections/MinistryGrid";

type PageClientProps = {
  query: string;
  variables: {
    relativePath: string;
  };
  data: any;
  ministries?: any[];
  featuredSermon?: any;
};

export default function PageClient(props: PageClientProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const sections = data.page?.sections ?? data.ministry?.sections ?? [];

  return (
    <>
      {sections.map((section: any, index: number) => {
        const key = section._key || index;

        const type = String(
          section.__typename || section._template || ""
        ).toLowerCase();

        // 1. HERO
        if (type.endsWith("hero")) {
          return (
            <Hero
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              body={section.body}
              image={section.image}
              imageAlt={section.imageAlt}
              primaryButtonText={section.primaryButtonText}
              primaryButtonLink={section.primaryButtonLink}
              secondaryButtonText={section.secondaryButtonText}
              secondaryButtonLink={section.secondaryButtonLink}
              tinaData={section}
            />
          );
        }

        // 2. IMAGE + TEXT
        if (type.endsWith("imagetext")) {
          return (
            <ImageText
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              body={section.body}
              image={section.image}
              imageAlt={section.imageAlt}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              tinaData={section}
            />
          );
        }

        // 3. SERVICE TIMES
        if (type.endsWith("servicetimes")) {
          const locations = (section.locations ?? []).map(
            (location: any, locationIndex: number) => ({
              ...location,
              _id: location._key || location.name || String(locationIndex),
            })
          );

          return (
            <ServiceTimes
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              body={section.body}
              locations={locations}
              tinaData={section}
            />
          );
        }

        // 4. FEATURED SERMON
        if (type.endsWith("featuredsermon")) {
          return (
            <FeaturedSermon
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              sermon={props.featuredSermon ?? section.sermon}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              tinaData={section}
            />
          );
        }

        // 5. NEXT STEPS
        if (type.endsWith("nextsteps")) {
          return (
            <NextSteps
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.description}
              items={section.items}
              tinaData={section}
            />
          );
        }

        // 6. CLOSING INVITATION
        if (type.endsWith("closinginvitation")) {
          return (
            <ClosingInvitation
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.description}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              tinaData={section}
            />
          );
        }

        // 7. RICH TEXT CONTENT
        if (type.endsWith("richtextcontent")) {
          return (
            <RichTextContent
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              content={section.content}
              background={section.background}
              tinaData={section}
            />
          );
        }

        // 8. CALL TO ACTION
        if (type.endsWith("calltoaction")) {
          return (
            <CallToAction
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.description}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              backgroundImage={section.backgroundImage}
              style={section.style}
              tinaData={section}
            />
          );
        }

        // 9. CARD GRID
        if (type.endsWith("cardgrid")) {
          const requestedColumns = Number(section.columns);
          const columns = (
            [2, 3, 4].includes(requestedColumns)
              ? requestedColumns
              : 3
          ) as 2 | 3 | 4;

          return (
            <CardGrid
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.description}
              columns={columns}
              cards={section.cards}
              tinaData={section}
            />
          );
        }

        // 10. MINISTRY GRID
        if (type.endsWith("ministrygrid")) {
          const selectedMinistries =
            section.displayMode === "selected"
              ? (section.ministryItems ?? [])
                  .map((item: any) => item.ministry)
                  .filter((ministry: any) => ministry)
              : (props.ministries ?? []);

          const requestedColumns = Number(section.columns);
          const columns = (
            [2, 3, 4].includes(requestedColumns)
              ? requestedColumns
              : 3
          ) as 2 | 3 | 4;

          return (
            <MinistryGrid
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.description}
              columns={columns}
              ministries={selectedMinistries}
              tinaData={section}
            />
          );
        }

        return null;
      })}
    </>
  );
}
