import { BaseLayout } from "../../components/BaseLayout";
import { readFileSync } from "fs";
import { DateTime } from "luxon";
import { readableDate } from "../../components/PostListItem";
import { CollectionItem } from "../../components/commonTypes";
import { TagList } from "../../components/TagList";

export type PostLayoutThis = {
  getPreviousCollectionItem: (posts: CollectionItem[]) => CollectionItem;
  getNextCollectionItem: (posts: CollectionItem[]) => CollectionItem;
  slugify: (url: string) => string;
  css: (content: string, bucket: string | null, url: string) => void;
};

export type PostLayoutData = {
  collections: {
    posts: CollectionItem[];
  };
  content: string;
  date: string;
  tags: string[];
  title: string;
  page: {
    url: string;
  };
};

export default class PostLayout {
  data() {
    return {
      // title: "Post XXX",
    };
  }

  render(this: PostLayoutThis, data: PostLayoutData) {
    const { collections, content, date, tags, title, page } = data;
    const okaidia = readFileSync(
      "node_modules/prismjs/themes/prism-okaidia.css",
      { encoding: "utf8", flag: "r" },
    );
    const diff = readFileSync("public/css/prism-diff.css", {
      encoding: "utf8",
      flag: "r",
    });
    this.css(okaidia, null, page.url);
    this.css(diff, null, page.url);

    const thisDate = new Date(date);
    const dt = DateTime.fromJSDate(thisDate, { zone: "utc" }).toFormat(
      "yyyy-LL-dd",
    );
    const rd = readableDate(thisDate, "LLLL yyyy");

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
          <TagList tags={tags} />
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
