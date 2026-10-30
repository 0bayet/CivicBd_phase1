# CivicBD

**See It. Report It. Solve It.**

A community platform for reporting potholes, waste, drainage, streetlight and water supply problems in Bangladesh.
This repository contains **Phase 1: the frontend foundation**. All data is sample data and nothing is stored or sent.

## Running locally

Requirements: Node.js 18.18 or newer.

```bash
npm install
npm run dev      # development server at http://localhost:3000
npm run lint     # ESLint (next/core-web-vitals)
npm run build    # production build
npm start        # serve the production build
```

The first build downloads the Fraunces and Plus Jakarta Sans fonts from Google Fonts, so it needs an internet connection.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, categories, how it works, divisions, snapshot, recent reports, FAQ, call to action |
| `/issues` | Directory with search, category filter, status tabs with counts, sorting and paging |
| `/issues/[id]` | Detail page with progress timeline, support and copy-link buttons, related reports |
| `/report` | Report form with validation, photo preview and a map placeholder |
| `/login`, `/register` | Validated forms with a password visibility toggle |
| `/dashboard` | Resident dashboard layout (sample data) |
| `/admin` | Admin dashboard layout (sample data, not protected) |
| `/about`, `/privacy` | Project information |

Unknown addresses show a custom not-found page.

Add `?demo=error` to `/issues` to see the error state; "Try again" then loads normally.
Category cards on the home page open `/issues?category=<id>`; division cards open `/issues?q=<division>`.

## Structure

```
src/
  app/               Routes, root layout and global stylesheet entry
  components/
    layout/          Navbar, Footer, Logo
    ui/              Button, Alert, FormField, StatCard, DataTable, badges, PageHeader
    home/            Home page sections (Hero, CategoryGrid, HowItWorks, Divisions, StatsBand, RecentIssues, Faq, CtaBand)
    issues/          IssueCard, IssueThumb, IssuesExplorer
    forms/           ReportForm, LoginForm, RegisterForm, PasswordField, ImageUpload, AuthShell
    dashboard/       DashboardTabs, ReportsTable
  data/              Categories, statuses, divisions, FAQs and sample reports
  lib/               Validation, formatting and the sample data loader
  styles/            tokens, base, layout, components and pages CSS
```

## Phase boundaries

- Phase 2: accounts and protected pages
- Phase 3: saving reports and photos
- Phase 4: map location picker

`src/lib/issuesApi.js` is the single place where the sample data loader will be replaced with real data access.
