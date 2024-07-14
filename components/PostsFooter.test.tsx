import { expect, test } from "vitest";
import { PostsFooter, PostsFooterProps } from "./PostsFooter";
import { jsxToString } from "jsx-async-runtime";
import { screen } from "@testing-library/dom";

test("Renders PostsFooter component", async () => {
  const props: PostsFooterProps = {
    collectionCount: 20,
  };
  const component = <PostsFooter {...props} />;
  const result = await jsxToString(component);
  expect(result).toBeTruthy;
  document.body.innerHTML = result;
  const footer = screen.getByTitle("More Posts").textContent.trim();
  expect(footer).toEqual("10 more posts can be found in the archive.");
});

test("No footer if not enough posts", async () => {
  const props: PostsFooterProps = {
    collectionCount: 9,
  };
  const component = <PostsFooter {...props} />;
  const result = await jsxToString(component);
  expect(result).toBeFalsy;
});
