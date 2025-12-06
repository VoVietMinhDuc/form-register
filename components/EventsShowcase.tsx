"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllEvents } from "@/lib/blogs";

const events = [
  {
    slug: "kick-off-brothers-and-sisters-2025",
    title: "Kick Off Brothers & Sisters 2025",
    date: "15 tháng 3, 2025",
    excerpt: "Một buổi workshop thú vị với hơn 200 người tham gia.",
    image: "/phoenix1.jpg",
  },
  {
    slug: "phoenix-house-kick-off-2025",
    title: "Phoenix House Kick Off 2025",
    date: "2024-01-10",
    excerpt: "Một buổi ra mắt các thành viên trong nhà Phoenix",
    image: "/kick-off-phoenix/house2.jpg",
  },
];

const EventsShowcase = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Sự Kiện Của <span className="text-orange-600">Chúng Tôi</span>
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Những khoảnh khắc đáng nhớ và câu chuyện truyền cảm hứng từ các sự
            kiện chúng tôi đã tổ chức
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/${event.slug}`} className="block">
                <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={event.image || "/phoenix1.jpg"}
                      alt={event.title}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      >
                        Event
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-white">
                    <p className="text-sm text-orange-600 font-semibold mb-2">
                      {event.date || "Coming soon"}
                    </p>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {event.excerpt || ""}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsShowcase;
