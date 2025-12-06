import { getBlogBySlug } from "@/lib/blogs";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import CardStack from "@/components/blog/CardStack";
import Carousel3D from "@/components/blog/Carousel3D";
import NormalCarousel from "@/components/blog/NormalCarousel";

type Props = { params: Promise<{ slug: string }> | { slug: string } };

export default async function BlogPage({ params }: Props) {
  const resolvedParams = (await params) as { slug: string };
  const blog = await getBlogBySlug(resolvedParams.slug);
  if (!blog) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
          >
            RISE SPACE
          </Link>
          <Link href="/blog">
            <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Quay lại Blog
            </button>
          </Link>
        </div>
      </header>

      {/* Cover Image */}
      {blog.image && (
        <div className="w-full h-[60vh] overflow-hidden relative">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <article className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              {blog.date && (
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {blog.date}
                </span>
              )}
            </div>
            {blog.excerpt && (
              <p className="text-lg text-gray-700 mt-6 leading-relaxed">
                {blog.excerpt}
              </p>
            )}
            <div className="flex gap-2 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Chia sẻ
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-8 mb-20">
            {/* Carousel 1 - CardStack */}
            {blog.carousel1 && blog.carousel1.length > 0 && (
              <CardStack images={blog.carousel1} />
            )}

            {/* Content 1 */}
            {blog.content1 && (
              <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                {blog.content1}
              </div>
            )}

            {/* Carousel 2 - 3D Carousel */}
            {blog.carousel2 && blog.carousel2.length > 0 && (
              <Carousel3D images={blog.carousel2} />
            )}

            {/* Content 2 */}
            {blog.content2 && (
              <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                {blog.content2}
              </div>
            )}

            {/* Carousel 3 - Normal Carousel */}
            {blog.carousel3 && blog.carousel3.length > 0 && (
              <NormalCarousel images={blog.carousel3} />
            )}

            {/* Content 3 */}
            {blog.content3 && (
              <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                {blog.content3}
              </div>
            )}

            {/* Legacy content field for backward compatibility */}
            {blog.content && (
              <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                {blog.content}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="border-t pt-8 flex justify-between items-center">
            <Link href="/blog">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Xem tất cả bài viết
              </button>
            </Link>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Chia sẻ bài viết
            </button>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm opacity-80 mb-2">
            © 2025 Phoenix House <span className="text-red-600">❤</span>
          </p>
          <p className="text-sm mb-1">
            Fanpage:{" "}
            <a
              href="https://www.facebook.com/phoenixhousefptuhcmc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              The Flaming Chickens
            </a>
          </p>
          <p className="text-sm">
            Email:{" "}
            <a href="mailto:BaoCHG@fpt.edu.vn" className="underline">
              BaoCHG@fpt.edu.vn
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
