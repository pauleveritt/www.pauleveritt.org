import { expect, test } from "vitest";
import { Header, HeaderThis, NavEntry } from "./Header";
import { screen } from "@testing-library/dom";
import { navigation } from "@11ty/eleventy-navigation";
import { renderToStringAsync } from "preact-render-to-string";

const collectionsAll = [
  {
    data: {
      eleventyNavigation: {
        key: "Home",
        order: 1,
        url: "http://localhost:3000/1",
      },
    },
  },
  {
    data: {
      eleventyNavigation: {
        key: "Two",
        order: 2,
        url: "http://localhost:3000/2",
      },
    },
  },
];

test("Eleventy Navigation Find", async () => {
  const navEntries: NavEntry[] = navigation.find(collectionsAll);
  expect(navEntries.length).toEqual(2);
});

test("render heading with default name", async () => {
  const headerThis: HeaderThis = {
    context: {
      collections: {
        all: collectionsAll,
      },
      metadata: {
        title: "My Site",
      },
      page: {
        url: "http://localhost:3000/2",
      },
    },
  };

  const result = <Header />;
  const { context } = headerThis;
  document.body.innerHTML = await renderToStringAsync(result, context);
  expect(screen.getByText(context.metadata.title)).to.exist;
  const entries = screen.getAllByRole("link") as HTMLAnchorElement[];
  expect(entries[1].href).toBe(collectionsAll[0].data.eleventyNavigation.url);
  expect(entries[2].ariaCurrent).toBeUndefined;
  expect(entries[2].href).toBe(collectionsAll[1].data.eleventyNavigation.url);
  expect(entries[2].getAttribute("aria-current")).toBe("page");
});
