import { expect, test } from "vitest";
import BlogPage from "./blog.11ty";

import { context } from "./index.test";
import { postItems } from "../components/PostList.test";
import { renderToStringAsync } from "preact-render-to-string";
import { screen } from "@testing-library/dom";

test("Blog renders correctly", async () => {
  const blogPage = new BlogPage();
  const data = { collections: { posts: [...postItems, ...postItems] } };
  const result = blogPage.render.call(context, data);
  document.body.innerHTML = await renderToStringAsync(result, context);
  expect(screen.getByText("Archive")).toBeTruthy();
  expect(screen.getAllByText("One")).toHaveLength(2);
});
