import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { ICategory } from "@/lib/database/models/category.model";
import { Input } from "../ui/input";
import { createCategory, FtechCategories } from "@/lib/actions/Category.action";

type DropdownProps = {
  onChangeHandler: () => void;
  value?: string;
};

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([
    {
      _id: "1",
      name: "cat 1",
    },
    {
      _id: "2",
      name: "cat 2",
    },
  ]);

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim()
    }).then((category)=>{setCategories((prevState)=>[...prevState,category])})
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryList = await FtechCategories();
      categoryList && setCategories(categoryList as ICategory[]);
      console.log(categoryList);
    };
    fetchCategories();
  },[newCategory]);
  
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" className="" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item"
            >
              {category.name}
            </SelectItem>
          ))}

<AlertDialog>
  <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add New Category</AlertDialogTrigger>
  <AlertDialogContent className="bg-white rounded-2xl">
    <AlertDialogHeader>
      <AlertDialogTitle>New Category</AlertDialogTitle>
      <AlertDialogDescription>
       <Input type="text" placeholder="Category Name" className="input-field mt-3 " onChange={(e)=>setNewCategory(e.target.value)}/>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>startTransition(()=>handleAddCategory())}>Add</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

      </SelectContent>
    </Select>
  );
};

export default Dropdown;
