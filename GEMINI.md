# Project Context: imager

## Overview
**imager** is a high-performance, pure frontend image processing toolbox. It allows users to stitch, convert, and compress images entirely within the browser, ensuring data privacy and offline capability.

*   **Type:** Web Application (Single Page App)
*   **Framework:** React 19
*   **Build Tool:** Vite (using `@tailwindcss/vite` and `rolldown-vite`)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS 4, SCSS, CSS Modules
*   **Routing:** React Router DOM 7

## Architecture & Structure

### Key Directories
*   `src/`: Source code root.
    *   `pages/`: Application views (e.g., `Dashboard`, `Stitcher`).
    *   `components/`: Reusable UI components (Layouts, Common).
    *   `router/`: Route definitions (`routes.tsx`).
    *   `hooks/`: Custom React hooks.
    *   `utils/`: Helper functions (file handling, image processing).
    *   `types/`: TypeScript interface definitions.
    *   `styles/`: Global SCSS styles and themes.
*   `build/vite/`: Custom Vite plugin configuration.

### Key Files
*   `src/main.tsx`: Entry point. Sets up strict mode and renders `App`.
*   `src/App.tsx`: Root component. Handles `RouterProvider`, `Suspense`, and `ErrorBoundary`.
*   `src/router/modules/routes.tsx`: Defines the application routes.
*   `vite.config.ts`: Vite configuration, including aliases (`@` -> `./src`) and plugins.

## Building and Running

### Scripts
The following scripts are available in `package.json`:

*   **Start Development Server:**
    ```bash
    npm run dev
    ```
*   **Build for Production:**
    ```bash
    npm run build
    ```
    *(Runs `tsc` for type checking followed by `vite build`)*
*   **Preview Production Build:**
    ```bash
    npm run preview
    ```
*   **Lint Code:**
    ```bash
    npm run lint
    ```

## Development Conventions

### Tech Stack Details
*   **React Compiler:** Enabled via `babel-plugin-react-compiler`.
*   **Styling:** 
    *   Uses **Tailwind CSS 4** (configured via Vite plugin).
    *   Supports **SCSS** for component-specific styles (e.g., `Stitcher.scss`).
    *   Global styles in `src/styles/index.scss` and `src/index.css`.
*   **Routing:** Uses `react-router-dom` v7 with a configuration-based approach (`RouteObject[]`).
*   **Lazy Loading:** Route components are lazy-loaded using `React.lazy` and wrapped in `Suspense` with a `GlobalLoading` fallback.

### Code Style
*   **Components:** Functional components using Hooks.
*   **Imports:** Use the `@/` alias for imports from `src/`.
*   **Types:** TypeScript is strictly enforced. Shared types are located in `src/types/`.
*   **Error Handling:** Global `ErrorBoundary` wraps the application.
