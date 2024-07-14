import { BaseLayout } from "../components/BaseLayout";
import { PostItem, PostList } from "../components/PostList";

function head(array: any[], n: number): any[] {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  if (n < 0) {
    return array.slice(n);
  }

  return array.slice(0, n);
}

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
    const numberOfLatestTilsToShow = 3;
    const { tils } = data.collections;
    const tilsCount = tils.length;
    const latestTilsCount = Math.min(tilsCount, numberOfLatestTilsToShow);

    const tilsList = head(tils, -numberOfLatestTilsToShow);
    const moreTils = tilsCount - numberOfLatestTilsToShow;
    return (
      <BaseLayout>
        <h1>
          Latest {latestTilsCount > 1 ? latestTilsCount : ""} "Today I Learned"
          Post
          {latestTilsCount > 1 ? "s" : ""}
        </h1>
        <PostList postItems={tilsList} />
        {moreTils > 0 && (
          <p title="More Posts">
            {moreTils} more post{moreTils > 1 ? "s" : ""} can be found in{" "}
            <a href="/blog/">the archive</a>.
          </p>
        )}
      </BaseLayout>
    );
  }
}
