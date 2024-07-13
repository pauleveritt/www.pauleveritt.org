import { BaseLayout } from "../../components/BaseLayout";
import { readFileSync } from "fs";
import { DateTime } from "luxon";
import { readableDate } from "../../components/PostListItem";
import { CollectionItem } from "../../components/commonTypes";

function filterTagList(tags: string[]) {
  return (tags || []).filter(
    (tag: string) => ["all", "nav", "post", "posts"].indexOf(tag) === -1,
  );
}

export type PostLayoutThis = {
  getPreviousCollectionItem: (posts: CollectionItem[]) => CollectionItem;
  getNextCollectionItem: (posts: CollectionItem[]) => CollectionItem;
  slugify: (url: string) => string;
  css: (content: string) => void;
};

export type PostLayoutData = {
  collections: {
    posts: CollectionItem[];
  };
  content: string;
  date: string;
  tags: string[];
  title: string;
};

export default class PostLayout {
  data() {
    return {
      title: "Post XXX",
    };
  }

  render(this: PostLayoutThis, data: PostLayoutData) {
    const { collections, content, date, tags, title } = data;
    const okaidia = readFileSync(
      "node_modules/prismjs/themes/prism-okaidia.css",
      { encoding: "utf8", flag: "r" },
    );
    const diff = readFileSync("public/css/prism-diff.css", {
      encoding: "utf8",
      flag: "r",
    });
    this.css(okaidia);
    this.css(diff);

    const thisDate = new Date(date);
    const dt = DateTime.fromJSDate(thisDate, { zone: "utc" }).toFormat(
      "yyyy-LL-dd",
    );
    const rd = readableDate(thisDate, "LLLL yyyy");
    const numberOfTags = tags.length - 1;

    const { posts } = collections;
    const previousPost = this.getPreviousCollectionItem.call(data, posts);
    const nextPost = this.getNextCollectionItem.call(data, posts);

    return (
      <BaseLayout>
        <h1>{title}</h1>
        <ul class="post-metadata">
          <li>
            <time dateTime={dt}>{rd}</time>
          </li>
          {filterTagList(tags).map((tag, index) => {
            const tagUrl = this.slugify(`/tags/${tag}/`);
            return (
              <li>
                <a href={tagUrl} class="post-tag">
                  {tag}
                </a>
                {index < numberOfTags - 1 && (
                  <span title="Continuation">, </span>
                )}
              </li>
            );
          })}
        </ul>
        {content}
        {(nextPost || previousPost) && (
          <ul class="links-nextprev" title="Posts Navigation">
            {previousPost && (
              <li>
                Previous:{" "}
                <a href={previousPost.page.url}>{previousPost.data.title}</a>
              </li>
            )}
            {nextPost && (
              <li>
                Next: <a href={nextPost.page.url}>{nextPost.data.title}</a>
              </li>
            )}
          </ul>
        )}
      </BaseLayout>
    );
  }
}
