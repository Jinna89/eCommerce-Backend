import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  shortDes: { type: String, required: true },
  price: { type: String, required: true },
  discount: { type: Boolean, required: true },
  discountPrice: { type: String, required: true },
  image: { type: String, required: true },
  star: { type: String, required: true },
  stock: { type: Boolean, required: true },
  remark: { type: String, required: true },
  brandID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
export default ProductModel;
