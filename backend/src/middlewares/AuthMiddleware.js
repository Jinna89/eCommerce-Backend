import { TokenDecode } from "../utility/TokenHelper.js";

const AuthMiddleware = (req, res, next) => {
  try {
    // Get token
    let token =
      req.headers.authorization?.split(" ")[1] ||
      req.headers.token ||
      req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized - Token missing",
      });
    }

    // Decode
    const decoded = TokenDecode(token);
    if (!decoded) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized - Invalid token",
      });
    }

    // set headers 
    let email = decoded['email'];
    let user_id = decoded['user_id'];

    req.headers.email = email;
    req.headers.user_id = user_id;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
};

export default AuthMiddleware;
