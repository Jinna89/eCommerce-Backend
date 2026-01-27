import jwt from "jsonwebtoken";

/**
 * Token Encode
 */
export const TokenEncode = (email, user_id) => {
  const payload = {
    email,
    user_id,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  return token;
};

/**
 * Token Decode
 */
export const TokenDecode = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return null;
  }
};
