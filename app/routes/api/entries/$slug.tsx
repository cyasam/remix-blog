import type { LoaderArgs } from '@remix-run/node';
import { getEntry } from '~/models/entries.server';

export async function loader({ params }: LoaderArgs) {
  return await getEntry(params.slug);
}
