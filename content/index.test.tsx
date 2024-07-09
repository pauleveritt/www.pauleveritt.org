import { expect, test } from "vitest";

import IndexPage from "./index.11ty";
import { screen } from "@testing-library/dom";
import { renderToStringAsync } from "preact-render-to-string";
import { postItems } from "../components/PostList.test";

test("Index renders correctly", async () => {
  const context = {
    collections: {
      all: [...postItems, ...postItems],
    },
    eleventy: {
      generator: "9.9.9a1",
    },
    metadata: {
      language: "EN",
    },
    page: {
      url: "url",
    },
    shortcodes: {
      htmlBaseUrl: (url) => "url",
    },
    useBundle: (content) => [
      "",
      () => {
        return null;
      },
    ],
  };
  const data = { collections: { posts: [...postItems, ...postItems] } };
  const index = new IndexPage();
  const result = index.render.call(context, data);
  document.body.innerHTML = await renderToStringAsync(result, context);
  expect(screen.getByText("Latest 3 Posts")).toBeTruthy();
  expect(screen.getByTitle("More Posts").textContent).toEqual(
    "3 more posts can be found in the archive.",
  );
});