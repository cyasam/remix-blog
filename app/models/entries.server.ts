export async function getEntries(): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.CMSURL}/spaces/${process.env.SPACEID}/environments/${process.env.ENVIRONMENTID}/entries?select=sys.id,fields&access_token=${process.env.TOKEN}&content_type=pageBlogPost&include=10`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return null;
  }
}

export async function getEntry(slug?: string): Promise<any> {
  try {
    if (!slug) {
      return null;
    }

    const response = await fetch(
      `${process.env.CMSURL}/spaces/${process.env.SPACEID}/environments/${process.env.ENVIRONMENTID}/entries?fields.slug=${slug}&select=sys.id,fields&access_token=${process.env.TOKEN}&content_type=pageBlogPost&include=10`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return null;
  }
}
