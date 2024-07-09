import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/dom";
import { renderToStringAsync } from "preact-render-to-string";
import { Post, PostProps } from "./Post";

const useCss = vi.fn();

const thisContext = {
  useBundle: (content: string) => ["", useCss],
};

const props: PostProps = {
  title: "One",
  postUrl: "/post1",
  url: "/1",
  postDate: "2022-12-01",
};

test("Post URL and URL are not equal so not active", async () => {
  const result = <Post {...props} />;
  document.body.innerHTML = await renderToStringAsync(result);
  const li = screen.getByRole("listitem");
  expect(li.className).toEqual("postlist-item");
});

test("Post URL equals URL active", async () => {
  const theseProps = { ...props, url: "/post1" };
  const result = <Post {...theseProps} />;
  document.body.innerHTML = await renderToStringAsync(result);
  const li = screen.getByRole("listitem");
  expect(li.className).toEqual("postlist-item postlist-item-active");
});

test("HTML and eadable date format", async () => {
  const result = <Post {...props} />;
  document.body.innerHTML = await renderToStringAsync(result);
  const time = screen.getByRole("time");
  expect(time.getAttribute("dateTime")).toEqual("2022-12-01");
  expect(time.textContent).toEqual("December 2022");
});

test("Link text has title when provided", async () => {
  const result = <Post {...props} />;
  document.body.innerHTML = await renderToStringAsync(result);
  expect(screen.getByRole("link").textContent).toEqual("One");
});

test("Link text has code url when title not provided", async () => {
  const theseProps = { ...props };
  delete theseProps["title"];
  const result = <Post {...theseProps} />;
  document.body.innerHTML = await renderToStringAsync(result);
  expect(screen.getByRole("link").textContent).toEqual(props.postUrl);
});
