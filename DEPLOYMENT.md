# Deployment Guide: Sanjay Ashwin Full-Stack Portfolio

This document contains step-by-step instructions for building, running, and deploying Sanjay Ashwin's full-stack personal developer portfolio across various environments—from local developer setups to containerized cloud deployments.

---

## 1. System Architecture

```
[ Web Browser / Visitor ]
           │
           ▼
[ Frontend: React 19 SPA (Vite / Nginx) ]
  • Responsive UI / Dark Theme
  • Public Showcase (About, Projects, Skills, Contact)
  • Admin CMS Dashboard (JWT Authentication)
           │
           ▼ (HTTPS / JSON REST API)
[ Backend: Spring Boot 3.2.5 (Java 21) ]
  • Stateless Spring Security Filter Chain
  • JJWT 0.12.5 Token Provider & Validator
  • Public REST Endpoints (`/api/portfolio`, `/api/contact`)
  • Admin CRUD Endpoints (`/api/admin/**`)
           │
           ▼ (Spring Data JPA / Hibernate)
[ Database: MySQL 8 (Production) / H2 (Zero-Config Fallback) ]
  • Persistent Tables: profile, skills, projects, experience, education, certifications, contact_messages, admin_users
```

---

## 2. Local Execution

### Option A: Zero-Configuration Quick Start (No Docker or MySQL required)

The backend includes an automatic H2 file-backed persistence engine configured for zero-friction local development and evaluation.

#### 1. Start the Spring Boot Backend:
```bash
cd backend
mvn spring-boot:run
```
* The API will start at `http://localhost:8080/api`.
* Initial resume records for Sanjay Ashwin and the admin user account (`admin` / `adminPassword123!`) will automatically seed if the database is empty.

#### 2. Start the React Frontend:
```bash
cd frontend
npm install
npm run dev
```
* Access the live portfolio in your browser at `http://localhost:5173`.
* Admin CMS login is accessible at `http://localhost:5173/admin/login`.

---

### Option B: Docker Compose (Production-Mirroring with MySQL 8)

Run the complete multi-tier stack (MySQL 8 database + Spring Boot 3 API + Nginx-served React frontend) with a single command:

```bash
# In project root
docker-compose up --build -d
```

* **Frontend**: `http://localhost:3000`
* **Backend API**: `http://localhost:8080/api`
* **Health Check**: `http://localhost:8080/api/health`
* **MySQL Database**: `localhost:3306` (Database: `sanjay_portfolio`)

To monitor logs:
```bash
docker-compose logs -f backend
```

To stop containers:
```bash
docker-compose down
```

---

## 3. Production Cloud Deployment

### Strategy 1: Railway / Render (Recommended for Student / Portfolio Hosting)

#### Step 1: Provision MySQL Database
1. In Railway or Render dashboard, click **New Service** > **Database** > **MySQL**.
2. Note your database credentials (`MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`).

#### Step 2: Deploy Spring Boot Backend
1. Click **New Service** > **GitHub Repo** > Select `Sanjay-portfolio`.
2. Set Root Directory to `/backend`.
3. Select **Dockerfile** as the build engine (or Maven build pack with Java 21).
4. Configure Environment Variables:
   ```env
   SPRING_PROFILES_ACTIVE=mysql
   SPRING_DATASOURCE_URL=jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   SPRING_DATASOURCE_USERNAME=${MYSQLUSER}
   SPRING_DATASOURCE_PASSWORD=${MYSQLPASSWORD}
   JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=SetAStrongPasswordHere123!
   CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://your-custom-domain.com
   ```
5. Deploy. Backend will be available at `https://your-backend.up.railway.app`.

#### Step 3: Deploy Frontend (Vercel / Netlify / Cloudflare Pages)
1. In Vercel or Netlify, import the repository and set **Root Directory** to `frontend`.
2. Build Settings:
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
3. Environment Variables:
   ```env
   VITE_API_URL=https://your-backend.up.railway.app/api
   ```
4. Single Page Application Rewrites (configured automatically for Netlify via `_redirects` or Vercel via `vercel.json`):
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

---

### Strategy 2: Self-Hosted VPS (Ubuntu 22.04 / 24.04 LTS)

1. **Install Prerequisites**:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose git nginx certbot python3-certbot-nginx
   sudo systemctl enable --now docker
   ```

2. **Clone & Configure**:
   ```bash
   git clone https://github.com/sanjayashwinP/Sanjay-portfolio.git /var/www/portfolio
   cd /var/www/portfolio
   cp .env.example .env
   # Edit .env with your domain and secure passwords
   ```

3. **Start Containers**:
   ```bash
   docker-compose up -d --build
   ```

4. **Issue SSL with Let's Encrypt**:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 4. Environment Variables Reference

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile (`default` for H2, `mysql` for MySQL) | `default` |
| `SPRING_DATASOURCE_URL` | JDBC connection URL | `jdbc:mysql://localhost:3306/sanjay_portfolio` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `sanjay_user` |
| `SPRING_DATASOURCE_PASSWORD` | Database user password | `sanjayPassword123!` |
| `JWT_SECRET` | 256-bit hexadecimal or Base64 secret key for HMAC-SHA256 | (Generated 64-char hex) |
| `JWT_EXPIRATION_MS` | JWT validity duration in milliseconds | `86400000` (24 Hours) |
| `ADMIN_USERNAME` | Seed administrator account username | `admin` |
| `ADMIN_PASSWORD` | Seed administrator account password | `adminPassword123!` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed frontend origins | `http://localhost:5173,http://localhost:3000` |
| `VITE_API_URL` | Frontend API base URL | `http://localhost:8080/api` |

---

## 5. Security & Hardening Checklist

- [x] **Stateless Security**: No HTTP session storage; every authenticated request requires an `Authorization: Bearer <token>` header.
- [x] **Password Hashing**: Passwords stored using `BCryptPasswordEncoder` with high cost factor.
- [x] **Input Validation**: All form submissions validated on backend with `@Valid` and Jakarta validation constraints.
- [x] **CORS Policy**: Configurable origin whitelisting restricting unauthorized third-party browsers from executing state modifications.
- [x] **Database Isolation**: Non-root database user granted only DML (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) on the application database in production.
- [x] **Container Security**: Backend runs under an unprivileged `spring:spring` user inside Alpine Linux.
