import { BaseLayout } from "../components/BaseLayout";
import { PostItem, PostList } from "../components/PostList";
import { PostsHeader } from "../components/PostsHeader";
import { PostsFooter } from "../components/PostsFooter";

export type TilPageData = {
  description: string;
  content: string;
  title: string;
  collections: {
    tils: PostItem[];
  };
};

export default class TilPage {
  data() {
    return {
      eleventyNavigation: {
        key: "TIL",
        order: 2,
      },
    };
  }

  render(data: TilPageData) {
    const { tils } = data.collections;

    return (
      <BaseLayout>
        <PostsHeader collection={tils} inSection={`"Today I Learned"`} />
        <PostList postItems={tils} />
        <PostsFooter collectionCount={tils.length} />
      </BaseLayout>
    );
  }
}
