
"use client";

import { useState } from "react";

type WatchClientProps = {
  sermons: any[];
};

function getVideoId(sermon: any): string {
  if (sermon.videoId) {
    return sermon.videoId;
  }

  const url = sermon.videoUrl || "";

  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^?&/]+)/
  );

  return match?.[1] || "";
}

function getThumbnail(sermon: any): string {
  if (sermon.thumbnailUrl) {
    return sermon.thumbnailUrl;
  }

  const videoId = getVideoId(sermon);

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";
}

function formatDate(date: string): string {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function WatchClient({
  sermons,
}: WatchClientProps) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const featuredIndex = sermons.findIndex(
      (sermon) => sermon.isFeatured
    );

    return featuredIndex >= 0 ? featuredIndex : 0;
  });

  if (!sermons.length) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Watch
        </h1>

        <p className="mt-4 text-gray-600">
          Videos will appear here soon. Check back for messages
          from Despair.
        </p>
      </main>
    );
  }

  const selectedSermon = sermons[selectedIndex];
  const videoId = getVideoId(selectedSermon);

  const title =
    selectedSermon.title ||
    selectedSermon.youtubeTitle ||
    "Untitled Sermon";

  const description =
    selectedSermon.sidebarContent ||
    selectedSermon.youtubeDescription ||
    "";

  const scriptureReferences =
    selectedSermon.scriptureReferences || [];

  const discussionQuestions =
    selectedSermon.discussionQuestions || [];

  const resources = selectedSermon.resources || [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Despair
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Watch
        </h1>

        <p className="mt-3 max-w-2xl text-base text-gray-600">
          Take your next
          step into despair.
        </p>
      </div>

      {/* Main video and sidebar */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          {/* Video player */}
          <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-lg">
            {videoId ? (
              <iframe
                key={videoId}
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title={title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-white">
                <p>
                  Add a YouTube Video URL or Video ID to this
                  sermon in TinaCMS to display the video.
                </p>
              </div>
            )}
          </div>

          
          {/* Selected sermon information */}
          <div className="mt-7 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              {selectedSermon.series && (
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {selectedSermon.series}
                </span>
              )}

              {formatDate(selectedSermon.publishedAt) && (
                <span className="text-sm text-gray-500">
                  {formatDate(selectedSermon.publishedAt)}
                </span>
              )}
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>

            {selectedSermon.speaker && (
              <p className="text-base text-gray-600">
                Presented by {selectedSermon.speaker}
              </p>
            )}
          </div>

          {/* Sermon filmstrip */}
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                More Messages
              </h3>

              <span className="text-sm text-gray-500">
                {selectedIndex + 1} of {sermons.length}
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {sermons.map((sermon, index) => {
                const thumbnail = getThumbnail(sermon);
                const sermonTitle =
                  sermon.title ||
                  sermon.youtubeTitle ||
                  "Untitled Sermon";

                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={
                      sermon._sys?.filename ||
                      sermon.videoId ||
                      index
                    }
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-pressed={isSelected}
                    className={`group w-72 shrink-0 overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-colors duration-200 ${
                    isSelected
                        ? "border-primary ring-2 ring-primary/30 shadow-md"
                        : "border-gray-200 hover:border-gray-400 hover:shadow-md"
                    }`}
                  >
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      {thumbnail ? (
                        <div
                          role="img"
                          aria-label={`Thumbnail for ${sermonTitle}`}
                          className="h-full w-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url("${thumbnail}")`,
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-500">
                          Video thumbnail
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <p className="line-clamp-2 text-sm font-semibold">
                        {sermonTitle}
                      </p>

                      {sermon.speaker && (
                        <p className="mt-1 text-xs text-gray-500">
                          {sermon.speaker}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Contextual sidebar */}
        <aside className="self-start space-y-7 rounded-xl border border-border bg-white/70 p-6 shadow-sm md:p-7">
          <section>
            <h3 className="text-lg font-semibold">
              About This Message
            </h3>

            {description ? (
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                {description}
              </p>
            ) : (
              <p className="mt-3 text-sm leading-7 text-gray-500">
                Message details will appear here.
              </p>
            )}
          </section>

          {scriptureReferences.length > 0 && (
            <section className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold">
                Scripture
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {scriptureReferences.map(
                  (reference: string, index: number) => (
                    <span
                      key={`${reference}-${index}`}
                      className="rounded-full bg-white px-3 py-2 text-sm text-gray-700"
                    >
                      {reference}
                    </span>
                  )
                )}
              </div>
            </section>
          )}

          {discussionQuestions.length > 0 && (
            <section className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold">
                Discussion Questions
              </h3>

              <ol className="mt-3 space-y-4">
                {discussionQuestions.map(
                  (item: any, index: number) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-6 text-gray-600"
                    >
                      <span className="font-semibold text-gray-900">
                        {index + 1}.
                      </span>

                      <span>{item.question}</span>
                    </li>
                  )
                )}
              </ol>
            </section>
          )}

          {resources.length > 0 && (
            <section className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold">
                Resources
              </h3>

              <ul className="mt-3 space-y-3">
                {resources.map((resource: any, index: number) => (
                  <li key={index}>
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-950"
                      >
                        {resource.title || resource.url}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-600">
                        {resource.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}
