# Leadflow CRM

A responsive, frontend-only lead management workspace built with React 18, Vite, Tailwind CSS, Chart.js, react-chartjs-2, and lucide-react.

## Run

Use Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run build
npm run preview
```

Run the focused calculation, filtering, validation, and saved-data checks with `npm test`.

## Installation from a new Vite project

The delivered project already contains all configuration and dependencies. These are the equivalent setup commands:

```bash
npm create vite@latest leadflow-crm -- --template react
cd leadflow-crm
npm install react@18 react-dom@18 chart.js react-chartjs-2 lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Replace the generated files with this project's files before starting. Tailwind 3 is intentional: the configuration uses its class-based dark mode and PostCSS integration.

## Project structure

```text
leadflow/
  index.html
  package.json
  package-lock.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    main.jsx
    App.jsx
    index.css
    utils.js
    hooks/
      useLeads.jsx
      useDialog.js
    components/
      Sidebar.jsx
      Header.jsx
      Dashboard.jsx
      MetricCard.jsx
      LeadForm.jsx
      LeadTable.jsx
      LeadRow.jsx
      FilterBar.jsx
      Badges.jsx
      EmptyState.jsx
      Charts.jsx
      ConfirmModal.jsx
      Toast.jsx
  tests/
    utils.test.js
```

## Usage

- Start with zero leads. Choose **Add your first lead** to begin, or use the optional **Load sample data** button for exactly three clearly labeled example leads.
- Name, valid email, and a positive USD deal value are required. Phone is optional and validated when entered. Company and notes are optional.
- Manage leads using live search, status/priority filters, and value/date sorting. Choose a status badge to change stage, pencil to edit, or trash to open deletion confirmation.
- Dashboard and analytics derive all counts and values from the same React lead state. Pipeline excludes Won and Lost; revenue includes Won; conversion is Won / all leads.
- The dashboard shows the five most recently created leads. Editing preserves creation time and lead ID.
- Lead data is persisted under `leadflow.leads.v1`; appearance uses `leadflow.theme`. There is no server, login, synchronization, or external data transfer. Data is specific to the browser and origin; clearing site data deletes it. Do not use a shared browser profile for confidential lead data.
- Storage failures display a warning. Unreadable stored data is not overwritten on load; a new mutation explicitly replaces it.
- Global search opens the Leads view. Metrics and analytics continue to show the complete dataset.
- Dark mode follows the device initially and remembers your selection.
- Delete dialogs and the mobile drawer support Escape, focus trapping, and focus restoration. Form errors have accessible associations; notifications auto-dismiss after three seconds.

## Styling and components

`index.css` only contains Tailwind directives and reusable `@apply` component classes. No separate hand-authored CSS theme is required. StatusBadge and PriorityBadge are exported from Badges.jsx; LeadCard and LeadIdentity are exported from LeadRow.jsx. Chart.js is registered once in Charts.jsx.

The application uses system fonts and bundled icons and does not require external image or font services.
