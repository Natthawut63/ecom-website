# 🛒 E-Commerce Website (Frontend)

โปรเจกต์นี้เป็นระบบเว็บไซต์อีคอมเมิร์ซ (E-Commerce) ที่พัฒนาขึ้นด้วย **React + Vite** โดยมีการแบ่งโครงสร้างโปรเจกต์แบบ Feature-based Architecture เพื่อให้ง่ายต่อการดูแลรักษาและขยายระบบในอนาคต เหมาะสำหรับการนำไปแสดงเป็นผลงาน (Portfolio) ใน Resume

## 🚀 เทคโนโลยีหลักที่ใช้ (Tech Stack)

- **Frontend Framework:** React 18 + Vite (เพื่อความรวดเร็วในการ Build และ Development)
- **Styling:** Tailwind CSS (สำหรับการจัดการ UI และ Responsive Design)
- **Routing:** React Router DOM v7 (สำหรับการจัดการหน้าต่างๆ และแบ่ง Role)
- **State Management:** Zustand (สำหรับจัดการ Global State เช่น ตะกร้าสินค้า)
- **Form & Validation:** React Hook Form คู่กับ Zod (สำหรับการตรวจสอบข้อมูลที่ผู้ใช้กรอก)
- **HTTP Client:** Axios (สำหรับการเชื่อมต่อกับ Backend API)
- **Payment Gateway:** Stripe (สำหรับการประมวลผลการชำระเงิน)
- **Animations:** Framer Motion (สำหรับการทำแอนิเมชันให้ UI ดูสมูท)
- **UI Components:** Swiper (สำหรับทำสไลเดอร์สินค้า), Lucide React (สำหรับไอคอน)

## 📂 โครงสร้างและฟีเจอร์ของระบบ (Features)

ระบบถูกออกแบบโดยแบ่งออกเป็น 3 ส่วนหลัก (Roles) ตามสิทธิ์การใช้งาน ได้แก่:

### 1. ส่วนของผู้ใช้ทั่วไป (Public & Shop)
- **Home (หน้าแรก):** แสดงสินค้าแนะนำหรือโปรโมชั่น
- **Shop (หน้าช้อปปิ้ง):** แสดงรายการสินค้าทั้งหมด สามารถค้นหาและกรองสินค้าได้
- **Cart (ตะกร้าสินค้า):** จัดการสินค้าที่ต้องการสั่งซื้อ (เพิ่ม/ลด จำนวน, ลบสินค้า)
- **Checkout (หน้าชำระเงิน):** สรุปยอดคำสั่งซื้อและดำเนินการชำระเงิน
- **Authentication:** ระบบเข้าสู่ระบบ (Login) และสมัครสมาชิก (Register)

### 2. ส่วนของสมาชิก (User Dashboard)
*เข้าถึงได้เฉพาะผู้ใช้ที่ล็อคอินแล้ว*
- **Home User:** หน้าแรกสำหรับสมาชิก
- **Payment:** จัดการการชำระเงินผ่านระบบ Stripe
- **History:** ดูประวัติการสั่งซื้อที่ผ่านมาของตนเอง

### 3. ส่วนของผู้ดูแลระบบ (Admin Dashboard)
*เข้าถึงได้เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น ผ่านระบบ Protect Route*
- **Dashboard:** สรุปภาพรวมของร้านค้าและยอดขาย
- **Category Management:** จัดการหมวดหมู่สินค้า (เพิ่ม/แก้ไข/ลบ)
- **Product Management:** จัดการสินค้าในระบบ (เพิ่ม/แก้ไข/ลบ) และอัปโหลดรูปภาพ
- **Manage Users:** จัดการสิทธิ์หรือข้อมูลผู้ใช้งานในระบบ
- **Manage Orders:** จัดการและอัปเดตสถานะคำสั่งซื้อของลูกค้า

## 🛠️ โครงสร้างโฟลเดอร์ (Folder Structure)

โปรเจกต์นี้ใช้โครงสร้างแบบ **Feature-based** เพื่อความเป็นระเบียบ:

```text
src/
├── app/                  # การตั้งค่าหลักของแอป เช่น App.jsx และระบบ Routing (รวมถึง Protect Routes)
├── assets/               # ไฟล์รูปภาพหรือไฟล์ที่จัดเก็บไว้ในโปรเจกต์
├── features/             # แบ่งโมดูลตามฟีเจอร์การใช้งาน
│   ├── admin/            # หน้าและส่วนประกอบสำหรับแอดมิน (Dashboard, จัดการสินค้า, คำสั่งซื้อ)
│   ├── auth/             # ระบบ Login / Register
│   ├── home/             # ส่วนประกอบของหน้าแรก
│   ├── shop/             # หน้าร้านค้า (Shop, Cart, Checkout)
│   └── user/             # หน้าสำหรับผู้ใช้งานทั่วไป (ประวัติการสั่งซื้อ, ชำระเงิน)
├── shared/               # ส่วนประกอบที่ใช้ร่วมกัน (Components, Layouts, Utils, Styles)
└── main.jsx              # Entry point ของแอปพลิเคชัน
```

## 💻 การติดตั้งและทดลองรันโปรเจกต์

1. **Clone repository และเข้าไปที่โฟลเดอร์โปรเจกต์:**
   ```bash
   git clone <repository-url>
   cd ecom-website
   ```

2. **ติดตั้ง Dependencies:**
   โปรเจกต์นี้ใช้ Yarn เป็น Package Manager
   ```bash
   yarn install
   ```

3. **ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables):**
   คัดลอกไฟล์ `.env.example` เป็น `.env` (ถ้ามี) หรือสร้างไฟล์ `.env` และกำหนดค่า API URL และ Stripe Keys

4. **รันโปรเจกต์ในโหมด Development:**
   ```bash
   yarn dev
   ```
   จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

## 💡 จุดเด่นที่นำไปเสนอใน Resume ได้

1. **Modern Stack:** ใช้เครื่องมือที่ทันสมัยและเป็นที่นิยมในตลาดการทำงาน (React, Vite, Tailwind CSS, Zustand)
2. **Clean Architecture:** โครงสร้างโค้ดแบบ Feature-based ที่แยกส่วนชัดเจน บำรุงรักษาง่าย (Scalable)
3. **Role-based Access Control (RBAC):** มีระบบ Guard Routes (`ProtectRouteUser`, `ProtectRouteAdmin`) เพื่อป้องกันการเข้าถึงหน้าเว็บของผู้ที่ไม่มีสิทธิ์
4. **Payment Integration:** มีการเชื่อมต่อกับระบบชำระเงินจริงอย่าง Stripe
5. **Form Handling:** จัดการฟอร์มแบบมืออาชีพด้วย React Hook Form และตรวจสอบความถูกต้องของข้อมูล (Validation) ด้วย Zod
6. **Performance:** มีการจัดการปิดการทำงานของ `console.log` เมื่อนำขึ้นระบบจริง (Production) ในไฟล์ `main.jsx` เพื่อเพิ่มประสิทธิภาพและความปลอดภัย

---
*พัฒนาระบบโดย: [ชื่อของคุณ]*
