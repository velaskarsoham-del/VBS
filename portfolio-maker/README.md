# Portfolio Maker - AI-Powered Dynamic Developer Portfolio Generator

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed for computer engineering and computer science students to effortlessly create, customize, live-preview, and publish professional developer portfolios.

---

## 🚀 Key Features

- **JWT User Authentication**: Secure registration, password hashing with bcryptjs, and stateless JWT token authentication.
- **Multi-Step Builder Form**: Organized tabbed form for Personal Details, Education, Skills, Work Experience, Projects, Certifications, and Social Profiles.
- **Instant Synchronous Live Preview**: Side-by-side editing where form updates immediately sync to the portfolio canvas without latency.
- **3 Distinct Portfolio Templates**:
  1. **Modern Developer**: Dark mode aesthetic with glowing neon accents, terminal/code blocks, and skill progress bars.
  2. **Professional**: Clean executive layout with a structured work history timeline.
  3. **Creative**: Vibrant gradient design with glassmorphic cards and pill badges.
- **Dynamic Template Swapping**: Switch templates on the fly while retaining all user data.
- **Public URL & Shareable Links**: Generate public links (`/portfolio/:username`) accessible without logging in.
- **Profile Image Upload**: Integrated file handling via Multer for local avatar storage and static serving.
- **PDF Export**: Download portfolio directly as a formatted PDF file using `html2canvas` & `jsPDF`.
- **Student Dashboard**: Completion score meter (0-100%), section checklist, draft/publish status, and quick link copying.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18, React Router v6, Axios, Lucide Icons | Single Page Application (SPA) with component state |
| **Styling** | Vanilla CSS3 (Custom Design System, Glassmorphism, CSS Variables) | Premium SaaS aesthetic without heavy UI frameworks |
| **Backend** | Node.js, Express.js | RESTful API server architecture |
| **Database** | MongoDB, Mongoose ORM | NoSQL structured data persistence |
| **Auth** | JSON Web Tokens (JWT), bcryptjs | Encrypted session handling & password security |
| **File Handling** | Multer | Multipart profile photo upload middleware |
| **Export** | html2canvas, jsPDF | Client-side DOM canvas conversion to PDF |

---

## 🎓 Student Viva & Technical Explanations Guide

### 1. JWT Authentication
- **Technology Used**: `jsonwebtoken`, `bcryptjs`, `localStorage`
- **Why It Was Used**: HTTP is a stateless protocol. JWT allows the server to verify user identity on protected routes without keeping session state in server memory.
- **How It Works**:
  1. User registers or logs in with email and password.
  2. Server hashes the password with `bcrypt.hash(password, salt)` and compares hash on login.
  3. Upon verification, server signs a JWT payload `jwt.sign({ id }, secret, { expiresIn: '30d' })` and returns it.
  4. React client stores token in `localStorage` and attaches it via Axios interceptor: `Authorization: Bearer <token>`.
  5. `authMiddleware.js` verifies the token on incoming API requests using `jwt.verify()`.
- **MERN Concept**: Stateless Auth, Middleware, Middleware Chain, Password Hashing.

---

### 2. Synchronous Live Preview (State Sync)
- **Technology Used**: React Context API (`PortfolioContext`), React Hooks (`useState`, `useContext`)
- **Why It Was Used**: Avoids network latency while editing form fields so users see immediate visual feedback.
- **How It Works**:
  1. `PortfolioContext` maintains a single source of truth for portfolio state in React memory.
  2. Any input change in `PersonalInfoStep`, `ProjectsStep`, etc., calls `updateSection()` or `updateField()`.
  3. React re-renders the `TemplateRenderer` component synchronously on the right side of the split workspace.
  4. When the user clicks "Save Changes", state is saved to MongoDB via `PUT /api/portfolio`.
- **MERN Concept**: Unidirectional Data Flow, Lifted State, Context API, Controlled Inputs.

