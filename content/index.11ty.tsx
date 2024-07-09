import { BaseLayout } from "../components/BaseLayout";
import { JSXInternal } from "preact/src/jsx";
import { PostList } from "../components/PostList";

function head(array: any[], n: number): any[] {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  if (n < 0) {
    return array.slice(n);
  }

  return array.slice(0, n);
}

export type IndexPageContext = {};

export type IndexPageData = {
  description: string;
  content: string;
  title: string;
  collections: {
    posts: any[];
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

  render(this: IndexPageContext, data: IndexPageData): JSXInternal.Element {
    const numberOfLatestPostsToShow = 3;
    const { posts } = data.collections;
    const postsCount = posts.length;
    const latestPostsCount = Math.min(postsCount, numberOfLatestPostsToShow);

    const postsList = head(posts, -numberOfLatestPostsToShow);
    const morePosts = postsCount - numberOfLatestPostsToShow;
    return (
      <BaseLayout {...data}>
        <h1>
          Latest {latestPostsCount} Post{latestPostsCount > 1 ? "s" : ""}
        </h1>
        <PostList postItems={postsList} />
        {morePosts > 0 && (
          <p title="More Posts">
            {morePosts} more post{morePosts > 1 ? "s" : ""} can be found in{" "}
            <a href="/blog/">the archive</a>.
          </p>
        )}
      </BaseLayout>
    );
  }
}
