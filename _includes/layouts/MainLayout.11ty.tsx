/*


The main layout used when no specialization is required. A 
simple call to BaseLayout which captures the layout vs. 
Preact context split.

 */
import { BaseLayout } from "../../components/BaseLayout";

export type MainLayoutProps = {
  children?: JSX.Children;
  content?: string;
};

export function MainLayout({ children, content }: MainLayoutProps) {
  return <BaseLayout content={content}>{children}</BaseLayout>;
}

export const render = MainLayout;
