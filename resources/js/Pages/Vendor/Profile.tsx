import { PageProps, PaginationProps, Product, Vendor } from '@/types';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ProductItem } from '@/Components/App/ProductItem';
import { Pagination } from '@/Components/Core/Pagination';
import { MapPin, Package, Star, Calendar, Share2 } from 'lucide-react';
import { formatStoreName } from '@/helpers';
import FadeInOnScroll from '@/Components/Core/FadeInOnScroll';
import StaggerContainer from '@/Components/Core/StaggerContainer';
import StaggerItem from '@/Components/Core/StaggerItem';

function Profile({
    vendor,
    products,
    filters
}: PageProps<{ vendor: Vendor, products: PaginationProps<Product>, filters: { keyword?: string, sort: string } }>) {
    const totalProducts = products.data.length;
    const memberSince = new Date(vendor.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });

    const handleShareStore = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${vendor.store_name} - Store`,
                    text: `Check out ${vendor.store_name} on TenTen`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Store link copied to clipboard!');
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(route('vendor.profile', vendor.store_name), {
            sort: e.target.value,
            keyword: filters.keyword
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <AppLayout>
            <Head title={`${vendor.store_name} - Store Profile`} />

            <div className="bg-base-200 min-h-screen">
                <div className="container mx-auto py-4 md:py-8 w-[90%] max-w-7xl px-4">
                        <FadeInOnScroll>
                            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                                    {vendor.cover_image ? (
                                        <img
                                            src={`/storage/${vendor.cover_image}`}
                                            alt={vendor.store_name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-xl md:text-2xl font-bold text-gray-600">
                                            {vendor.store_name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h1 className="text-2xl md:text-3xl font-bold text-base-content mb-2">
                                            {formatStoreName(vendor.store_name)}
                                        </h1>
                                        {vendor.user?.name && (
                                            <p className="text-base-content/70 text-sm mb-3 md:mb-4">
                                                {vendor.user.name}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-1 text-base-content/70 text-sm mb-3 md:mb-4">
                                            <Calendar className="w-4 h-4" />
                                            <span>Member since {memberSince}</span>
                                        </div>
                                        {vendor.store_address && (
                                            <div className="flex items-center gap-2 text-base-content/70 text-sm mb-3 md:mb-4">
                                                <MapPin className="w-4 h-4" />
                                                <span>{vendor.store_address}</span>
                                            </div>
                                        )}
                                        {vendor.store_description && (
                                            <p className="text-base-content/80 text-sm md:text-base leading-relaxed">
                                                {vendor.store_description}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleShareStore}
                                        className="w-full sm:w-auto whitespace-nowrap bg-black text-white hover:bg-gray-800
                                                   px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                                        <Share2 className="w-4 h-4" />
                                        Share Store
                                    </button>
                                </div>
                            </div>
                            </div>
                        </FadeInOnScroll>

                        <div className="mt-8 md:mt-12">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                                <h2 className="text-xl md:text-2xl font-bold text-base-content">
                                    Products ({totalProducts})
                                </h2>
                                <div className="flex gap-2">
                                    <select
                                        className="select select-bordered select-sm h-fit w-full sm:w-auto"
                                        value={filters.sort}
                                        onChange={handleSortChange}
                                    >
                                        <option value="newest">Sort by: Latest</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                        <option value="name">Name</option>
                                    </select>
                                </div>
                            </div>

                            {products.data.length > 0 ? (
                                <>
                                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                        {products.data.map(product => (
                                            <StaggerItem key={product.id}>
                                                <ProductItem product={product} />
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>

                                    {products.meta?.links && <Pagination links={products.meta.links} />}
                                </>
                            ) : (
                                <div className="text-center py-12 md:py-16 px-4">
                                    <Package className="w-12 h-12 md:w-16 md:h-16 mx-auto text-base-content/30 mb-4" />
                                    <h3 className="text-lg md:text-xl font-bold text-base-content mb-2">
                                        No Products Yet
                                    </h3>
                                    <p className="text-sm md:text-base text-base-content/70">
                                        This store hasn't listed any products yet. Check back soon!
                                    </p>
                                </div>
                            )}
                        </div>
                </div>
            </div>
        </AppLayout>
    );
}
export default Profile
