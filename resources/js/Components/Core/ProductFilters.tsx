import { Department } from '@/types';

interface ProductFiltersProps {
    showSearch?: boolean;
    showDepartment?: boolean;
    showSort?: boolean;
    searchTerm: string;
    selectedDepartment?: string;
    sortBy: string;
    departments?: { data: Department[] };
    onSearchChange: (value: string) => void;
    onDepartmentChange?: (value: string) => void;
    onSortChange: (value: string) => void;
    onClearFilters: () => void;
}

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
];

export function ProductFilters({
    showSearch = true,
    showDepartment = true,
    showSort = true,
    searchTerm,
    selectedDepartment = '',
    sortBy,
    departments,
    onSearchChange,
    onDepartmentChange,
    onSortChange,
    onClearFilters,
}: ProductFiltersProps) {
    const hasActiveFilters = searchTerm || selectedDepartment || sortBy !== 'newest';

    return (
        <div className="container bg-base-200 sticky top-0 z-30 mb-4 border-0 right-0 left-0 mx-auto w-[90%] pt-9">
            <div className="container mx-auto py-6">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                    {showSearch && (
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full
                                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                           transition-all duration-200 bg-gray-50 focus:bg-white"
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 items-center">
                        {showDepartment && departments && onDepartmentChange && (
                            <select
                                value={selectedDepartment}
                                onChange={(e) => onDepartmentChange(e.target.value)}
                                className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white
                                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                           transition-all duration-200 font-medium pr-8"
                            >
                                <option value="">All Departments</option>
                                {departments?.data && Array.isArray(departments.data) && departments.data.map((dept) => (
                                    <option key={dept.id} value={dept.slug}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {showSort && (
                            <select
                                value={sortBy}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white
                                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                           transition-all duration-200 font-medium pr-8"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        {hasActiveFilters && (
                            <button
                                onClick={onClearFilters}
                                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl
                                           hover:bg-gray-200 transition-colors duration-200 font-medium
                                           flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
