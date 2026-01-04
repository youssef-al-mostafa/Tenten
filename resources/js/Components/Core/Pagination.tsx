import { router } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

export function Pagination({ links }: PaginationProps) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
                {links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (link.url) {
                                router.get(link.url, {}, {
                                    preserveState: true,
                                });
                            }
                        }}
                        disabled={!link.url}
                        className={`min-w-[40px] px-4 py-2 rounded-lg font-satoshi font-medium transition-all duration-200 ${
                            link.active
                                ? 'bg-black text-white shadow-md'
                                : link.url
                                    ? 'bg-white text-gray-700 hover:bg-black hover:text-white border border-gray-300'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
