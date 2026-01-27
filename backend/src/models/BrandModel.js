import mongoose from "mongoose";
const BrandSchema = new mongoose.Schema(
  {
    brandName: { type: String, trim: true, required: true },
    brandImg: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const BrandModel = mongoose.model("brands", BrandSchema);
export default BrandModel;
