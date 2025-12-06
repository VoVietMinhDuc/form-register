import { getBlogBySlug } from "@/lib/blogs";
import BlogClient from "./BlogClient";

export default async function Page() {
  const blog = await getBlogBySlug("rise-space-season-01");

  if (!blog) {
    return (
      <main className="flex items-center justify-center min-h-screen text-white">
        Không tìm thấy bài viết.
      </main>
    );
  }

  return <BlogClient blog={blog} />;
}
