import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { watches, getWatchBySlug, getRelatedWatches } from "@/lib/data";
import ProductPageClient from "./ProductPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return watches.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const watch = getWatchBySlug(slug);
  if (!watch) return { title: "Timepiece Not Found" };

  return {
    title: `${watch.name} — ${watch.reference}`,
    description: watch.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const watch = getWatchBySlug(slug);
  if (!watch) notFound();

  const related = getRelatedWatches(watch.relatedIds);

  return <ProductPageClient watch={watch} related={related} />;
}
