import { navigateTo } from '@/helpers';
import { TopVendor } from '@/types';
import VendorCard from './VendorCard';
import FadeInOnScroll from '@/Components/Core/FadeInOnScroll';
import StaggerContainer from '@/Components/Core/StaggerContainer';
import StaggerItem from '@/Components/Core/StaggerItem';

interface TopVendorsProps {
    content?: {
        title?: string;
        view_all_button?: string;
        is_active?: boolean;
        sort_order?: number;
    };
    topVendors?: TopVendor[];
}

export const goToAllVendorsPage = () => {
    navigateTo('vendor.all');
}

const TopVendors = ({ content, topVendors: vendorsData }: TopVendorsProps) => {
    const topVendors = vendorsData && vendorsData.length > 0 ? vendorsData : null;

    return (
        <section className="mx-auto w-[90%] container py-16 bg-transparent">
            <div className="container">
                <FadeInOnScroll>
                    <div className="flex items-center justify-center mb-12">
                        {content?.title && (
                            <h2 className="font-archivo text-black
                                           text-3xl lg:text-4xl text-center">
                                {content.title}
                            </h2>
                        )}
                    </div>
                </FadeInOnScroll>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topVendors?.map((vendor) => (
                        <StaggerItem key={vendor.id}>
                            <VendorCard vendor={vendor} maxProducts={3} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
            {content?.view_all_button && (
                <FadeInOnScroll delay={0.2}>
                    <button className="btn bg-white text-black border-2 border-black rounded-full
                                       px-6 sm:px-8 py-2 sm:py-3 font-satoshi font-medium text-sm
                                       sm:text-base hover:bg-black hover:text-white transition-all
                                       duration-300 w-full sm:w-auto min-w-[200px] mx-auto mt-[3rem] flex"
                        onClick={goToAllVendorsPage}>
                        {content.view_all_button}
                    </button>
                </FadeInOnScroll>
            )}
        </section>
    );
};

export default TopVendors;
