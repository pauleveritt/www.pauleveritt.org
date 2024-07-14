import { expect, test } from "vitest";
import { generateSite, getEleventyDoc } from "./helpers";

test("Generates an 11ty site", async () => {
  const results = generateSite();
  expect(results["/"]).toBeTruthy;
});

test("Gets a document", async () => {
  const results = await generateSite();
  await getEleventyDoc(results, "/");
  expect(document.body.outerHTML).toContain("<body");
});
