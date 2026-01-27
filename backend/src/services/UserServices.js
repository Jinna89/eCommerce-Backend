import UserModel from "../models/UserModel.js";
import ProfilModel from "../models/ProfileModel.js";
import EmailSend from "../utility/EmailHelper.js";
import { TokenEncode } from "../utility/TokenHelper.js";

export const UserOTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailSubject = `Email Verification`;
    let EmailText = `Your Verification code is = ${code}`;

    await EmailSend(email, EmailSubject, EmailText);

    await UserModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upser: true },
    );

    return { status: "success", message: "6 Digit OTP as been send" };
  } catch (e) {
    return { status: "fail", message: e };
  }
};

export const VerifyOTPService = async (req) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;

    // user count
    let count = await UserModel.find({
      email: email,
      otp: otp,
    }).countDocuments();

    if (count === 1) {
      // User ID Read
      let user_id = await UserModel.find({ email: email, otp: otp });

      // User Token Create
      let token = await TokenEncode(email, user_id[0]["_id"].toString());

      // OTP code 0
      await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

      return {
        status: "success",
        message: "Valid OTP",
        token: token,
        count: count,
      };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (e) {
    return { status: "fail", message: "Invalid Verification code." };
  }
};

export const SaveProfileService = async (req) => {
  try {
    // Prefer user id set by AuthMiddleware (req.user.user_id).
    // Fall back to req.headers.user_id for backward compatibility.
    let user_id = req.user?.user_id || req.headers.user_id;

    // If user id is missing, return an explicit failure to avoid saving null
    if (!user_id) {
      return { status: "fail", message: "Unauthorized - user id missing" };
    }

    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfilModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true },
    );
    return { status: "success", message: "Profile Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const ReadProfileService = async (req) => {
  try {
    // Read user id from req.user (provided by AuthMiddleware) first
    // then fall back to headers for backwards compatibility.
    let user_id = req.user?.user_id || req.headers.user_id;

    if (!user_id) {
      return { status: "fail", message: "Unauthorized - user id missing" };
    }

    let result = await ProfilModel.find({ userID: user_id });
    return { status: "success", data: result, message: "Your Profile " };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};
