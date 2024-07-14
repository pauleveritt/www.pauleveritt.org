import { beforeAll, expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { EleventyPages, generateSite, getEleventyDoc } from "../src/helpers";

let siteResults: EleventyPages = {};

beforeAll(async () => {
  siteResults = await generateSite();
});

test("Site renders", async () => {
  await getEleventyDoc(siteResults, "/");
  expect(screen.getByText("Latest 2 Posts")).toBeTruthy();
  // TODO Bring this back when there are more than a few posts
  // expect(screen.getByTitle("More Posts").textContent).toEqual(
  //   "3 more posts can be found in the archive.",
  // );
});

test("Today I Learned template renders", async () => {
  await getEleventyDoc(siteResults, "/til/");
  expect(screen.getByText(`Latest Post in "Today I Learned"`)).toBeTruthy;
});

test("Tag template renders", async () => {
  await getEleventyDoc(siteResults, "/tags/");
  expect(screen.getByText("Tags")).toBeTruthy();
  expect(screen.getByText("first")).toBeTruthy;
});

test("Tag template renders", async () => {
  await getEleventyDoc(siteResults, "/tags/first/");
  expect(screen.getByText(`Tagged "first"`)).toBeTruthy();
  expect(screen.getByText(`Time to start blogging again`)).toBeTruthy();
  expect(screen.getByText(`all tags`)).toBeTruthy();
});

test("Blog template renders", async () => {
  await getEleventyDoc(siteResults, "/blog/");
  expect(screen.getAllByText("Archive").length).toEqual(2);
  expect(screen.getAllByText("Time to start blogging again")).toBeTruthy;
  expect(screen.getAllByText("July 2024")).toBeTruthy;
  expect(screen.getAllByText("Manage Numbering with CSS Counters")).toBeTruthy;
});
