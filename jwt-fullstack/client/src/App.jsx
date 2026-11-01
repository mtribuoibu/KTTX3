import { useState } from "react";
import DangNhap from "./components/DangNhap";
import DanhSachSanPham from "./components/DanhSachSanPham";
import "./App.css";

function App() {
  const [daXacThuc, setDaXacThuc] = useState(!!localStorage.getItem("token"));

  const xuLyDangNhapThanhCong = () => {
    setDaXacThuc(true);
  };

  const xuLyDangXuat = () => {
    localStorage.removeItem("token");
    setDaXacThuc(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🛒 Quản Lý Sản Phẩm</h1>
        {daXacThuc && (
          <button className="btn-dangxuat" onClick={xuLyDangXuat}>
            Đăng Xuất
          </button>
        )}
      </header>

      <main>
        {!daXacThuc ? (
          <DangNhap onDangNhapThanhCong={xuLyDangNhapThanhCong} />
        ) : (
          <DanhSachSanPham />
        )}
      </main>
    </div>
  );
}

export default App;
