export async function getPosts(): Promise<any> {
  try {
    const response = await fetch(`${process.env.URL}/api/entries`);
    const {
      items,
      includes: { Entry: entries, Asset: assets },
    } = await response.json();

    return { items, entries, assets };
  } catch (err) {
    return null;
  }
}

export async function getPost(slug?: string): Promise<any> {
  try {
    const response = await fetch(`${process.env.URL}/api/entries/${slug}`);
    const {
      items,
      includes: { Entry: entries, Asset: assets },
    } = await response.json();

    return { item: items[0], entries, assets };
  } catch (err) {
    return null;
  }
}
