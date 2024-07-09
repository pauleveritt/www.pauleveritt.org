import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/dom";
import { renderToStringAsync } from "preact-render-to-string";
import { PostList, PostListProps } from "./PostList";

const useCss = vi.fn();

const thisContext = {
  useBundle: (content: string) => ["", useCss],
};

export const postItems = [
  { date: "2024", url: "/1", data: { title: "One" } },
  { date: "2022", url: "/2", data: { title: "Two" } },
  { date: "2023", url: "/3", data: { title: "Three" } },
];

const props: PostListProps = {
  postItems: postItems,
};

test("render postlist with no counter", async () => {
  const result = <PostList {...props} />;
  document.body.innerHTML = await renderToStringAsync(result, thisContext);
  expect(screen.getByRole("list")).toBeTruthy();
  expect(useCss).toHaveBeenCalledWith(
    ".postlist { counter-reset: start-from 4 }",
  );
});

test("render postlist with a counter", async () => {
  const newProps = { counter: 100, ...props };
  const result = <PostList {...newProps} />;
  document.body.innerHTML = await renderToStringAsync(result, thisContext);
  expect(useCss).toHaveBeenCalledWith(
    ".postlist { counter-reset: start-from 100 }",
  );
});

test("Reverse sort means last first", async () => {
  const result = <PostList {...props} />;
  document.body.innerHTML = await renderToStringAsync(result, thisContext);
  expect(screen.getAllByRole("link")[0].textContent).toEqual("Three");
});
