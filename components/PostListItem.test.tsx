import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { PostListItem, PostProps, PostThis } from "./PostListItem";
import { jsxToString } from "jsx-async-runtime";

const postContext: PostThis = {
  page: {
    url: "/hello",
  },
};

const props: PostProps = {
  title: "One",
  url: "/post1",
  date: "2022-12-01",
};

test("Post URL and URL are not equal so not active", async () => {
  const result = <PostListItem {...props} />;
  document.body.innerHTML = await jsxToString.call(postContext, result);
  const li = screen.getByRole("listitem");
  expect(li.className).toEqual("postlist-item");
});

test("Post URL equals URL active", async () => {
  const thisContext = { ...postContext };
  thisContext.page.url = props.url;
  const result = <PostListItem {...props} />;
  document.body.innerHTML = await jsxToString.call(postContext, result);
  const li = screen.getByRole("listitem");
  expect(li.className).toEqual("postlist-item postlist-item-active");
});

test("HTML and readable date format", async () => {
  const result = <PostListItem {...props} />;
  document.body.innerHTML = await jsxToString.call(postContext, result);
  const time = screen.getByRole("time");
  expect(time.getAttribute("dateTime")).toEqual("2022-12-01");
  expect(time.textContent).toEqual("December 2022");
});

test("Link text has title when provided", async () => {
  const result = <PostListItem {...props} />;
  document.body.innerHTML = await jsxToString.call(postContext, result);
  expect(screen.getByRole("link").textContent).toEqual("One");
});

test("Link text has code url when title not provided", async () => {
  const theseProps = { ...props };
  delete theseProps["title"];
  const result = <PostListItem {...theseProps} />;
  document.body.innerHTML = await jsxToString.call(postContext, result);
  expect(screen.getByRole("link").textContent).toEqual(props.url);
});
