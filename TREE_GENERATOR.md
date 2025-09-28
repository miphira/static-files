# 🌳 Tree Map Generator

Hệ thống tự động tạo tree map (cấu trúc thư mục) cho repository static-files.

## 📋 Cách sử dụng

### Với pnpm:
```bash
# Tạo tree map và cập nhật README.md
pnpm run tree

# Hoặc với thông báo chi tiết
pnpm run update-readme
```

### Với npm:
```bash
# Tạo tree map và cập nhật README.md
npm run tree

# Hoặc với thông báo chi tiết
npm run update-readme
```

### Với Node.js trực tiếp:
```bash
node scripts/generate-tree.js
```

## ⚙️ Tính năng

- ✅ Tự động tạo cấu trúc thư mục dạng tree
- ✅ Cập nhật tự động trong README.md
- ✅ Bỏ qua các thư mục/file không cần thiết (node_modules, .git, etc.)
- ✅ Sắp xếp thư mục trước, file sau
- ✅ Hiển thị ngày cập nhật cuối cùng
- ✅ Đếm tổng số files/folders

## 🚀 Quy trình làm việc

1. Thêm files/folders mới vào repository
2. Chạy lệnh: `pnpm run tree`
3. README.md sẽ được cập nhật tự động với tree map mới
4. Commit các thay đổi

## 🔧 Tùy chỉnh

Để thêm files/folders vào danh sách bỏ qua, chỉnh sửa `IGNORE_LIST` trong file `scripts/generate-tree.js`:

```javascript
const IGNORE_LIST = [
    'node_modules',
    '.git',
    '.vscode',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '.DS_Store',
    'Thumbs.db',
    'scripts'
    // Thêm files/folders khác cần bỏ qua
];
```