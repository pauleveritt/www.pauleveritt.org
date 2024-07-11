import { BaseLayout } from "../components/BaseLayout";
import { PostItem } from "../components/PostList";

export type TagPageData = {
  collections: {
    posts: PostItem[];
  };
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
        title: `Tagged “{{ tag }}”`,
      },
      // permalink: `permalink: /tags/{{ tag | slugify }}/`
    };
  }

  render(data: TagPageData) {
    const { posts } = data.collections;

    return (
      <BaseLayout {...data}>
        <h1>Tagged</h1>
      </BaseLayout>
    );
  }
}
