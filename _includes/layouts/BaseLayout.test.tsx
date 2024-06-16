import { expect, test } from "vitest";
import {
  BaseLayout,
  BaseLayoutProps,
  RenderData,
  Metadata,
  Eleventy,
} from "./BaseLayout.11ty";
import { renderToString } from "jsx-async-runtime";

const eleventy: Eleventy = {
  generator: "9.9.9a1",
};

const metadata: Metadata = {
  description: "Site description",
  language: "en",
  title: "My Site",
};

const commonProps: BaseLayoutProps = {
  content: "<p>This is <em>the body</em></p>",
  eleventy,
  metadata,
};

const thisContext = {
  getBundle: (name: string) => "body {}",
};

const BoundBaseLayout = BaseLayout.bind(thisContext);

test("render BaseLayout defaults", async () => {
  const result = <BoundBaseLayout {...commonProps} />;
  document.body.innerHTML = await renderToString(result);
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
});

test("render MainLayout pre-page options", async () => {
  const result = (
    <BoundBaseLayout
      {...commonProps}
      title="This Title"
      description="This Description"
    />
  );
  document.body.innerHTML = await renderToString(result);
  const description = document.querySelector(
    "meta[name='description']",
  ) as HTMLMetaElement;
  expect(document.title).toBe("This Title - " + metadata.title);
  expect(description.content).toBe("This Description");
});
