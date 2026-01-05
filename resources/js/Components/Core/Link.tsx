import { Link as InertiaLink, InertiaLinkProps } from '@inertiajs/react';
import { cn } from '@/helpers';

type LinkVariant = 'default' | 'button' | 'primary' | 'secondary' | 'nav' | 'unstyled';

interface LinkProps extends InertiaLinkProps {
    variant?: LinkVariant;
}

export const Link = ({
    variant = 'default',
    className,
    children,
    ...props
}: LinkProps) => {
    const variantStyles: Record<LinkVariant, string> = {
        default: 'outline-none border-none transition-colors',
        button: 'btn btn-primary bg-black hover:bg-black focus:bg-black',
        primary: 'text-white bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors',
        nav: 'text-black',
        unstyled: '',
    };

    return (
        <InertiaLink
            className={cn(variantStyles[variant], className)}
            {...props}
        >
            {children}
        </InertiaLink>
    );
};
