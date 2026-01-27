import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, unique: true, trim: true, required: true },
    categoryImg: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);
const CategoryModel = mongoose.model("categories", CategorySchema);
export default CategoryModel;
