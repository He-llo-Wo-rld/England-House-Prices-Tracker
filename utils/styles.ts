
export const CONTAINER_STYLES = {
  page: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100",
  section: "container mx-auto px-4 py-8",
  card: "bg-white rounded-2xl shadow-lg",
  cardPadding: "p-6",
  maxWidth: {
    sm: "max-w-4xl mx-auto",
    md: "max-w-5xl mx-auto",
    lg: "max-w-6xl mx-auto",
    xl: "max-w-7xl mx-auto",
  },
} as const;

export const TEXT_STYLES = {
  heading: {
    xl: "text-4xl font-bold text-gray-900",
    lg: "text-3xl font-bold text-gray-900",
    md: "text-2xl font-bold text-gray-900",
    sm: "text-xl font-bold text-gray-800",
  },
  subtitle: "text-xl text-gray-600",
  body: "text-gray-700",
  small: "text-sm text-gray-500",
} as const;

export const BUTTON_STYLES = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors",
  secondary:
    "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors",
  search: "px-8 py-4 text-lg rounded-xl",
} as const;

export const GRID_STYLES = {
  responsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  wide: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
  stats: "grid grid-cols-2 md:grid-cols-4 gap-4",
} as const;
