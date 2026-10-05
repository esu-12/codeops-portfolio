// app/(components)/CategoryBar/CategoryBar.js

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import "./CategoryBar.css";

export default function CategoryBar() {

  const searchParams = useSearchParams();

  const selectedCategory =
    searchParams.get("category") || "All";


  const categories = [
    "All",
    "Traditional Stews & Wat",
    "Tibs & Grills",
    "Raw & Cured Delicacies / Kitfo",
    "Fasting & Vegan / Tsom",
    "Beverages & Tej",
  ];


  return (
    <aside className="category-sidebar">

      <h2>
        Categories
      </h2>


      <nav className="category-nav">

        {categories.map((category) => {

          const href =
            category === "All"
              ? "/menu"
              : `/menu?category=${encodeURIComponent(
                  category
                )}`;


          const isActive =
            selectedCategory === category;


          return (
            <Link
              key={category}
              href={href}
              className={
                isActive
                  ? "category-button active"
                  : "category-button"
              }
            >
              {category}
            </Link>
          );

        })}

      </nav>

    </aside>
  );
}