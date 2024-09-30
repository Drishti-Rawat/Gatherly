"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({placeholder="Search title..."}) => {
  const [query, setquery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const delaydebounceFn = setTimeout(() => {
        let newUrl;
      if (query) {
         newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
         newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl,{scroll:false});
    }, 300);

    return () => clearTimeout(delaydebounceFn);
  }, [query,searchParams,router]);
  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        onChange={(e) => setquery(e.target.value)}
        placeholder={placeholder}
        className=" border-0 p-regular-16 outline-offset-0 placeholder:text-gray-500 focus-visible:ring-0 focus:border-0 focus-visible:ring-offset-0  bg-gray-50"
      />
    </div>
  );
};

export default Search;
