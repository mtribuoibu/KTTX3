const jwt = require("jsonwebtoken");

const SECRET_KEY = "my_secret_key_2026";

/**
 * Middleware xác thực JWT token
 * Lấy token từ header Authorization: Bearer <token>
 * Nếu hợp lệ -> gắn thông tin user vào req.user và gọi next()
 * Nếu không hợp lệ -> trả về lỗi 401 hoặc 403
 */
function xacThuc(req, res, next) {
  const authHeader = req.headers.authorization;

  // Kiểm tra header Authorization có tồn tại không
  if (!authHeader) {
    return res.status(401).json({ message: "Không tìm thấy token. Vui lòng đăng nhập." });
  }

  // Tách token từ "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token không đúng định dạng." });
  }

  try {
    // Xác minh token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Gắn thông tin user đã giải mã vào request
    next(); // Cho phép đi tiếp
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token đã hết hạn. Vui lòng đăng nhập lại." });
    }
    return res.status(403).json({ message: "Token không hợp lệ." });
  }
}

module.exports = { xacThuc, SECRET_KEY };