---

### 3. Public Portfolio Lookup & Routing
- **Technology Used**: Express Route Parameters (`req.params.username`), Mongoose Indexing, React Router Params (`useParams`).
- **Why It Was Used**: Allows recruiters or employers to view published portfolios at memorable handles like `/portfolio/soham-velaskar`.
- **How It Works**:
  1. User toggles portfolio to `published: true`.
  2. Public visitor navigates to `/portfolio/soham-velaskar`.
  3. `PublicPortfolioPage.jsx` calls `GET /api/portfolio/public/soham-velaskar`.
  4. Express queries MongoDB: `Portfolio.findOne({ username, published: true })`.
  5. React renders the selected template populated with the user's details.
- **MERN Concept**: Dynamic Route Matching, Indexing for Fast Querying, Public vs Private Access Control.

---

### 4. Multer Profile Image Upload
- **Technology Used**: `multer`, `express.static`
- **Why It Was Used**: Allows users to upload custom profile pictures instead of relying solely on external image URLs.
- **How It Works**:
  1. User selects image file in `PersonalInfoStep`.
  2. Client submits multipart form data via `POST /api/portfolio/upload-avatar`.
  3. Multer `uploadMiddleware.js` validates image file extension, renames file uniquely (`avatar-userId-timestamp.jpg`), and saves to `server/uploads/`.
  4. Express serves uploads statically via `app.use('/uploads', express.static(...))`.
  5. Server returns static relative path `/uploads/filename.jpg` stored in user's profile image field.
- **MERN Concept**: Multipart Form Parsing, Static File Serving, File Handling Middleware.

---

## 📁 Directory Structure

```
portfolio-maker/
│
├── client/
│   ├── src/
│   │   ├── components/common/ (Navbar, Footer, ProtectedRoute)
│   │   ├── context/ (AuthContext.jsx, PortfolioContext.jsx)
│   │   ├── pages/ (LandingPage, LoginPage, RegisterPage, DashboardPage, BuilderPage, PublicPortfolioPage)
│   │   ├── pages/builder/ (PersonalInfoStep, EducationStep, SkillsStep, ExperienceStep, ProjectsStep, CertificationsStep, SocialLinksStep, TemplateStep)
│   │   ├── templates/ (ModernDeveloper, Professional, Creative, TemplateRenderer)
│   │   ├── services/ (api.js, authService.js, portfolioService.js)
│   │   ├── utils/ (exportPdf.js)
│   │   ├── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/ (db.js)
│   ├── controllers/ (authController.js, portfolioController.js)
│   ├── middleware/ (authMiddleware.js, errorMiddleware.js, uploadMiddleware.js)
│   ├── models/ (User.js, Portfolio.js)
│   ├── routes/ (authRoutes.js, portfolioRoutes.js)
│   ├── uploads/
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup Instructions

### Prerequisites
- Node.js (v16+ installed)
- MongoDB instance running locally on port 27017 (`mongodb://127.0.0.1:27017/portfolio_maker`) or MongoDB Atlas URI.

### 1. Backend Server Setup
```bash
cd server
npm install
npm run dev # Runs nodemon server.js on PORT 5000
```

### 2. Frontend React Client Setup
```bash
cd client
npm install
npm run dev # Runs Vite dev server on http://localhost:5173
```

---

## 🧪 REST API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create user account & initialize default portfolio data
- `POST /api/auth/login` - Authenticate credentials & return JWT
- `GET /api/auth/me` - Fetch authenticated user profile

### Portfolio (`/api/portfolio`)
- `GET /api/portfolio` - Fetch current user portfolio
- `PUT /api/portfolio` - Save/Update portfolio sections
- `POST /api/portfolio/upload-avatar` - Upload profile image file
- `PUT /api/portfolio/publish` - Toggle published/draft visibility
- `GET /api/portfolio/public/:username` - Fetch public portfolio by username (No Auth required)
