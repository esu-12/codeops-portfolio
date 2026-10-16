// app/(components)/SideBar/SideBar.jsx
"use client";

import SearchBox from "../../(pages)/menu/SearchBox";
import CategoryBar from "../CategoryBar/CategoryBar";
import styles from "./SideBar.module.css";

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <SearchBox />
      <CategoryBar />
    </aside>
  );
}