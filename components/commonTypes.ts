export type NavigationItem = {
  key: string;
  order: number;
  url: string;
};

export type CollectionItem = {
  content: string;
  data: {
    date: string;
    title: string;
    eleventyNavigation?: NavigationItem;
    metadata: {
      title: string;
    };
    tags: string[];
  };
  page: {
    url: string;
  };
};
