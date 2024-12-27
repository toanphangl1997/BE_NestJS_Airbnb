-- Tạo database
CREATE DATABASE db_airbnb;

-- Sử dụng database vừa tạo
USE Airbnb;

-- Tạo bảng NguoiDung
CREATE TABLE NguoiDung (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    pass_word VARCHAR(100),
    phone VARCHAR(20),
    birth_day DATE,
    gender VARCHAR(10),
    role VARCHAR(50)
);

-- Tạo bảng ViTri
CREATE TABLE ViTri (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_vi_tri VARCHAR(100),
    tinh_thanh VARCHAR(100),
    quoc_gia INT,
    hinh_anh VARCHAR(255)
);

-- Tạo bảng Phong
CREATE TABLE Phong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_phong VARCHAR(100),
    khach INT,
    phong_ngu INT,
    giuong INT,
    phong_tam INT,
    mo_ta VARCHAR(255),
    gia_tien INT,
    may_giat BOOLEAN,
    ban_la BOOLEAN,
    tivi BOOLEAN,
    dieu_hoa BOOLEAN,
    wifi BOOLEAN,
    bep BOOLEAN,
    do_xe BOOLEAN,
    ho_boi BOOLEAN,
    ban_ui BOOLEAN,
    hinh_anh VARCHAR(255),
    id_vi_tri INT,
    FOREIGN KEY (id_vi_tri) REFERENCES ViTri(id)
);

-- Tạo bảng DatPhong
CREATE TABLE DatPhong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_phong INT,
    ngay_den DATE,
    ngay_di DATE,
    so_luong_khach INT,
    ma_nguoi_dat INT,
    FOREIGN KEY (ma_phong) REFERENCES Phong(id),
    FOREIGN KEY (ma_nguoi_dat) REFERENCES NguoiDung(id)
);

-- Tạo bảng BinhLuan
CREATE TABLE BinhLuan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_cong_viec INT,
    ma_nguoi_binh_luan INT,
    ngay_binh_luan DATE,
    noi_dung VARCHAR(255),
    sao_binh_luan INT,
    FOREIGN KEY (ma_nguoi_binh_luan) REFERENCES NguoiDung(id)
);

-- Thêm dữ liệu mẫu vào bảng NguoiDung
INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role)
VALUES 
('Nguyen Van A', 'nva@gmail.com', '123456', '0123456789', '1990-01-01', 'Male', 'user'),
('Tran Thi B', 'ttb@gmail.com', '123456', '0987654321', '1995-02-02', 'Female', 'user'),
('Le Van C', 'lvc@gmail.com', '123456', '0934567890', '1988-03-03', 'Male', 'admin'),
('Pham Thi D', 'ptd@gmail.com', '123456', '0923456789', '1992-04-04', 'Female', 'user'),
('Hoang Van E', 'hve@gmail.com', '123456', '0912345678', '1985-05-05', 'Male', 'user'),
('Bui Thi F', 'btf@gmail.com', '123456', '0901234567', '1997-06-06', 'Female', 'user'),
('Dang Van G', 'dvg@gmail.com', '123456', '0941234567', '1989-07-07', 'Male', 'user'),
('Ngo Thi H', 'nth@gmail.com', '123456', '0971234567', '1993-08-08', 'Female', 'user'),
('Vu Van I', 'vvi@gmail.com', '123456', '0961234567', '1987-09-09', 'Male', 'user'),
('Pham Thi J', 'ptj@gmail.com', '123456', '0951234567', '1991-10-10', 'Female', 'user');

-- Thêm dữ liệu mẫu vào bảng ViTri
INSERT INTO ViTri (ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh)
VALUES 
('Hanoi', 'Ha Noi', 1, 'hanoi.jpg'),
('HCM', 'Ho Chi Minh', 1, 'hcm.jpg'),
('Da Nang', 'Da Nang', 1, 'danang.jpg'),
('Nha Trang', 'Khanh Hoa', 1, 'nhatrang.jpg'),
('Hoi An', 'Quang Nam', 1, 'hoian.jpg'),
('Sapa', 'Lao Cai', 1, 'sapa.jpg'),
('Hue', 'Thua Thien Hue', 1, 'hue.jpg'),
('Vung Tau', 'Ba Ria Vung Tau', 1, 'vungtau.jpg'),
('Phu Quoc', 'Kien Giang', 1, 'phuquoc.jpg'),
('Can Tho', 'Can Tho', 1, 'cantho.jpg');

-- Thêm dữ liệu mẫu vào bảng Phong
INSERT INTO Phong (ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, id_vi_tri)
VALUES 
('Deluxe Room', 2, 1, 1, 1, 'Phong co tivi, dieu hoa', 1000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'deluxe.jpg', 1),
('Superior Room', 4, 2, 2, 2, 'Phong rong, co bep', 1500000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'superior.jpg', 2),
('Standard Room', 2, 1, 1, 1, 'Phong tieu chuan', 800000, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 'standard.jpg', 3),
('Luxury Room', 6, 3, 3, 3, 'Phong sang trong', 3000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'luxury.jpg', 4),
('Family Room', 8, 4, 4, 4, 'Phong cho gia dinh', 4000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'family.jpg', 5),
('Twin Room', 2, 1, 2, 1, 'Phong doi', 1200000, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 'twin.jpg', 6),
('Single Room', 1, 1, 1, 1, 'Phong don', 600000, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 'single.jpg', 7),
('Suite Room', 2, 1, 1, 1, 'Phong Suite', 2000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'suite.jpg', 8),
('Studio Room', 3, 1, 2, 1, 'Phong Studio', 1800000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'studio.jpg', 9),
('Apartment Room', 6, 2, 4, 2, 'Can ho', 5000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'apartment.jpg', 10);

-- Thêm dữ liệu mẫu vào bảng DatPhong
INSERT INTO DatPhong (ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat)
VALUES 
(1, '2024-12-20', '2024-12-25', 2, 1),
(2, '2024-12-22', '2024-12-27', 4, 2),
(3, '2024-12-21', '2024-12-24', 2, 3),
(4, '2024-12-25', '2024-12-30', 6, 4),
(5, '2024-12-23', '2024-12-28', 8, 5),
(6, '2024-12-26', '2024-12-29', 2, 6),
(7, '2024-12-24', '2024-12-26', 1, 7),
(8, '2024-12-28', '2025-01-01', 2, 8),
(9, '2024-12-29', '2025-01-02', 3, 9),
(10, '2024-12-30', '2025-01-05', 6, 10);

-- Thêm dữ liệu mẫu vào bảng BinhLuan
INSERT INTO BinhLuan (ma_cong_viec, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan)
VALUES 
(1, 1, '2024-12-20', 'Phong dep', 5),
(2, 2, '2024-12-21', 'Rat hai long', 4),
(3, 3, '2024-12-22', 'Phong tot', 5),
(4, 4, '2024-12-23', 'Gia ca hop ly', 4),
(5, 5, '2024-12-24', 'Dich vu tot', 5),
(6, 6, '2024-12-25', 'Rat tuyet voi', 5),
(7, 7, '2024-12-26', 'Phong don dep', 4),
(8, 8, '2024-12-27', 'Quan ly tot', 5),
(9, 9, '2024-12-28', 'Dich vu tuyet voi', 5),
(10, 10, '2024-12-29', 'Co the quay lai', 4);
