import { BaseLayout } from "../components/BaseLayout";
import { PostItem, PostList } from "../components/PostList";

export type TagPageData = {
  collections: any;
  tag: string;
};

export default class Tag {
  data() {
    return {
      pagination: {
        data: "collections",
        size: 1,
        alias: "tag",
        filter: ["all", "post", "posts", "tagList"],
        addAllPagesToCollections: true,
      },
      eleventyComputed: {
        title: (data: TagPageData) => `Tagged “${data.tag}”`,
        permalink: (data: TagPageData) => {
          return `/tags/${data.tag}/`;
        },
      },
    };
  }

  render({ collections, tag }: TagPageData) {
    const tagged = collections[tag];
    return (
      <BaseLayout>
        <h1>Tagged "{tag}"</h1>
        <PostList postItems={tagged} />
        <p>
          See <a href="/tags/">all tags</a>.
        </p>
      </BaseLayout>
    );
  }
}
