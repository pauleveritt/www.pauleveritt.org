import { expect, test } from "vitest";
import Eleventy from "@11ty/eleventy/src/Eleventy";

test("Site renders", async () => {
  const elev = new Eleventy("./", "./_tests");
  const results = await elev.toJSON();
  expect(results).toBeTruthy;
});
