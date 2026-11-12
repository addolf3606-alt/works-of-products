import { productsData } from "@/data/products";
import ProductSlider from "@/components/ProductSlider";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const items = productsData[category] || [];

  return (
    <PageTransition className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors py-1 px-3 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
        >
          ← Back to Main Page
        </Link>
        <h1 className="text-3xl font-bold capitalize mt-3 text-purple-400 tracking-tight">
          {category} 
        </h1>
      </div>

      {items.length > 0 ? (
        <ProductSlider items={items} />
      ) : (
        <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-500">
          No products found for this category.
        </div>
      )}
    </PageTransition>
  );
}