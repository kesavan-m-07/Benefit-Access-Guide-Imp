# Benefit Access Guide

A premium, highly interactive onboarding application designed to assist users in qualifying for benefit packages through an intuitive, modern step-flow experience.

---

## 1. Setup & Installation

### Prerequisites
- **Node.js**: Version `20.x` or higher
- **pnpm**: Version `9.x` or higher (recommended package manager)

To verify your local environment:
```bash
node -v
pnpm -v
```

### Installation Steps
1. Navigate to the project directory:
   ```bash
   cd benefit-access-guide-imp
   ```

2. Install all dependencies:
   ```bash
   pnpm install
   ```

3. Run the local development server:
   ```bash
   pnpm dev
   ```
   Open `http://localhost:5173` (or the terminal-provided port) in your browser.

4. Build the application for production:
   ```bash
   pnpm build
   ```

5. Preview the production build locally:
   ```bash
   pnpm preview
   ```

---

## 2. Tech Stack & Dependency Versions

This project is built using modern front-end tooling to maximize performance, scalability, and type safety:

- **Core Framework**: React `^19.2.6` (leveraging React Server/Client paradigms and advanced hook contexts)
- **Programming Language**: TypeScript `~6.0.2` (for strict static type-checking and autocompletion)
- **Routing**: TanStack Router `^1.170.15` (fully type-safe route boundaries, links, and parameters)
- **Forms & Validation**:
  - React Hook Form `^7.78.0` (highly performant, uncontrolled/controlled form input management)
  - Zod `^4.4.3` (schema-based declaration and runtime validation with automatic TypeScript inference)
- **Styling & Theme**:
  - Tailwind CSS `^4.3.0` & `@tailwindcss/vite` `^4.3.0` (utility-first styling utilizing CSS theme configurations)
  - Clsx `^2.1.1` and Tailwind Merge `^3.6.0` (for dynamic class name concatenation and conflict-free overriding)
- **Date Utilities**:
  - React Datepicker `^9.1.0` (highly customizable accessible calendar date picker component)
- **Animations**:
  - Framer Motion `^12.40.0` (fluid micro-interactions, layout transitions, and page steps)
- **Bundler**: Vite `^8.0.12` (ultra-fast module loading and hot module replacement)

---

## 3. Folder Structure

```text
benefit-access-guide-imp/
├── public/                 # Static assets (favicons, browser configurations)
├── src/
│   ├── assets/             # Images, vector icons, and static webp graphics
│   ├── features/           # Feature-scoped components, contexts, and hooks
│   │   └── onboarding/     # Onboarding module containing:
│   │       ├── components/ # Step components (BasicForm, EmailForm, StepCounter)
│   │       ├── constants/  # Step registrations and helper maps
│   │       ├── schema/     # Zod form validation schemas
│   │       ├── types/      # Onboarding TypeScript definitions
│   │       └── Onboarding.tsx # Main feature coordinator container
│   ├── routes/             # TanStack routing configuration and endpoints
│   ├── shared/             # Reusable shared global components and utilities
│   │   ├── components/     # UI kit (Button, Container, TextInput, DatePicker, SelectInput)
│   │   │   └── DatePicker/ # Scoped DatePicker component and configuration
│   │   └── utils/          # Tailored helper functions (e.g. className mergers)
│   ├── styles/             # Application global style sheets (globals.css)
│   ├── main.tsx            # React application entry point
│   ├── router.tsx          # TanStack router setup
│   └── routeTree.gen.ts    # Auto-generated TanStack route tree mapping
├── eslint.config.js        # Linter policies and code quality rules
├── package.json            # Scripts, metadata, and dependencies declaration
├── tsconfig.json           # TypeScript compilation configuration
└── vite.config.ts          # Vite configuration and Tailwind plugins setup
```

---

## 4. Design Implementation & Justifications

### i. Color Palette Overhaul
- **Rationale**: The color palette was upgraded from dull, plain solid colors to a professional, high-fidelity HSL system using Deep Indigo (`#4f46e5`), Accented Blue (`#3b82f6`), and Slate Grays (`#1e293b`, `#64748b`).
- **Benefits**:
  - **Premium Contrast**: Establishes visual hierarchy, guiding the user's focus through forms.
  - **Aesthetics & Trust**: Semi-transparent, glassmorphism-based containers and soft border gradients make the application look highly professional, which is critical when prompting users for sensitive details like Date of Birth or Phone Number.
  - **Improved Legibility**: Fixed the calendar's day highlights (e.g. today's date) to remain visible and accessible, preventing light-on-light color collision.

### ii. Calendar Date Picker vs. 3 Dropdowns
- **Rationale**: Implementing a cohesive, overlay date picker is mathematically and ergonomically superior to utilizing three individual drop-down inputs (Month, Day, Year).
- **Benefits**:
  - **Preventing Invalid Selections**: Users cannot pick invalid dates (such as February 30th or September 31st). Dropdowns allow these choices, leading to awkward post-submit validation errors.
  - **Mobile Optimization**: 3 dropdown selectors occupy extensive screen real estate, causing excessive clicking/scrolling on mobile devices. The datepicker opens inline, saving space and improving layout flow.
  - **Ergonomic Context**: Highlights the current date, provides month/year selectors, and allows quick keyboard navigation and swipe capabilities.
  - **Integrated Form Management**: Feeds a single, unified `Date` object straight into React Hook Form and Zod schemas, eliminating date-parsing boilerplate.

### iii. Modern Layout Refactoring
- **Rationale**: Traditional onboarding flows are often boring and lack visual feedback. The layout was updated to a responsive grid featuring card boundaries, motion transitions, and high-visibility status indicators.
- **Benefits**:
  - **Navigational Stepper**: The left-aligned vertical progress tracker (top horizontal on mobile) breaks down the questionnaire into small, digestible chunks so users are not overwhelmed.
  - **Fluid Transitions**: Utilizing `framer-motion` to animate form cards as they enter/exit gives the page an active, response-oriented feel.
  - **Trust Badging**: Placed secure verification elements ("Secure & Private", "256-bit encryption") near the submission button to lower user friction and increase questionnaire completion rates.

---
