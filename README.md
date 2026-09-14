# Sanjay Ashwin — Personal Developer Portfolio & CMS

[![Java](https://img.shields.io/badge/Java-21%20LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.5-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring_Security-JWT-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)](https://spring.io/projects/spring-security)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A production-quality full-stack personal portfolio and Content Management System (CMS) designed and built for **Sanjay Ashwin**—Computer Science and Engineering undergraduate at Saveetha Engineering College (CGPA: 8.4, 2023–2027), specializing in Java backend development, Spring Boot, and scalable full-stack architectures.

---

## 🌟 Key Highlights

* **Authentic Developer Aesthetic**: Dark-themed primary interface engineered with restrained accents, clean monospace accents, high-contrast readable typography, and zero gimmicks (no fake animated percentage bars or fabricated counters).
* **Spring Boot 3 + Java 21 REST Engine**: Enterprise-grade backend with clean layered architecture: Entity -> Repository -> Service -> DTO -> Controller.
* **Stateless Spring Security & JJWT**: Secure token-based authentication protecting an internal Admin CMS dashboard.
* **Full CRUD Admin CMS**: Modify profile bio, technical skills, project details, internship logs, educational records, and certifications directly through the browser without rebuilding React.
* **Interactive Contact & Messages Inbox**: Contact form with server-side validation and dedicated inbox inside the Admin CMS.
* **Zero-Config Developer Experience**: Runs out of the box with file-backed H2 database and auto-seeding, while providing a plug-and-play MySQL 8 profile and Docker Compose orchestration.
* **Authentic Resume Serving**: Directly downloads `Sanjay_Ashwin_Resume.pdf` via high-performance REST endpoint or static CDN asset.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Frontend** | React 19, Vite, Vanilla CSS Design System, Lucide Icons, Fetch API with JWT Interceptor |
| **Backend** | Java 21, Spring Boot 3.2.5, Spring Data JPA, Hibernate, Jakarta Validation |
| **Security** | Spring Security 6, JJWT 0.12.5 (HMAC-SHA256), BCrypt Password Encoder, CORS Whitelisting |
| **Database** | MySQL 8.0 (Production) / H2 Database (Local Dev & Automated Testing) |
| **DevOps** | Docker, Multi-Stage Builds, Docker Compose, Nginx Alpine Reverse Proxy |
| **Testing** | JUnit 5, Mockito, Spring Boot Test, MockMvc |

---

## 📁 Repository Structure

```
Sanjay-portfolio/
├── backend/                             # Spring Boot 3 REST API (Java 21)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/sanjay/portfolio/
│   │   │   │   ├── config/              # Security, CORS, JWT authentication filters
│   │   │   │   ├── controller/          # Public & Admin REST controllers
│   │   │   │   ├── dto/                 # Request & Response Data Transfer Objects
│   │   │   │   ├── entity/              # JPA domain entities (Profile, Project, Skill, etc.)
│   │   │   │   ├── repository/          # Spring Data JPA repositories
│   │   │   │   ├── service/             # Business logic layer & implementations
│   │   │   │   └── PortfolioBackendApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties        # Default profile (H2, auto-seeding)
│   │   │       ├── application-mysql.properties  # MySQL production profile
│   │   │       ├── schema-mysql.sql              # MySQL DDL definitions
│   │   │       └── Sanjay_Ashwin_Resume.pdf      # Verified resume PDF resource
│   │   └── test/                        # Unit and integration test suites
│   ├── Dockerfile                       # Multi-stage Java 21 Temurin container build
│   └── pom.xml                          # Maven build configuration
│
├── frontend/                            # React 19 Single Page Application (Vite)
│   ├── public/
│   │   ├── Sanjay_Ashwin_Resume.pdf     # Public resume download
│   │   ├── favicon.svg                  # Terminal bracket brand icon
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/                  # Navbar, Hero, About, Skills, Projects, Modal, Footer...
│   │   ├── context/                     # ThemeContext (Dark/Light), AuthContext (JWT)
│   │   ├── pages/                       # HomePage, AdminLoginPage, AdminDashboardPage
│   │   ├── services/                    # api.js, authService, portfolioService, adminService
│   │   ├── App.jsx                      # Client router & root providers
│   │   ├── App.css                      # Production responsive component stylesheet
│   │   └── index.css                    # Design tokens & base theme resets
│   ├── Dockerfile                       # Multi-stage Node build + Nginx Alpine serve
│   ├── nginx.conf                       # Production Nginx reverse proxy & SPA router
│   └── package.json
│
├── docker-compose.yml                   # MySQL 8 + Spring Boot + React orchestration
├── DEPLOYMENT.md                        # Step-by-step production cloud deployment guide
├── .env.example                         # Environment variables template
└── README.md
```

---

## 🚀 Quick Start (Local Run)

### 1. Run Backend (Spring Boot 3)
Ensure you have **Java 21** and **Maven** installed.

```bash
cd backend
mvn spring-boot:run
```
* Backend starts at `http://localhost:8080/api`
* The database will automatically initialize with Sanjay Ashwin's verified resume data.
* Default Admin User: `admin` / `adminPassword123!`

### 2. Run Frontend (React + Vite)
Ensure you have **Node.js 18+** installed.

```bash
cd frontend
npm install
npm run dev
```
* Visit `http://localhost:5173` to view the portfolio.
* Access the Admin CMS at `http://localhost:5173/admin/login`.

---

## 🐳 Running with Docker Compose

To run the complete production-grade stack (MySQL 8 database + Spring Boot API + Nginx frontend):

```bash
docker-compose up --build -d
```

* **Frontend UI**: [http://localhost:3000](http://localhost:3000)
* **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)
* **Health Endpoint**: [http://localhost:8080/api/health](http://localhost:8080/api/health)
* **MySQL Port**: `localhost:3306`

---

## 📡 REST API Reference

### Public Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/portfolio` | Full portfolio bundle (Profile, Skills, Projects, Experience, Education, Certifications) |
| `GET` | `/api/profile` | Personal profile details |
| `GET` | `/api/projects` | List all projects |
| `GET` | `/api/projects/{id}` | Single project detail |
| `GET` | `/api/skills` | Technical skills grouped by category |
| `GET` | `/api/experience` | Professional experience and internships |
| `GET` | `/api/education` | Academic degrees and scores |
| `GET` | `/api/certifications`| Verified certifications |
| `POST`| `/api/contact` | Submit contact message inquiry |
| `GET` | `/api/resume/download`| Download `Sanjay_Ashwin_Resume.pdf` |

### Authentication & Admin Endpoints (Secured via JWT)

| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Authenticate administrator, receive JWT token |
| `GET` | `/api/admin/dashboard/stats`| `ROLE_ADMIN` | Metric counters (projects, skills, certs, unread messages) |
| `PUT` | `/api/admin/profile` | `ROLE_ADMIN` | Update profile information |
| `POST` | `/api/admin/projects` | `ROLE_ADMIN` | Create new project |
| `PUT` | `/api/admin/projects/{id}`| `ROLE_ADMIN` | Update existing project |
| `DELETE`| `/api/admin/projects/{id}`| `ROLE_ADMIN` | Delete project |
| `POST` | `/api/admin/skills` | `ROLE_ADMIN` | Add new technical skill |
| `DELETE`| `/api/admin/skills/{id}` | `ROLE_ADMIN` | Remove technical skill |
| `POST` | `/api/admin/experience` | `ROLE_ADMIN` | Add professional experience |
| `PUT` | `/api/admin/experience/{id}`| `ROLE_ADMIN` | Update experience entry |
| `DELETE`| `/api/admin/experience/{id}`| `ROLE_ADMIN` | Delete experience entry |
| `POST` | `/api/admin/education` | `ROLE_ADMIN` | Add education entry |
| `DELETE`| `/api/admin/education/{id}`| `ROLE_ADMIN` | Delete education entry |
| `POST` | `/api/admin/certifications`| `ROLE_ADMIN`| Add certification credential |
| `DELETE`| `/api/admin/certifications/{id}`| `ROLE_ADMIN`| Delete certification |
| `GET` | `/api/admin/messages` | `ROLE_ADMIN` | List all contact form inquiries |
| `PUT` | `/api/admin/messages/{id}/read`| `ROLE_ADMIN`| Mark message as read |
| `DELETE`| `/api/admin/messages/{id}`| `ROLE_ADMIN` | Delete message |

---

## 🧪 Automated Testing

### Backend Unit & Integration Tests:
```bash
cd backend
mvn test -o
```
Includes:
* `AuthControllerTest`: Authentication flow, valid credentials, invalid passwords, token generation.
* `ContactMessageTest`: Contact form submission, email validation, persistence.
* `PortfolioBackendApplicationTests`: Spring context loading, JPA wiring.

### Frontend Production Build Test:
```bash
cd frontend
npm run build
```

---

## 👤 Developer Profile

* **Developer**: Sanjay Ashwin
* **Degree**: B.E. Computer Science and Engineering, Saveetha Engineering College (2023–2027)
* **CGPA**: 8.4 / 10
* **Email**: [sanjayashwin502@gmail.com](mailto:sanjayashwin502@gmail.com)
* **Phone**: +91-8870794020
* **GitHub**: [github.com/sanjayashwinP](https://github.com/sanjayashwinP)
* **LinkedIn**: [linkedin.com/in/sanjay-ashwin-62b566376](https://www.linkedin.com/in/sanjay-ashwin-62b566376)
