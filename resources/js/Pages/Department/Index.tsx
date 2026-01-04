import { Department, PageProps, PaginationProps, Product } from '@/types';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ProductItem } from '@/Components/App/ProductItem';
import { Pagination } from '@/Components/Core/Pagination';
import { ProductFilters } from '@/Components/Core/ProductFilters';
import { useState, useEffect, useDeferredValue } from 'react';

const index = ({
    appName,
    department,
    products,
    filters
}: PageProps<{ department: Department, products: PaginationProps<Product>, filters: { keyword?: string, sort: string } }>) => {
    const [searchTerm, setSearchTerm] = useState(filters.keyword || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'newest');

    const deferredSearchTerm = useDeferredValue(searchTerm);

    useEffect(() => {
        router.get(route('product.byDepartment', department.slug), {
            keyword: deferredSearchTerm,
            sort: sortBy
        }, {
            preserveState: true,
            preserveScroll: true
        });
    }, [deferredSearchTerm, sortBy]);

    const clearFilters = () => {
        setSearchTerm('');
        setSortBy('newest');
        router.get(route('product.byDepartment', department.slug), {}, {
            preserveState: true,
        });
    };
    return (
        <AppLayout>
            <Head>
                <title>{department.name}</title>
                <meta name="title" content={department.meta_title} />
                <meta name="description" content={department.meta_description} />
                <link rel="canonical" href={route('product.byDepartment', department.slug)} />
                <meta property="og: title" content={department.name} />
                <meta property="og: description" content={department.meta_description} />
                <meta property="og: url" content={route('product.byDepartment', department.slug)} />
                <meta property="og: type" content="website" />
                <meta property="og: site_name" content={appName} />
            </Head>

            <div className="bg-base-200 min-h-screen">
                <div className="hero min-h-[120px] container mx-auto w-[90%] pt-8">
                    <div className="hero-content text-center">
                        <div className="max-w-lg">
                            <h1 className="text-5xl font-bold">
                                {department.name}
                            </h1>
                        </div>
                    </div>
                </div>

                <ProductFilters
                    showSearch={true}
                    showDepartment={false}
                    showSort={true}
                    searchTerm={searchTerm}
                    sortBy={sortBy}
                    onSearchChange={setSearchTerm}
                    onSortChange={setSortBy}
                    onClearFilters={clearFilters}
                />

                <div className="container mx-auto w-[90%] py-8">

                {products.data.length === 0 ? (
                    <div className="py-16 px-8 text-center text-gray-300 text-3xl">
                        No products found
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.data.map(product => (
                                <ProductItem product={product} key={product.id} />
                            ))}
                        </div>

                        {products.meta?.links && <Pagination links={products.meta.links} />}
                    </>
                )}
            </div>
        </div>
        </AppLayout>
    );
}

export default index
