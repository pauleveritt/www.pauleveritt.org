/*

The base for other layouts. Is never used directly, hence it does
not have `.11ty` in its name.

 */
import { Header } from "./Header";
import { ComponentChildren } from "preact";

export type BaseLayoutContext = {
  context: {
    data: {};
    eleventy: {
      generator: string;
    };
    metadata: {
      description: string;
      language: string;
      title: string;
    };
    page: {
      url: string;
    };
    filters: {
      htmlBaseUrl(url: string): string;
    };
    useBundle: (content: string) => [string, (content: string) => void];
  };
};
export type BaseLayoutProps = {
  children?: ComponentChildren;
  content?: string;
  description?: string;
  title?: string;
  css?: string;
};

export function BaseLayout(
  this: BaseLayoutContext,
  { children, content, description, title }: BaseLayoutProps,
) {
  const tc = this.context;
  const { filters, eleventy, metadata, page, useBundle } = this.context;
  const baseURL = filters.htmlBaseUrl(page.url);
  const [css, setCss] = useBundle("css");
  const currentBuildDate = new Date().toISOString();

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
        <link rel="stylesheet" href="/css/index.css" type="text/css" />
        {css && <style>{css}</style>}
        <link rel="icon" href="/img/favicon.svg" />
      </head>
      <body>
        <a href="#skip" class="visually-hidden">
          Skip to main content
        </a>

        <Header />

        {content && (
          <main id="skip" dangerouslySetInnerHTML={{ __html: content }} />
        )}
        {children && <main id="skip">{children}</main>}
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
