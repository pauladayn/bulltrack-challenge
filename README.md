# Bulltrack - Bull Ranking Dashboard

A bull classification dashboard that allows producers to filter and sort bulls based on a personalized "Bull Score" and specific technical criteria to optimize their production.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Context API with useReducer
- **Charts**: [Recharts](https://recharts.org/) (Pentagonal radar chart)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript
- **Testing**: Vitest + React Testing Library

## Project Structure

```
bulltrack/
├── app/                    # Next.js App Router
│   ├── actions/           # Server Actions (data fetching)
│   ├── globals.css        # Global styles and design tokens
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── bulls/             # Bull domain components
│   │   ├── BullBadge.tsx      # Tags/badges
│   │   ├── BullCard.tsx       # Bull card (list view)
│   │   ├── BullCardCompact.tsx # Bull card (grid view)
│   │   ├── BullDetailModal.tsx # Detail modal
│   │   ├── BullGrid.tsx       # Grid container
│   │   ├── BullScore.tsx      # Score component
│   │   ├── BullScoreDetail.tsx # Detailed score (modal)
│   │   ├── BullToolbar.tsx    # Search bar and view toggle
│   │   ├── RadarChart.tsx     # Radar chart
│   │   └── RankingCriteria.tsx # Ranking criteria (accordion)
│   ├── filters/           # Filter constants
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   │   ├── OnboardingModal.tsx
│   │   ├── Sidebar.tsx
│   │   └── ExportButton.tsx
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Checkbox.tsx
│       ├── Divider.tsx
│       ├── EditCriteriaButton.tsx
│       ├── FavoriteButton.tsx
│       ├── Modal.tsx
│       ├── SearchInput.tsx
│       ├── SectionTitle.tsx
│       ├── Select.tsx
│       ├── Toast.tsx
│       ├── Toggle.tsx
│       ├── ViewButton.tsx
│       └── ViewModeToggle.tsx
├── context/               # React Context providers
│   └── FiltersContext.tsx # Global filter and favorites state
├── data/                  # Mock data
│   └── bulls_data.json
├── hooks/                 # Custom hooks
│   └── useToast.ts
├── lib/                   # Utilities and constants
│   ├── bulls.ts          # Bull-related utilities
│   ├── constants.ts      # App constants
│   ├── filters.ts        # Filter logic
│   └── utils.ts          # General utilities
├── public/               # Static assets
│   └── images/
└── types/                # TypeScript types
    ├── bulls.ts
    └── filters.ts
```

## Features

- **Dynamic listing**: Renders bulls from `bulls_data.json` via Server Action
- **Onboarding modal**: Shown on first app visit
- **Favorites system**: Mark/unmark bulls (persisted in sessionStorage)
- **Sidebar filters**:
  - Origin: Own, Catalog, All, Favorites
  - Usage: Toggle for "For heifer"
  - Coat: Black, Red, All
- **Sorting**: By Bull Score (ascending/descending)
- **Search**: Filter by tag, name, or breed in real-time
- **Views**: List and grid
- **Radar chart**: Pentagonal visualization of genetic characteristics

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Run production
npm start

# Run tests
npm test
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Tokens

Colors and spacing are defined as CSS variables in `app/globals.css`:

- Brand colors: `--brand-green`, `--brand-green-dark`
- Sidebar colors: `--sidebar`, `--sidebar-card`
- Text colors: `--text-primary`, `--text-secondary`, `--text-muted`
- Dividers: `--divider`, `--divider-dark`
