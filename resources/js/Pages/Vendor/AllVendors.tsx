import { PageProps, PaginationProps, Vendor } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Store } from 'lucide-react';
import VendorCard from '@/Components/App/VendorCard';
import { Pagination } from '@/Components/Core/Pagination';

interface AllVendorsProps extends Record<string, unknown> {
    vendors: PaginationProps<Vendor>;
}

const AllVendors = ({ vendors }: PageProps<AllVendorsProps>) => {
    return (
        <AppLayout>
            <Head title="All Stores">
                <meta name="description" content="Discover all our verified vendors. Browse stores and find unique products from trusted sellers." />
            </Head>

            <div className="bg-base-200 min-h-screen">
                <div className="container w-[90%] mx-auto py-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">All Stores</h1>
                        <p className="text-gray-600">
                            Discover amazing stores from verified vendors
                        </p>
                    </div>

                    {vendors.data.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <Store className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No vendors found</h3>
                                <p className="text-gray-600">
                                    There are no active vendors at the moment. Check back soon!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {vendors.data.map((vendor) => (
                                    <VendorCard key={vendor.user_id} vendor={vendor} maxProducts={5} />
                                ))}
                            </div>

                            {vendors.meta?.links && <Pagination links={vendors.meta.links} />}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default AllVendors;
