import { expect, test } from "vitest";
import Eleventy from "@11ty/eleventy/src/Eleventy";
import { screen } from "@testing-library/dom";

test("Site renders", async () => {
  const elev = new Eleventy("./", "./_tests");
  const results = await elev.toJSON();
  const result = results.find((e) => e.url === "/blog/");

  document.body.innerHTML = result.content;
  expect(screen.getByRole("contentinfo")).toBeTruthy();
});
