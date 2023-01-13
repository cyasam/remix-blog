import type { User } from './user.server';

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: User;
};

export async function getEntries(): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.CMSURL}/spaces/${process.env.SPACEID}/environments/${process.env.ENVIRONMENTID}/entries?select=sys.id,fields.pageTitle,fields.shareImages&access_token=${process.env.TOKEN}&content_type=componentSeo`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return null;
  }
}
