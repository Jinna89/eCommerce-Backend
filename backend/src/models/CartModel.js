import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      tequired: true,
    },
    color: { type: String, required: true },
    qty: { type: String, required: true },
    size: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const CartModel = mongoose.model("carts", CartSchema);
export default CartModel;
