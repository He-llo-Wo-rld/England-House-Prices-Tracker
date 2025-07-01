interface SearchTagProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SearchTag({
  children,
  onClick,
  className = "",
}: SearchTagProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 ${className}`}
    >
      {children}
    </button>
  );
}
