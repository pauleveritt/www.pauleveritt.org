import { Header, HeaderEntry } from "../../components/Header";

export type Metadata = {
  description: string;
  language: string;
  title: string;
};

export type Eleventy = {
  generator: string;
};

export type EleventyCollections = {
  all: any[];
};

export type EleventyPage = {
  url: string;
};

export type RenderData = {
  eleventy: Eleventy;
  metadata: Metadata;
  getBundle(name: string): string;
  eleventyNavigation(entries: HeaderEntry[]): HeaderEntry[];
  htmlBaseUrl(url: string): string;
};

export type BaseLayoutProps = {
  content: string;
  description?: string;
  collections: EleventyCollections;
  eleventy: Eleventy;
  metadata: Metadata;
  page: EleventyPage;
  title?: string;
  currentBuildDate: string;
};

export function BaseLayout(
  this: RenderData,
  {
    content,
    description,
    title,
    collections,
    eleventy,
    page,
    metadata,
    currentBuildDate,
  }: BaseLayoutProps,
) {
  const css = this.getBundle("css");
  const entries = this.eleventyNavigation(collections.all);
  const baseURL = this.htmlBaseUrl(page.url);

  return (
    <html lang={metadata.language}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={description || metadata.description}
        />
        <title>{title ? `${title} - ${metadata.title}` : metadata.title}</title>
        <link
          rel="alternate"
          href={`/feed/feed.xml`}
          type="application/atom+xml"
          title={metadata.title}
        />
        <link
          rel="alternate"
          href={`/feed/feed.json`}
          type="application/json"
          title={metadata.title}
        />
        <meta name="generator" content={eleventy.generator} />
        <style>{css}</style>
        <link rel="stylesheet" href="/css/index.css" type="text/css" />
        <link rel="icon" href="/img/favicon.svg" />
      </head>
      <body>
        <a href="#skip" class="visually-hidden">
          Skip to main content
        </a>

        <Header
          entries={entries}
          metadataTitle={metadata.title}
          pageURL={page.url}
        />

        <main id="skip" dangerouslySetInnerHTML={{ __html: content }} />
        <footer>
          <div style={{ display: "none" }}>
            This page {baseURL} was built on {currentBuildDate}
          </div>
        </footer>
      </body>
    </html>
  );
}

export const render = BaseLayout;
