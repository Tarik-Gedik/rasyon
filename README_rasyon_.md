# Rasyon

Rasyon; **Java Spring Boot (Backend)** ve **React (Frontend)** bileşenlerinden oluşan bir web uygulamasıdır. (Örn. “Hayvancılıkta rasyon/yem planlama ve kayıt yönetimi”)

> **Monorepo dizinleri**
> - `rasyon/` → Backend (Spring Boot, Java 17)
> - `rasyon_front/` → Frontend (React 18, CRA + CRACO + TailwindCSS)

---

## 🧠 Değerlendirme Kriteri

> **Staj başvurusu için istenen şartlar**
>
> - Adayın **Spring Boot ve React** kullanarak geliştirdiği ve **yayına alınmış bir proje** sunabilmesi, **veya**
> - **Docker ile çalıştırılabilir** şekilde hazırlanmış bir proje sunabilmesi
>
> Bu case yerine, varsa **o projenin detaylı bir `README.md`** dosyası ile birlikte paylaşılması **daha değerli** kabul edilir.

> Bu repo, kriterlerin ikinci maddesini karşılamak için **Docker ile çalıştırılabilir** hale getirilmiştir. Aşağıdaki _Docker ile Hızlı Başlangıç_ bölümünü izleyerek tek komutla ayağa kaldırabilirsiniz.

---

## 🚀 Hızlı Başlangıç (Yerel Geliştirme)

### 1) Gereksinimler
- Java 17+
- Node.js 18+ (npm/yarn)
- PostgreSQL (lokal veya Docker)
- Git

### 2) Klonla
```bash
git clone https://github.com/<kullanici>/rasyon.git
cd rasyon
```

### 3) Backend (Spring Boot)
```bash
cd rasyon
# application.properties içindeki DB ve port ayarlarını kontrol edin
# Maven Wrapper ile (Windows'ta mvnw.cmd):
./mvnw clean package
./mvnw spring-boot:run
# → http://localhost:8080
```

### 4) Frontend (React)
```bash
cd ../rasyon_front
npm install
npm start
# → http://localhost:3000
```

---

## 🐳 Docker ile Hızlı Başlangıç (Tek Komut)

> **Amaç:** Kriterlerde geçen “Docker ile çalıştırılabilir proje” koşulunu karşılamak.  
> Aşağıdaki dosyaları repo köküne ekleyin: `Dockerfile.backend`, `Dockerfile.frontend`, `docker-compose.yml`, `nginx.conf`, `.env.example`.

### 1) Ortam dosyasını oluşturun
```bash
cp .env.example .env
# Gerekirse içerikleri düzenleyin (DB kullanıcı/parola vs.)
```

### 2) Compose ile ayağa kaldırın
```bash
docker compose up --build
```
- Frontend → http://localhost:3000  
- Backend  → http://localhost:8080  
- Database → localhost:5432 (PostgreSQL)

> **Not:** Frontend üretim derlemesi, `REACT_APP_API_BASE_URL=http://backend:8080` ile **backend servisine** bağlanacak şekilde build edilir (Docker ağı sayesinde).

---

## ⚙️ Yapılandırma

### `.env.example`
```dotenv
# Postgres
POSTGRES_DB=rasyon_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Spring Boot
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/rasyon_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
SERVER_PORT=8080

# Frontend (build-time)
REACT_APP_API_BASE_URL=http://backend:8080
```

### Backend (Spring) – önemli ayarlar
- `SPRING_DATASOURCE_URL` / `USERNAME` / `PASSWORD`
- `SERVER_PORT` (varsayılan 8080)
- Geliştirme için `spring.jpa.hibernate.ddl-auto=update` uygun; prod’da migration aracı (Flyway/Liquibase) önerilir.

### Frontend (React) – önemli ayarlar
- **CRA**’da API tabanı build-time’da alınır: `REACT_APP_API_BASE_URL`
- Geliştirmede `.env` → `REACT_APP_API_BASE_URL=http://localhost:8080`

---

## 📚 API (Örnekler)

> Endpoint adlarını projedeki gerçek sınıf/controllera göre güncelleyin.

- `GET  /api/health` → durum bilgisi (DB bağlantısı dâhil)  
- `GET  /api/animals` → hayvan listesi  
- `POST /api/animals` → hayvan ekle  
- `DELETE /api/animals/{id}?reason=Satıldı|Ölüm|Kaçtı` → hayvan sil  
- `POST /api/animals/calculate` → rasyon (yem) hesaplama

---

## 🧪 Test
- Backend: `./mvnw test`
- Frontend: `npm test`

---

## 🗺️ Yol Haritası
- [ ] Kimlik doğrulama + rol bazlı yetki
- [ ] Frontend’te `.env` üzerinden API tabanı
- [ ] Docker prod profil (çok-aşamalı build + Nginx)
- [ ] CI/CD (GitHub Actions)
- [ ] Postman koleksiyonu

---

## 🤝 Katkı
1. Fork → `feat/...` branch açın  
2. Değişiklikleri yapın, testleri çalıştırın  
3. Açıklayıcı bir Pull Request açın

---

## 📄 Lisans
MIT (veya tercih ettiğiniz lisans)

---

## 📬 İletişim
**Tarık Gedik** – GitHub: https://github.com/Tarik-Gedik – e‑posta: <e‑posta>
