import { BaseLayout } from "../components/BaseLayout";
import { PostItem, PostList } from "../components/PostList";

export type BlogPageData = {
  collections: {
    posts: PostItem[];
  };
};

export default class BlogPage {
  data() {
    return {
      eleventyNavigation: {
        key: "Archive",
        order: 3,
      },
    };
  }

  render(data: BlogPageData) {
    const { posts } = data.collections;

    return (
      <BaseLayout>
        <h1>Archive</h1>
        <PostList postItems={posts} />
      </BaseLayout>
    );
  }
}
