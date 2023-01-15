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
    const data = await response.json();

    if (data.items.length === 0) {
      return null;
    }

    const {
      items,
      includes: { Entry: entries, Asset: assets },
    } = data;

    return { item: items[0], entries, assets };
  } catch (err) {
    return null;
  }
}
