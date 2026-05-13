# Contributing to DropAI

We're thrilled you're interested in contributing to DropAI! This document outlines the guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Architecture](#project-architecture)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Database Changes](#database-changes)
- [Adding New Features](#adding-new-features)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive environment. We enforce:

- **Be respectful** — differences of opinion are normal, but personal attacks are not
- **Be constructive** — every critique should include a suggestion for improvement
- **Be collaborative** — share knowledge freely and help others grow

## Getting Started

### Prerequisites

- Node.js 18.17+ (recommended: 20.x)
- npm, yarn, pnpm, or bun
- Git
- Access to the `team-db` CLI (pre-installed in the development environment)

### Fork & Clone

```bash
git clone https://github.com/dropai/dropai-store.git
cd dropai-store
npm install
```

### Branch Naming

Use descriptive branch names:

```
feature/add-product-variant-picker
fix/order-total-calculation
refactor/ai-service-interface
docs/update-readme-api-section
chore/update-dependencies
```

## Development Workflow

### 1. Pick an Issue

Check the [issues page](https://github.com/dropai/dropai-store/issues) for tasks. Comment to let others know you're working on it.

### 2. Create a Branch

```bash
git checkout -b feature/my-feature main
```

### 3. Make Changes

- Keep changes focused and atomic — one feature/fix per branch
- Write meaningful commit messages
- Follow the coding standards below

### 4. Test Your Changes

```bash
npm run dev     # Run development server
npm run build   # Verify the build compiles
npm run lint    # Check for lint errors
```

### 5. Push and Open a PR

```bash
git push origin feature/my-feature
```

Then open a Pull Request against the `main` branch.

## Project Architecture

### Directory Structure

```
dropai/
├── app/              # Next.js App Router pages and API routes
│   ├── (section)/    # Each section (dashboard, products, etc.) is a folder
│   │   └── page.tsx  # Page component
│   └── api/          # API routes organized by domain
├── components/       # Shared UI components
├── lib/              # Core utilities (db queries, constants)
├── services/         # Business logic (AI, email, etc.)
├── types/            # TypeScript type definitions
├── scripts/          # Database seed and migration scripts
└── public/           # Static assets
```

### Key Conventions

- **Pages** are in the `app/` directory following Next.js App Router conventions
- **API routes** are co-located next to their feature area under `app/api/`
- **Shared components** live in `components/` and are imported via `@/components/`
- **Business logic** goes in `services/`, not inside components or routes
- **Type definitions** are centralized in `types/index.ts`

## Coding Standards

### TypeScript

- **Strict mode** is enabled — avoid `any` types
- Use proper interfaces for all data structures
- Define types in `types/index.ts` for shared structures
- Use local types near usage for component-specific types

### React / Next.js

- Prefer **Server Components** by default (no `'use client'` directive unless needed)
- Use `'use client'` only when you need hooks, browser APIs, or event handlers
- Keep components small and focused — aim for single responsibility
- Use the `DashboardLayout` wrapper for consistent page layouts

### Styling

- Use **Tailwind CSS** exclusively — no CSS-in-JS or inline styles
- Follow the existing design system (colors, spacing, typography)
- Custom animations go in `globals.css` using `@theme inline`
- Use `clsx()` for conditional class merging

### Naming

- **Files**: `kebab-case.tsx` for pages, `PascalCase.tsx` for components
- **Functions**: `camelCase` for utilities, `PascalCase` for components
- **Types/Interfaces**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`

### Git Commits

Write clear, structured commit messages:

```
feat: add product variant picker to product pages

- Add SizeSelector and ColorSelector components
- Update Product type to include variants
- Wire up variant selection to cart API

Closes #42
```

Use conventional commit prefixes:
- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code change that neither fixes nor adds
- `docs:` — documentation only
- `style:` — formatting, missing semi-colons, etc.
- `chore:` — build tasks, dependencies, etc.

## Pull Request Process

1. **Keep PRs small** — under 400 lines is ideal. Split large features into multiple PRs.
2. **Write a clear description** — what changed, why, and how to test
3. **Link related issues** — use "Closes #123" in the description
4. **Request reviews** — at least one approval is required
5. **Keep it mergeable** — rebase on main if there are conflicts
6. **Don't merge your own PR** — let another team member review and merge

### PR Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactor
- [ ] Documentation
- [ ] Chore

## How Has This Been Tested?
Describe the tests you ran.

## Screenshots (if applicable)

## Related Issues
Closes #...
```

## Testing

### Manual Testing

1. Run the dev server: `npm run dev`
2. Verify all pages render without errors
3. Test API endpoints with curl or browser
4. Run the seed script to ensure data flows correctly

### Build Verification

```bash
npm run build
```

The build must pass with zero errors. TypeScript strict mode will catch most type issues.

### Lint

```bash
npm run lint
```

Fix any lint warnings before requesting review.

## Database Changes

The app uses SQLite via Turso. Since schema is managed through `team-db`:

### Adding a New Table

1. Define the schema in a new migration
2. Add a new interface in `types/index.ts`
3. Add a query function in `lib/db.ts`
4. Create a new API route in `app/api/`
5. Update the seed script

### Adding New Fields

1. Add the column using `ALTER TABLE`
2. Update the TypeScript interface
3. Update relevant query functions
4. Update the seed data

## Adding New Features

### New Page

1. Create a new folder under `app/` with `page.tsx`
2. Add the page to `NAV_ITEMS` in `lib/constants.ts`
3. Add the icon mapping in `components/Sidebar.tsx`
4. Create a new `Icon` entry in the sidebar's `iconMap`
5. Update the seed script if needed

### New API Route

1. Create the route file: `app/api/my-feature/route.ts`
2. Add a query function to `lib/db.ts`
3. Ensure proper error handling (try/catch)
4. Return `NextResponse.json()` with consistent format

### New Service

1. Create the service file under `services/`
2. Make it a class with static methods (follow existing pattern)
3. Mock responses for development, document the real API integration
4. Wire it up to API routes or components as needed

---

## Questions?

Open a [discussion](https://github.com/dropai/dropai-store/discussions) or reach out to the team on our internal Slack.

Thank you for contributing! 🚀