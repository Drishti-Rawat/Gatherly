"use server";


import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import { handleError } from "../utils";

type CreateCategoryParams = {
  categoryName: string;
};

// create categories
export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

// fetch categories
export const FtechCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
