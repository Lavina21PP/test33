import ClientReviewList from "@/components/ReviewList";
import { prisma } from "@/lib/prisma";

// Use Next.js built-in types
interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params Promise
  const { id } = await params;
  
  const rawReviews = await prisma.review.findMany({
    orderBy: { comment: "desc" },
  });

  const reviews = rawReviews.map((e) => ({
    review_id: e.review_id,
    comment: e.comment ?? "", // fallback ถ้า null
    star: e.star ?? 0, // fallback ถ้า null
    createAt: e.createAt ? e.createAt.toISOString() : "", // แปลง Date -> string
  }));

  return (
    <>
      {/* ... รายละเอียดสินค้า ... */}
      <ClientReviewList reviews={reviews} />
    </>
  );
}