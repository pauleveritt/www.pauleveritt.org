import { BaseLayout } from "../components/BaseLayout";
import { PostItem, PostList } from "../components/PostList";
import { PostsHeader } from "../components/PostsHeader";
import { PostsFooter } from "../components/PostsFooter";

export type IndexPageData = {
  description: string;
  content: string;
  title: string;
  collections: {
    posts: PostItem[];
  };
};

export default class IndexPage {
  data() {
    return {
      eleventyNavigation: {
        key: "Home",
        order: 1,
      },
    };
  }

  render(data: IndexPageData) {
    const { posts } = data.collections;

    return (
      <BaseLayout>
        <PostsHeader collection={posts} />
        <PostList postItems={posts} />
        <PostsFooter collectionCount={posts.length} />
      </BaseLayout>
    );
  }
}
