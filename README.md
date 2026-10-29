# TH2 – Thư viện lớp

Sinh viên: Phạm Tiến Dũng – Mã SV: B25DCTV018 – Lớp: AIOT-02

## Cấu trúc
- `partA/` – JavaScript thuần (module ES, fetch + async/await, localStorage). Có thêm chế độ sáng/tối.
- `partB/` – React + Vite (component, props, children, useState).

## Cách chạy
**Phần A:** mở thư mục `partA` bằng Live Server (VS Code) hoặc `npx serve partA`
(không mở trực tiếp file://, vì `fetch` và ES module cần chạy qua HTTP).
Muốn dùng mockapi: tạo resource `books` trên mockapi.io rồi dán link vào `API_URL` trong `partA/js/api.js`
(khi đó thêm sách gửi POST, xóa sách gọi DELETE). Để trống thì đọc `books.json`.

**Phần B:**
```
cd partB
npm install
npm run dev
```

## So sánh Phần A (DOM thuần) và Phần B (React)

| Tiêu chí | Phần A – DOM thuần | Phần B – React |
|---|---|---|
| Cách cập nhật giao diện | Tự tìm phần tử (`querySelector`) và sửa bằng `createElement`/`textContent` | Chỉ cập nhật state, React tự vẽ lại giao diện |
| Phong cách | Mệnh lệnh: nói rõ *làm thế nào* | Khai báo: mô tả giao diện *trông ra sao* theo state |
| Tổ chức mã | Chia module theo chức năng (api, render, storage, validate) | Chia component theo phần giao diện, tái sử dụng bằng props/children |
| Trạng thái | Biến `state` tự quản lý, phải nhớ gọi `render()` | `useState`; đổi state là giao diện tự đổi |
| Sự kiện | Event delegation trên danh sách | Gắn `onClick` trực tiếp, truyền hàm xuống qua props |
| Danh sách | Tạo lại các thẻ bằng vòng lặp | `map` + `key` để React nhận biết từng phần tử |
| Công cụ | Chạy trực tiếp trên trình duyệt | Cần Node.js, Vite, bước build |

**Nhận xét:** DOM thuần dễ hiểu và nhẹ với trang nhỏ, nhưng khi giao diện và dữ liệu phức tạp hơn thì dễ quên cập nhật chỗ nào đó. React tốn công cài đặt ban đầu nhưng giúp mã gọn, dễ chia nhỏ và dễ mở rộng.
