interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center py-6">
      {/* Desktop / Tablet: numbered pagination */}
      <div className="hidden sm:flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center text-darkblue-50 hover:text-darkblue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          &#8249;
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-darkblue-100 text-white-100"
                : "text-darkblue-100 hover:bg-grey-50"
            }`}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center text-darkblue-50 hover:text-darkblue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          &#8250;
        </button>
      </div>

      {/* Mobile: PREV / NEXT */}
      <div className="flex sm:hidden items-center gap-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-sm font-bold text-darkblue-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          PREV
        </button>
        <span className="text-sm text-darkblue-50">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-sm font-bold text-darkblue-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
