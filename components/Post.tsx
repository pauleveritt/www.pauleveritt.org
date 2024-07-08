import { DateTime } from "luxon";

export function readdableDate(dateObj, format, zone = "utc") {
  return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
    format || "dd LLLL yyyy",
  );
}

export type PostProps = {
  title: string;
  postUrl: string;
  postDate: string;
  url: string;
};

export function Post({ title, postDate, postUrl, url }: PostProps) {
  const liClass = postUrl == url ? " postlist-item-active" : "";
  const thisDate = new Date(postDate);
  const dt = DateTime.fromJSDate(thisDate, { zone: "utc" }).toFormat(
    "yyyy-LL-dd",
  );
  const rd = readdableDate(thisDate, "LLLL yyyy");
  return (
    <li class={liClass}>
      <a href={postUrl} class="postlist-link">
        {title ? title : <code>{postUrl}</code>}
      </a>
      <time class="postlist-date" dateTime={dt}>
        {rd}
      </time>
    </li>
  );
}
