import { DateTime } from "luxon";

export function readableDate(dateObj: Date, format: string, zone = "utc") {
  return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
    format || "dd LLLL yyyy",
  );
}

export type PostThis = {
  page: {
    url: string;
  };
};

export type PostProps = {
  title: string;
  url: string;
  date: string;
};

export function PostListItem(this: PostThis, { title, date, url }: PostProps) {
  const pageUrl = this.page.url;
  const liClass = url == pageUrl ? " postlist-item-active" : "";
  const thisDate = new Date(date);
  const dt = DateTime.fromJSDate(thisDate, { zone: "utc" }).toFormat(
    "yyyy-LL-dd",
  );
  const rd = readableDate(thisDate, "LLLL yyyy");
  return (
    <li class={`postlist-item${liClass}`}>
      <a href={url} class="postlist-link">
        {title ? title : <code>{url}</code>}
      </a>
      <time class="postlist-date" dateTime={dt}>
        {rd}
      </time>
    </li>
  );
}
