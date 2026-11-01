import { useState } from "react";
import axios from "axios";

function DangNhap({ onDangNhapThanhCong }) {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [dangTai, setDangTai] = useState(false);
  const [loi, setLoi] = useState("");

  const xuLyDangNhap = async (e) => {
    e.preventDefault();
    setLoi("");
    setDangTai(true);

    try {
      const ketQua = await axios.post("http://localhost:3000/login", {
        email,
        matKhau,
      });

      // Lưu token vào localStorage
      localStorage.setItem("token", ketQua.data.token);

      // Gọi callback thông báo đăng nhập thành công
      onDangNhapThanhCong();
    } catch (err) {
      if (err.response) {
        setLoi(err.response.data.message || "Đăng nhập thất bại.");
      } else {
        setLoi("Không thể kết nối đến server.");
      }
    } finally {
      setDangTai(false);
    }
  };

  return (
    <div className="dangnhap-container">
      <h2>🔐 Đăng Nhập</h2>
      <form onSubmit={xuLyDangNhap}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="matKhau">Mật khẩu</label>
          <input
            id="matKhau"
            type="password"
            placeholder="Nhập mật khẩu..."
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-dangnhap" disabled={dangTai}>
          {dangTai ? "Đang xử lý..." : "Đăng Nhập"}
        </button>
      </form>

      {loi && <p className="thong-bao-loi">❌ {loi}</p>}

      <div className="goi-y">
        💡 Gợi ý: <strong>admin@gmail.com</strong> / <strong>123456</strong>
      </div>
    </div>
  );
}

export default DangNhap;
