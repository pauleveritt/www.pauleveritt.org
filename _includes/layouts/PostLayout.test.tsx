import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/dom";
import { jsxToString } from "jsx-async-runtime";
import PostLayout, { PostLayoutData } from "./PostLayout.11ty";

const posts = [
  {
    data: {
      title: "First",
      date: "2022-12-01",
      metadata: { title: "Site Title" },
      tags: [],
    },
    page: { url: "http://localhost:3000/one" },
    content: "",
  },
  {
    data: {
      title: "Second",
      date: "2022-12-01",
      metadata: { title: "Site Title" },
      tags: [],
    },
    page: { url: "http://localhost:3000/two" },
    content: "",
  },
  {
    data: {
      title: "Third",
      date: "2022-12-01",
      metadata: { title: "Site Title" },
      tags: [],
    },
    page: { url: "http://localhost:3000/third" },
    content: "",
  },
];
const css = vi.fn();
const setCss = vi.fn();
const slugify = vi.fn();
const getPreviousCollectionItem = () => posts[1];
const getNextCollectionItem = vi.fn();

const baseLayoutThis = {
  title: "This Post",
  page: {
    url: "http://localhost:3000/two",
  },
  collections: {
    all: [],
    posts: [],
  },
  eleventy: {
    generator: "9.9.9a1",
  },
  metadata: {
    description: "Site description",
    language: "en",
    title: "My Site",
  },
  getPreviousCollectionItem,
  getNextCollectionItem,
  slugify,
  css,
  useBundle: () => ["", setCss],
  eleventyNavigation: () => [
    { title: "Title 1", url: "http://localhost:3000/one" },
    { title: "Title 2", url: "http://localhost:3000/two" },
  ],
  htmlBaseUrl: () => "/some-url",
};

const postLayoutData: PostLayoutData = {
  collections: {
    posts,
  },
  content: "<p>This is <em>THE</em> body.</p>",
  date: "2022-12-01",
  tags: ["first", "second", "third", "fourth", "fifth"],
  title: "This Post",
  page: {
    url: "http://localhost:3000/two",
  },
};

test("Silence unused symbol complaints", async () => {
  expect(baseLayoutThis.htmlBaseUrl).toBeTruthy;
  expect(baseLayoutThis.css).toBeTruthy;
  expect(baseLayoutThis.useBundle).toBeTruthy;
});

test("BaseLayout for HTML string from Markdown body", async () => {
  const postLayout = new PostLayout();
  const result = postLayout.render.call(baseLayoutThis, postLayoutData);
  document.body.innerHTML = await jsxToString.call(baseLayoutThis, result);

  // Title should have data() in it
  const expected = `${postLayoutData.title} - ${baseLayoutThis.metadata.title}`;
  expect(document.title).toBe(expected);

  // setCSS got called
  expect(css).toHaveBeenCalledTimes(2);

  // The post date
  const time = screen.getByRole("time");
  expect(time.getAttribute("dateTime")).toEqual("2022-12-01");
  expect(time.textContent).toEqual("December 2022");

  // Slugify got called correctly
  expect(slugify).toHaveBeenCalledTimes(5);

  // Commas join tags
  const continuations = screen.getAllByText(",");
  expect(continuations).toHaveLength(4);
  expect(continuations[0].textContent).toEqual(", ");

  // Navigate between posts
  expect(screen.getByTitle("Posts Navigation").className).toBeTruthy;
});
