# Profolio - Professional Identity Platform

A production-ready web application that helps users create a professional portfolio link instead of typical PDF resumes. The system is fully optimized for free deployment on Vercel and Supabase.

## Tech Stack
- **Frontend:** Next.js 14 App Router, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Supabase (PostgreSQL, Auth, File Storage, RLS)
- **Deployment:** Vercel (Frontend), Supabase (Backend Database & Auth)

## Features
- Complete Authentication (Login, Signup via Supabase Auth)
- Protected User Dashboard with Sidebar Nav
- CRUD Forms for:
  - Personal Information (Bio, Headline, Location)
  - Work Experience
  - Projects (with GitHub/Demo links)
  - Skills Matrix
  - Awards and Honors
  - Certificates (with File Upload capability)
- Dynamic Portfolio Generation route (`/[id]`) that compiles user entries into a recruiter-friendly public webpage.
- Lightweight Page View analytics counter
- Prepared architecture for AI Integrations (`src/lib/ai.ts`)

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js installed (v18+)
- A [Supabase](https://supabase.com/) free-tier account

### 2. Database Setup (Supabase)
1. Create a new project in Supabase.
2. Go to the **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/schema.sql` from this repository.
4. Paste the SQL code into the editor and click **Run**.
5. Go to **Storage** and create a PUBLIC bucket named: `certificates` and optionally `avatars` / `project_media`.

### 3. Environment Variables
1. Rename `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
2. In your Supabase Dashboard, go to **Settings > API**.
3. Copy the **Project URL** and the **anon public auth key**.
4. Paste them into `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run the App
Install dependencies and run the Next.js development server:
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Deployment to Vercel

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and create a new project importing your GitHub repository.
3. In the Vercel project settings, add the Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will build and host your Next.js application automatically for free.

## Notes & Security
- **Row-Level Security (RLS)** restricts data modification to the authenticated owner.
- File uploads are securely piped to Supabase Storage via standard File APIs.
- App pages utilize Server Actions extensively for high performance and standard functionality.
