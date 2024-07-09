import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { Header, HeaderContext, HeaderProps } from "./Header";
import { renderToStringAsync } from "preact-render-to-string";

export const postItems = [
  {
    date: "2024",
    url: "http://localhost:3000/1",
    data: {
      page: {
        url: "http://localhost:3000/1",
      },
      title: "One",
      eleventyNavigation: {
        key: "Home",
        order: 1,
      },
    },
  },
  {
    date: "2022",
    url: "http://localhost:3000/2",
    data: {
      page: {
        url: "http://localhost:3000/2",
      },
      title: "Two",
      eleventyNavigation: {
        key: "Two",
        order: 2,
      },
    },
  },
  { date: "2023", url: "http://localhost:3000/3", data: { title: "Three" } },
];

test("render heading with default name", async () => {
  const context: HeaderContext = {
    context: {
      collections: {
        all: postItems,
      },
    },
  };

  const props: HeaderProps = {
    metadataTitle: "Some Site",
    pageURL: "http://localhost:3000/2",
  };
  const result = <Header {...props} />;
  document.body.innerHTML = await renderToStringAsync(result, context.context);
  expect(screen.getByText(props.metadataTitle)).to.exist;
  const entries = screen.getAllByRole("link") as HTMLAnchorElement[];
  expect(entries[1].href).toBe(postItems[0].url);
  expect(entries[2].ariaCurrent).toBeUndefined;
  expect(entries[2].href).toBe(postItems[1].url);
  expect(entries[2].getAttribute("aria-current")).toBe("page");
});
