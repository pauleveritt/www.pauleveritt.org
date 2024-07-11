import Eleventy from "@11ty/eleventy/src/Eleventy";
import { Window } from "happy-dom";

export async function getEleventyDoc(url: string) {
  /* Do an Eleventy run, get the url, and load string into document. */
  const elev = new Eleventy("./", "./_tests");
  const results = await elev.toJSON();
  const result = results.find((e: { url: string }) => e.url === url);
  if (!result) {
    throw new Error(`No URL found at "${url}"`);
  }
  const { content } = result;

  // Parse this to get the head and body
  const window = new Window();
  const domParser = new window.DOMParser();
  const newDocument = domParser.parseFromString(content, "text/html");

  document.head.innerHTML = newDocument.head.innerHTML;
  document.body.innerHTML = newDocument.body.innerHTML;
}
