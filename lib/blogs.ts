import fs from "fs/promises";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");

export type BlogMeta = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  image?: string;
};

export type Blog = BlogMeta & {
  content?: string;
  carousel1?: string[];
  content1?: string;
  carousel2?: string[];
  content2?: string;
  carousel3?: string[];
  content3?: string;
};

export async function getBlogSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const file = path.join(BLOG_DIR, `${slug}.json`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    const parsed = JSON.parse(raw) as Blog;
    return parsed;
  } catch (err) {
    return null;
  }
}

export async function getAllBlogsMeta(): Promise<BlogMeta[]> {
  const slugs = await getBlogSlugs();
  const metas = await Promise.all(
    slugs.map(async (s) => {
      const b = await getBlogBySlug(s);
      return b
        ? {
            slug: b.slug,
            title: b.title,
            date: b.date,
            excerpt: b.excerpt,
            image: b.image,
          }
        : null;
    })
  );
  return metas.filter(Boolean) as BlogMeta[];
}

export async function getAllEvents() {
  const dir = path.join(process.cwd(), "content/blogs");
  const files = await fs.readdir(dir);
  const events = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const filePath = path.join(dir, file);
        const raw = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(raw);
        return {
          slug: data.slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          image: data.image,
        };
      })
  );
  return events;
}
