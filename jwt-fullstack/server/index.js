const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { xacThuc, SECRET_KEY } = require("./middleware");

const app = express();
const PORT = 3000;

// ==================== Cấu hình ====================

// Cho phép React client (port 5173) truy cập
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Đọc body dạng JSON
app.use(express.json());

// ==================== API Đăng nhập ====================

/**
 * POST /login
 * Nhận email và matKhau, kiểm tra hardcode, trả về JWT token
 */
app.post("/login", (req, res) => {
  const { email, matKhau } = req.body;

  // Kiểm tra hardcode
  if (email === "admin@gmail.com" && matKhau === "123456") {
    // Tạo JWT token (hết hạn sau 1 giờ)
    const token = jwt.sign(
      { email: email, role: "admin" },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Đăng nhập thành công!",
      token: token,
    });
  }

  // Sai thông tin -> 401
  return res.status(401).json({
    message: "Email hoặc mật khẩu không đúng.",
  });
});

// ==================== API Sản phẩm (cần xác thực) ====================

/**
 * GET /api/products
 * Route được bảo vệ bởi middleware xacThuc
 * Trả về danh sách sản phẩm ảo
 */
app.get("/api/products", xacThuc, (req, res) => {
  const sanPham = [
    { id: 1, ten: "Bút bi", gia: 5000, moTa: "Bút bi xanh" },
    { id: 2, ten: "Vở ô ly", gia: 12000, moTa: "Vở ô ly 200 trang" },
    { id: 3, ten: "Thước kẻ", gia: 8000, moTa: "Thước kẻ 30cm" },
    { id: 4, ten: "Bút chì", gia: 3000, moTa: "Bút chì 2B" },
    { id: 5, ten: "Tẩy", gia: 4000, moTa: "Tẩy trắng mềm" },
    { id: 6, ten: "Compa", gia: 15000, moTa: "Compa vẽ hình" },
  ];

  res.json({
    message: `Xin chào ${req.user.email}! Đây là danh sách sản phẩm.`,
    data: sanPham,
  });
});

// ==================== Khởi động Server ====================

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
