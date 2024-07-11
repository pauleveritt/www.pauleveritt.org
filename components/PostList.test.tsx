import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/dom";
import { PostItem, PostList, PostListProps, PostListThis } from "./PostList";
import { PostThis } from "./PostListItem";
import { jsxToString } from "jsx-async-runtime";

const useCss = vi.fn();

const postListThis: PostListThis & PostThis = {
  page: {
    url: "/hello",
  },
  useBundle: () => ["", useCss],
};

export const postItems: PostItem[] = [
  { data: { date: "2024", title: "One" }, page: { url: "/1" } },
  { data: { date: "2022", title: "Two" }, page: { url: "/2" } },
  { data: { date: "2023", title: "Three" }, page: { url: "/3" } },
];

const props: PostListProps = {
  postItems: postItems,
};

test("render postlist with no counter", async () => {
  const result = <PostList {...props} />;
  document.body.innerHTML = await jsxToString.call(postListThis, result);
  expect(screen.getByRole("list")).toBeTruthy();
  expect(useCss).toHaveBeenCalledWith(
    ".postlist { counter-reset: start-from 4 }",
  );
});

test("render postlist with a counter", async () => {
  const newProps = { counter: 100, ...props };
  const result = <PostList {...newProps} />;
  document.body.innerHTML = await jsxToString.call(postListThis, result);
  expect(useCss).toHaveBeenCalledWith(
    ".postlist { counter-reset: start-from 100 }",
  );
});

test("Reverse sort means last first", async () => {
  const result = <PostList {...props} />;
  document.body.innerHTML = await jsxToString.call(postListThis, result);
  expect(screen.getAllByRole("link")[0].textContent).toEqual("Three");
});
