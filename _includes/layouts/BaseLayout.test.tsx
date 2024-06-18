import { expect, test } from "vitest";
import {
  BaseLayout,
  BaseLayoutProps,
  Eleventy,
  Metadata,
} from "./BaseLayout.11ty";
import { screen } from "@testing-library/dom";
import { renderToStringAsync } from "preact-render-to-string";

const eleventy: Eleventy = {
  generator: "9.9.9a1",
};

const metadata: Metadata = {
  description: "Site description",
  language: "en",
  title: "My Site",
};

const entries = [
  { title: "Title 1", url: "http://localhost:3000/one" },
  { title: "Title 2", url: "http://localhost:3000/two" },
];
const commonProps: BaseLayoutProps = {
  content: "<p>This is <em>THE</em> body.</p>",
  eleventy,
  metadata,
  page: {
    url: "http://localhost:3000/two",
  },
  collections: {
    all: entries,
  },
  currentBuildDate: "2020-20-20",
};

const thisContext = {
  getBundle: () => "body {}",
  eleventyNavigation: () => entries,
  htmlBaseUrl: () => "/some-url",
};

const BoundBaseLayout = BaseLayout.bind(thisContext);

test("render BaseLayout defaults", async () => {
  const result = <BoundBaseLayout {...commonProps} />;
  document.body.innerHTML = await renderToStringAsync(result);
  expect(document.title).toBe(metadata.title);

  // Description
  const description = document.querySelector(
    "meta[name='description']",
  ) as HTMLMetaElement;
  expect(description.content).toBe(metadata.description);

  // Feed links
  const atom = document.querySelector(
    "link[type='application/atom+xml']",
  ) as HTMLLinkElement;
  expect(atom.title).toBe(metadata.title);
  const jsonFeed = document.querySelector(
    "link[type='application/json']",
  ) as HTMLLinkElement;
  expect(jsonFeed.title).toBe(metadata.title);

  // Generator
  const generator = document.querySelector(
    "meta[name='generator']",
  ) as HTMLMetaElement;
  expect(generator.content).toBe(eleventy.generator);

  // CSS Bundle
  const style = document.querySelector("style") as HTMLStyleElement;
  expect(style.innerText).toBe("body {}");

  // Inclusion of the header
  expect(screen.getByRole("banner")).toBeTruthy();

  // The main element should have content
  expect(screen.getByText("THE")).toBeTruthy();

  // Inclusion of the footer
  expect(screen.getByRole("contentinfo")).toBeTruthy();
});

test("render MainLayout pre-page options", async () => {
  const result = (
    <BoundBaseLayout
      {...commonProps}
      title="This Title"
      description="This Description"
    />
  );
  document.body.innerHTML = await renderToStringAsync(result);
  const description = document.querySelector(
    "meta[name='description']",
  ) as HTMLMetaElement;
  expect(document.title).toBe("This Title - " + metadata.title);
  expect(description.content).toBe("This Description");
});
