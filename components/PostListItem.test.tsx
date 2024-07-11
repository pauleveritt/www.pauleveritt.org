import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { renderToStringAsync } from "preact-render-to-string";
import { PostListItem, PostContext, PostProps } from "./PostListItem";

const postContext: PostContext = {
  context: {
    page: {
      url: "/hello",
    },
  },
};

const props: PostProps = {
  title: "One",
  url: "/post1",
  date: "2022-12-01",
};

test("Post URL and URL are not equal so not active", async () => {
  const result = <PostListItem {...props} />;
  document.body.innerHTML = await renderToStringAsync(
    result,
    postContext.context,
  );
  const li = screen.getByRole("listitem");
  expect(li.className).toEqual("postlist-item");
});

test("Post URL equals URL active", async () => {
  const thisContext = { ...postContext };
  thisContext.context.page.url = props.url;
  const result = <PostListItem {...props} />;
  document.body.innerHTML = await renderToStringAsync(
    result,
    thisContext.context,
  );
  const li = screen.getByRole("listitem");
  expect(li.className).toEqual("postlist-item postlist-item-active");
});

test("HTML and eadable date format", async () => {
  const result = <PostListItem {...props} />;
  document.body.innerHTML = await renderToStringAsync(
    result,
    postContext.context,
  );
  const time = screen.getByRole("time");
  expect(time.getAttribute("dateTime")).toEqual("2022-12-01");
  expect(time.textContent).toEqual("December 2022");
});

test("Link text has title when provided", async () => {
  const result = <PostListItem {...props} />;
  document.body.innerHTML = await renderToStringAsync(
    result,
    postContext.context,
  );
  expect(screen.getByRole("link").textContent).toEqual("One");
});

test("Link text has code url when title not provided", async () => {
  const theseProps = { ...props };
  delete theseProps["title"];
  const result = <PostListItem {...theseProps} />;
  document.body.innerHTML = await renderToStringAsync(
    result,
    postContext.context,
  );
  expect(screen.getByRole("link").textContent).toEqual(props.url);
});
