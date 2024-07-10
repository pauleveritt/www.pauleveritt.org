/*


The main layout used when no specialization is required. A 
simple call to BaseLayout which captures the layout vs. 
Preact context split.

 */
import { BaseLayout } from "../../components/BaseLayout";

export function MainLayout(data: any) {
  return (
    <BaseLayout {...data}>
      <h1>Hello</h1>
    </BaseLayout>
  );
}

export const render = MainLayout;
