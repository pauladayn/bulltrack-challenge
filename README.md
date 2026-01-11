# Bulltrack - Bull Ranking Dashboard

Dashboard de clasificación de toros que permite a los productores filtrar y ordenar toros basándose en un "Bull Score" personalizado y criterios técnicos específicos para optimizar su producción.

## Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Context API
- **Charts**: [Recharts](https://recharts.org/) (Radar chart pentagonal)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## Estructura del Proyecto

```
bulltrack/
├── app/                    # Next.js App Router
│   ├── actions/           # Server Actions (data fetching)
│   ├── globals.css        # Estilos globales y design tokens
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Página principal
├── components/
│   ├── bulls/             # Componentes del dominio de toros
│   │   ├── BullBadge.tsx      # Badges/etiquetas
│   │   ├── BullCard.tsx       # Card de toro (vista lista)
│   │   ├── BullCardCompact.tsx # Card de toro (vista grilla)
│   │   ├── BullDetailModal.tsx # Modal de detalle
│   │   ├── BullGrid.tsx       # Contenedor de la grilla
│   │   ├── BullScore.tsx      # Componente de score
│   │   ├── BullScoreDetail.tsx # Score detallado (modal)
│   │   ├── BullToolbar.tsx    # Barra de búsqueda y vista
│   │   ├── RadarChart.tsx     # Gráfico radar
│   │   └── RankingCriteria.tsx # Criterios de ranking (accordion)
│   ├── filters/           # Constantes de filtros
│   ├── layout/            # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   │   ├── OnboardingModal.tsx
│   │   ├── Sidebar.tsx
│   │   └── ExportButton.tsx
│   └── ui/                # Componentes UI reutilizables
│       ├── Button.tsx
│       ├── Checkbox.tsx
│       ├── Modal.tsx
│       ├── SearchInput.tsx
│       ├── Select.tsx
│       ├── Toast.tsx
│       └── Toggle.tsx
├── context/               # React Context providers
│   └── FiltersContext.tsx # Estado global de filtros y favoritos
├── data/                  # Datos mock
│   └── bulls_data.json
├── lib/                   # Utilidades y constantes
│   ├── constants.ts
│   └── utils.ts
├── public/                # Assets estáticos
│   └── images/
└── types/                 # TypeScript types
    ├── bulls.ts
    └── filters.ts
```

## Funcionalidades

- **Listado dinámico**: Renderiza los toros desde `bulls_data.json` vía Server Action
- **Modal de onboarding**: Se muestra al ingresar a la app
- **Sistema de favoritos**: Marcar/desmarcar toros (persiste en sessionStorage)
- **Filtros del sidebar**:
  - Origen: Propios, Catálogo, Todos, Favoritos
  - Uso: Toggle para "Para vaquillona"
  - Pelaje: Negro, Colorado, Todos
- **Ordenamiento**: Por Bull Score (mayor a menor y viceversa)
- **Búsqueda**: Filtra por caravana, nombre o raza en tiempo real
- **Vistas**: Lista y grilla
- **Gráfico radar**: Visualización pentagonal de características genéticas

## Getting Started

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Build de producción
npm run build

# Correr producción
npm start
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Design Tokens

Los colores y espaciados están definidos como CSS variables en `app/globals.css`:

- Brand colors: `--brand-green`, `--brand-green-dark`
- Sidebar colors: `--sidebar-bg`, `--sidebar-card`
- Text colors: `--text-primary`, `--text-secondary`, `--text-muted`
- Spacing (radius): `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`
