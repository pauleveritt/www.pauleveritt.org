import { MainLayout } from "../_includes/layouts/MainLayout.11ty";

export function Index2(data: any) {
  return (
    <MainLayout {...data}>
      <h1>Hello</h1>
    </MainLayout>
  );
}

export const render = Index2;
