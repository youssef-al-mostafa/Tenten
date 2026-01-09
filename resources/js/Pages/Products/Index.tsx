import { PageProps, PaginationProps, Product } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ProductItem } from '@/Components/App/ProductItem';
import { Pagination } from '@/Components/Core/Pagination';
import { ProductFilters } from '@/Components/Core/ProductFilters';
import { useState, useEffect, useDeferredValue } from 'react';

interface ProductsIndexProps {
    products: PaginationProps<Product>;
    filters: {
        keyword?: string;
        department?: string;
        sort?: string;
    };
}

const ProductsIndex = ({ products, filters }: ProductsIndexProps) => {
    const { departments } = usePage<PageProps>().props;

    const [searchTerm, setSearchTerm] = useState(filters.keyword || '');
    const [selectedDepartment, setSelectedDepartment] = useState(filters.department || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'newest');

    const deferredSearchTerm = useDeferredValue(searchTerm);

    useEffect(() => {
        const params: any = {
            sort: sortBy,
            department: selectedDepartment,
        };

        if (deferredSearchTerm) {
            params.keyword = deferredSearchTerm;
        }

        router.get(route('products.index'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [deferredSearchTerm, selectedDepartment, sortBy]);

    const handleFilterChange = (type: 'department' | 'sort', value: string) => {
        const params: any = {
            keyword: searchTerm,
        };

        if (type === 'department') {
            setSelectedDepartment(value);
            params.department = value;
            params.sort = sortBy;
        } else {
            setSortBy(value);
            params.department = selectedDepartment;
            params.sort = value;
        }

        router.get(route('products.index'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedDepartment('');
        setSortBy('newest');
        router.get(route('products.index'), {}, {
            preserveState: true,
        });
    };

    return (
        <AppLayout>
            <Head title='All Products'>
                <meta name="description" content="Discover all our amazing products from various vendors. Find exactly what you're looking for with our filtering and search options." />
            </Head>

            <ProductFilters
                showSearch={true}
                showDepartment={true}
                showSort={true}
                searchTerm={searchTerm}
                selectedDepartment={selectedDepartment}
                sortBy={sortBy}
                departments={{ data: departments || [] }}
                onSearchChange={setSearchTerm}
                onDepartmentChange={(value) => handleFilterChange('department', value)}
                onSortChange={(value) => handleFilterChange('sort', value)}
                onClearFilters={clearFilters}
            />

            <div className="bg-base-200 min-h-screen pb-11">
                <div className="container mx-auto w-[90%]">

                    {products.data.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
                                <p className="text-gray-600 mb-6">
                                    We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white
                                               rounded-full font-medium hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {products.data.map((product) => (
                                    <ProductItem key={product.id} product={product} />
                                ))}
                            </div>

                            {products.meta?.links && <Pagination links={products.meta.links} />}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default ProductsIndex;
