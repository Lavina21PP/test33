"use client";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/search";
import Footer from "@/components/footer";
import React from "react";

function page() {
  const handleSearch = (data: string) => {
    console.log("Search for:", data);
    // คุณสามารถ fetch หรือ filter รายการต่าง ๆ ที่นี่ได้
  };
  return (
    <div className="dd">
      <Navbar />
      <div className="d container1">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
}

export default page;
