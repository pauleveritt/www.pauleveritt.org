import { expect, test } from "vitest";
import { BaseLayout, BaseLayoutProps } from "./BaseLayout";
import { screen } from "@testing-library/dom";
import { jsxToString } from "jsx-async-runtime";

const baseLayoutThis = {
  collections: {
    all: [],
  },
  eleventy: {
    generator: "9.9.9a1",
  },
  metadata: {
    description: "Site description",
    language: "en",
    title: "My Site",
  },
  page: {
    url: "http://localhost:3000/two",
  },
  useBundle: () => [".pdq {font-weight: bold}", null],
  eleventyNavigation: () => [
    { title: "Title 1", url: "http://localhost:3000/one" },
    { title: "Title 2", url: "http://localhost:3000/two" },
  ],
  htmlBaseUrl: () => "/some-url",
};

const commonProps: BaseLayoutProps = {
  content: "<p>This is <em>THE</em> body.</p>",
};

test("Silence unused symbol complaints", async () => {
  expect(baseLayoutThis.htmlBaseUrl).toBeTruthy;
  expect(baseLayoutThis.useBundle).toBeTruthy;
});

test("BaseLayout for HTML string from Markdown body", async () => {
  const result = <BaseLayout {...commonProps} />;
  document.body.innerHTML = await jsxToString.call(baseLayoutThis, result);
  expect(document.title).toBe(baseLayoutThis.metadata.title);

  // Description
  const description = document.querySelector(
    "meta[name='description']",
  ) as HTMLMetaElement;
  expect(description.content).toBe(baseLayoutThis.metadata.description);

  // Feed links
  const atom = document.querySelector(
    "link[type='application/atom+xml']",
  ) as HTMLLinkElement;
  expect(atom.title).toBe(baseLayoutThis.metadata.title);
  const jsonFeed = document.querySelector(
    "link[type='application/json']",
  ) as HTMLLinkElement;
  expect(jsonFeed.title).toBe(baseLayoutThis.metadata.title);

  // Generator
  const generator = document.querySelector(
    "meta[name='generator']",
  ) as HTMLMetaElement;
  expect(generator.content).toBe(baseLayoutThis.eleventy.generator);

  // CSS Bundle
  const style = document.querySelector("style") as HTMLStyleElement;
  expect(style.innerText).toBe(".pdq {font-weight: bold}");

  // Inclusion of the header
  expect(screen.getByRole("banner")).toBeTruthy();

  // The main element should have content
  expect(screen.getByText("THE")).toBeTruthy();

  // Inclusion of the footer
  expect(screen.getByRole("contentinfo")).toBeTruthy();
});

test("render MainLayout pre-page options", async () => {
  const thisBaseLayoutThis = {
    ...baseLayoutThis,
    title: "This Title",
    description: "This Description",
  };
  const result = <BaseLayout {...commonProps} />;
  document.body.innerHTML = await jsxToString.call(thisBaseLayoutThis, result);
  const description = document.querySelector(
    "meta[name='description']",
  ) as HTMLMetaElement;
  expect(document.title).toBe("This Title - " + baseLayoutThis.metadata.title);
  expect(description.content).toBe("This Description");
});

test("No CSS passed in means no script tag", async () => {
  const result = <BaseLayout />;
  document.body.innerHTML = await jsxToString.call(baseLayoutThis, result);
  const style = document.querySelector("style") as HTMLStyleElement;
  expect(style).toBeUndefined;
});

test("Children instead of HTML string from Markdown", async () => {
  const children = <div>The Children</div>;
  const theseProps = { ...commonProps, children };
  const result = <BaseLayout {...theseProps} />;
  document.body.innerHTML = await jsxToString.call(baseLayoutThis, result);
  expect(screen.getByText("The Children")).toBeDefined();
});
