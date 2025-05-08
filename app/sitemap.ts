export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default async function sitemap() {
  const baseUrl = "https://www.pixvill.com";

  const res = await fetch("https://www.pixvill.com/api/images?params=punjabi");

  const result = await res.json();

  const uniqueEntries: any[] = [];

  result.forEach((img: any) => {
    const imageEntry = {
      url: `${baseUrl}/${img.imageName}`,
      lastModified: new Date(),
    };

    const categoryEntry = {
      url: `${baseUrl}/${img.imageCategory}`,
      lastModified: new Date(),
    };

    if (!uniqueEntries.some((entry) => entry.url === imageEntry.url)) {
      uniqueEntries.push(imageEntry);
    }

    if (!uniqueEntries.some((entry) => entry.url === categoryEntry.url)) {
      uniqueEntries.push(categoryEntry);
    }
  }) ?? [];

  const sitemapEntries = [
    ...uniqueEntries,
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  return sitemapEntries;
}
