import mongoose from "mongoose";
import CartModel from "../models/CartModel.js";
import ProfileModel from "../models/ProfileModel.js";
import InvoiceModel from "../models/InvoiceModel.js";
import InvoiceProductModel from "../models/InvoiceProductModel.js";
import PaymentSettingModel from "../models/PaymentSettingModel.js";
import FormData from "form-data";
import axios from "axios";

const ObjectId = mongoose.Types.ObjectId;

/* ===============================
   CREATE INVOICE
================================ */
export const CreateInvoiceService = async (req) => {
  try {
    const userId = new ObjectId(req.headers.user_id);
    const cusEmail = req.headers.email;

    /* ===== STEP 1: Cart Products ===== */
    const cartProducts = await CartModel.aggregate([
      { $match: { userID: userId } },
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);

    if (cartProducts.length === 0) {
      return { status: "fail", message: "Cart is empty" };
    }

    /* ===== STEP 2: Price Calculation ===== */
    let total = 0;

    cartProducts.forEach((item) => {
      const price = item.product.discount
        ? Number(item.product.discountPrice)
        : Number(item.product.price);

      total += price * Number(item.qty);
    });

    const vat = total * 0.05;
    const payable = total + vat;

    /* ===== STEP 3: Profile ===== */
    const profile = await ProfileModel.findOne({ userID: userId });
    if (!profile) {
      return { status: "fail", message: "Profile not found" };
    }

    const cus_details = `Name:${profile.cus_name}, Email:${cusEmail}, Address:${profile.cus_add}, Phone:${profile.cus_phone}`;
    const ship_details = `Name:${profile.ship_name}, City:${profile.ship_city}, Address:${profile.ship_add}, Phone:${profile.ship_phone}`;

    /* ===== STEP 4: Invoice ===== */
    const tran_id = Math.floor(10000000 + Math.random() * 90000000);

    const invoice = await InvoiceModel.create({
      userID: userId,
      total,
      vat,
      payable,
      cus_details,
      ship_details,
      tran_id,
      val_id: 0,
      payment_status: "pending",
      delivery_status: "pending",
    });

    /* ===== STEP 5: Invoice Products ===== */
    const invoiceProducts = cartProducts.map((item) => {
      const price = item.product.discount
        ? Number(item.product.discountPrice)
        : Number(item.product.price);

      return {
        invoiceID: invoice._id,
        userID: userId,
        productID: item.productID,
        qty: item.qty,
        price,
        color: item.color,
        size: item.size,
      };
    });

    await InvoiceProductModel.insertMany(invoiceProducts);

    /* ===== STEP 6: Clear Cart ===== */
    await CartModel.deleteMany({ userID: userId });

    /* ===== STEP 7: SSLCommerz ===== */
    const paymentSetting = await PaymentSettingModel.findOne({});

    const form = new FormData();
    form.append("store_id", paymentSetting.store_id);
    form.append("store_passwd", paymentSetting.store_passwd);
    form.append("total_amount", payable.toString());
    form.append("currency", paymentSetting.currency);
    form.append("tran_id", tran_id);

    form.append("success_url", `${paymentSetting.success_url}/${tran_id}`);
    form.append("fail_url", `${paymentSetting.fail_url}/${tran_id}`);
    form.append("cancel_url", `${paymentSetting.cancel_url}/${tran_id}`);
    form.append("ipn_url", `${paymentSetting.ipn_url}/${tran_id}`);

    form.append("cus_name", profile.cus_name);
    form.append("cus_email", cusEmail);
    form.append("cus_add1", profile.cus_add);
    form.append("cus_city", profile.cus_city);
    form.append("cus_country", profile.cus_country);
    form.append("cus_phone", profile.cus_phone);

    form.append("shipping_method", "YES");
    form.append("ship_name", profile.ship_name);
    form.append("ship_add1", profile.ship_add);
    form.append("ship_city", profile.ship_city);
    form.append("ship_country", profile.ship_country);
    form.append("ship_postcode", profile.ship_postcode);

    form.append("product_name", "Invoice Products");
    form.append("product_category", "Ecommerce");
    form.append("product_profile", "general");

    const sslResponse = await axios.post(paymentSetting.init_url, form, {
      headers: form.getHeaders(),
    });

    return { status: "success", data: sslResponse.data };
  } catch (error) {
    console.error(error);
    return { status: "fail", message: error.message };
  }
};

/* ===============================
   PAYMENT STATUS SERVICES
================================ */
export const PaymentSuccessService = async (req) => {
  try {
    await InvoiceModel.updateOne(
      { tran_id: req.params.trxID },
      { payment_status: "success" },
    );
    return { status: "success" };
  } catch (e) {
    return { status: "fail", message: e.message };
  }
};

export const PaymentFailService = async (req) => {
  try {
    await InvoiceModel.updateOne(
      { tran_id: req.params.trxID },
      { payment_status: "fail" },
    );
    return { status: "success" };
  } catch (e) {
    return { status: "fail", message: e.message };
  }
};

export const PaymentCancelService = async (req) => {
  try {
    await InvoiceModel.updateOne(
      { tran_id: req.params.trxID },
      { payment_status: "cancel" },
    );
    return { status: "success" };
  } catch (e) {
    return { status: "fail", message: e.message };
  }
};

export const PaymentIPNService = async (req) => {
  try {
    await InvoiceModel.updateOne(
      { tran_id: req.params.trxID },
      { payment_status: req.body.status },
    );
    return { status: "success" };
  } catch (e) {
    return { status: "fail", message: e.message };
  }
};

/* ===============================
   INVOICE LIST
================================ */
export const InvoiceListService = async (req) => {
  try {
    const invoices = await InvoiceModel.find({
      userID: req.headers.user_id,
    });
    return { status: "success", data: invoices };
  } catch (e) {
    return { status: "fail", message: e.message };
  }
};

export const InvoiceProductListService = async (req) => {
  try {
    const user_id = new ObjectId(req.headers.user_id);
    const invoice_id = new ObjectId(req.params.invoice_id);

    let matchStage = {$match: { userID: user_id, invoiceID: invoice_id }};
    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindStage = { $unwind: "$product" };

    let products = await InvoiceProductModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindStage,
    ]);

    return { status: "success", data: products };
  } catch (e) {
    return { status: "fail", message: e.message };
  }
};
