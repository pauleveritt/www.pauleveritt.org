import { expect, test } from "vitest";
import { PostsHeader, PostsHeaderProps } from "./PostsHeader";
import { postItems } from "./PostList.test";
import { jsxToString } from "jsx-async-runtime";
import { screen } from "@testing-library/dom";

test("Defaults as plural", async () => {
  const props: PostsHeaderProps = {
    collection: postItems,
  };
  const component = <PostsHeader {...props} />;
  document.body.innerHTML = await jsxToString(component);
  const heading = screen.getByRole("heading").textContent.trim();
  expect(heading).toEqual("Latest 3 Posts");
});

test("Defaults as singular", async () => {
  const props: PostsHeaderProps = {
    collection: [postItems[0]],
  };
  const component = <PostsHeader {...props} />;
  document.body.innerHTML = await jsxToString(component);
  const heading = screen.getByRole("heading").textContent.trim();
  expect(heading).toEqual("Latest Post");
});

test("In Section", async () => {
  const props: PostsHeaderProps = {
    collection: postItems,
    inSection: `"Today I Learned"`,
  };
  const component = <PostsHeader {...props} />;
  document.body.innerHTML = await jsxToString(component);
  const heading = screen.getByRole("heading").textContent.trim();
  expect(heading).toEqual(`Latest 3 Posts in "Today I Learned"`);
});
