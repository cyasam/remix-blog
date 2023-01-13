import { getEntries } from '~/models/entries.server';

export async function loader() {
  return await getEntries();
}
