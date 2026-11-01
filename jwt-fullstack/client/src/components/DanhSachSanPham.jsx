import { useState, useEffect } from "react";
import axios from "axios";

function DanhSachSanPham() {
  // 3 state: data, loading, error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const laySanPham = async () => {
      setLoading(true);
      setError("");

      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Bạn chưa đăng nhập. Vui lòng đăng nhập trước.");
          setLoading(false);
          return;
        }

        // Gửi GET request với Authorization header
        const ketQua = await axios.get("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Cập nhật data
        setData(ketQua.data.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "Lỗi khi tải sản phẩm.");
        } else {
          setError("Không thể kết nối đến server.");
        }
      } finally {
        setLoading(false);
      }
    };

    laySanPham();
  }, []);

  // ===== Hiển thị theo trạng thái =====

  // Đang tải
  if (loading) {
    return (
      <div className="sanpham-container">
        <div className="loading">⏳ Đang tải dữ liệu sản phẩm...</div>
      </div>
    );
  }

  // Có lỗi
  if (error) {
    return (
      <div className="sanpham-container">
        <div className="error">❌ {error}</div>
      </div>
    );
  }

  // Hiển thị danh sách sản phẩm
  return (
    <div className="sanpham-container">
      <h2>📦 Danh Sách Sản Phẩm ({data.length})</h2>
      <ul className="sanpham-list">
        {data.map((sp) => (
          <li key={sp.id} className="sanpham-item">
            <div className="sanpham-info">
              <h3>{sp.ten}</h3>
              <p>{sp.moTa}</p>
            </div>
            <span className="sanpham-gia">
              {sp.gia.toLocaleString("vi-VN")}đ
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DanhSachSanPham;
