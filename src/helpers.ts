import Eleventy from "@11ty/eleventy/src/Eleventy";
import { Window } from "happy-dom";

type EleventyResult = {
  url: string;
  content: string;
};

export type EleventyPages = {
  [key: string]: string;
};

export async function generateSite(): Promise<EleventyPages> {
  const elev = new Eleventy("./", "./_tests");
  const results = await elev.toJSON();
  return Object.fromEntries(
    results.map((result: EleventyResult) => [result.url, result.content]),
  );
}

export async function getEleventyDoc(results: EleventyPages, url: string) {
  /* Do an Eleventy run, get the url, and load string into document. */
  const content = results[url];
  if (!content) {
    throw new Error(`No URL found at "${url}"`);
  }

  // Parse this to get the head and body
  const window = new Window();
  const domParser = new window.DOMParser();
  const newDocument = domParser.parseFromString(content, "text/html");

  document.head.innerHTML = newDocument.head.innerHTML;
  document.body.innerHTML = newDocument.body.innerHTML;
}
