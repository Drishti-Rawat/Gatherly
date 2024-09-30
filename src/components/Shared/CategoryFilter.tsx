"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { FtechCategories } from '@/lib/actions/Category.action'
import { ICategory } from '@/lib/database/models/category.model';
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
  

const CategoryFilter =() => {
    const [Categories, setCategories] = useState<ICategory[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(()=>{
        const getCategories = async () => {
            const categoryList = await FtechCategories();
            categoryList && setCategories(categoryList as ICategory[]);
        }
        getCategories();
    },[])


      const onSelectCategory = (category:string) => {
        let newUrl;
        if(category && category !== "All"){
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "category",
                value: category
            })
            
        }
        else{
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ["category"]
            })
        }
        router.push(newUrl,{scroll:false});
      }
  return (
    <Select onValueChange={(value:string) => onSelectCategory(value)}>
    <SelectTrigger className="select-field">
      <SelectValue placeholder="Category" />
    </SelectTrigger>
    <SelectContent>
    <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
        {
          Categories?.map((category:ICategory) => (
            <SelectItem key={category._id} value={category.name} className='p-regular-14 select-item'>{category.name}</SelectItem>
          ))
        }
     
    </SelectContent>
  </Select>
  
  )
}

export default CategoryFilter
