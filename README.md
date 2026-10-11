# Nhặt Nhạnh Văn Chương

Website HTML/CSS/JavaScript thuần, giao diện xanh lá pastel và màu kem. Bài viết được lưu trong Supabase; GitHub Pages dùng để xuất bản giao diện.

## Các file
- `index.html`: cấu trúc trang và biểu mẫu đăng bài.
- `style.css`: giao diện responsive.
- `app.js`: kết nối Supabase, tải/tìm kiếm/lọc/đăng bài.
- `supabase.sql`: tạo bảng và chính sách đọc/đăng bài công khai.

## 1. Tạo bảng trong Supabase
1. Mở dự án Supabase.
2. Vào **SQL Editor** → **New query**.
3. Mở `supabase.sql`, sao chép toàn bộ nội dung, dán vào SQL Editor và bấm **Run**.
4. Vào **Project Settings → API** (hoặc trang API Keys trong giao diện hiện tại).
5. Lấy **Project URL** và **anon/public/publishable key**. Không dùng `service_role` hoặc secret key ở website.

## 2. Kết nối website
Mở `app.js`, thay hai dòng:
```js
const SUPABASE_URL = "DAN_SUPABASE_PROJECT_URL_VAO_DAY";
const SUPABASE_ANON_KEY = "DAN_SUPABASE_ANON_OR_PUBLISHABLE_KEY_VAO_DAY";
```
bằng URL và anon/publishable key của dự án Supabase. Giữ nguyên dấu ngoặc kép.

## 3. Đưa lên GitHub Pages
1. Tạo một repository GitHub mới, nên để **Public** nếu dùng GitHub Pages miễn phí.
2. Tải lên `index.html`, `style.css`, `app.js` và `supabase.sql` (README có thể tải lên luôn).
3. Mở **Settings → Pages**.
4. Ở **Build and deployment**, chọn **Deploy from a branch**; chọn branch `main`, folder `/(root)`, bấm **Save**.
5. Chờ GitHub Pages hoàn tất và mở địa chỉ website được cung cấp trong Settings → Pages.

## 4. Kiểm tra
- Mở website, thử đăng một bài không chứa thông tin riêng tư.
- Tải lại trang và kiểm tra bài vẫn xuất hiện.
- Mở website trên trình duyệt/thiết bị khác để xác nhận bài được chia sẻ công khai.

## Lưu ý bảo mật và vận hành
- Anon/publishable key được thiết kế để dùng ở frontend; an toàn phụ thuộc vào Row Level Security (RLS) và policy. Tuyệt đối không đưa `service_role`/secret key lên GitHub.
- Theo yêu cầu hiện tại, ai cũng có thể đăng bài và không cần duyệt. Điều đó đồng nghĩa người lạ cũng có thể spam hoặc đăng nội dung không phù hợp. Nếu website mở rộng, nên thêm đăng nhập, giới hạn tần suất hoặc cơ chế báo cáo/kiểm duyệt.
- Mã này không cung cấp chức năng sửa/xóa bài sau khi đăng, nhằm tránh cho người lạ sửa hoặc xóa bài của người khác. Muốn có quản lý bài viết, cần bổ sung xác thực người dùng và chính sách quyền riêng.
- Không thể cam kết dịch vụ miễn phí tồn tại vĩnh viễn; nhà cung cấp có thể thay đổi giới hạn hoặc điều khoản.
