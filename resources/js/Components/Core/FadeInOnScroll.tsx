import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function FadeInOnScroll({ children, delay = 0, className = '' }: Props) {
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: prefersReducedMotion ? 0 : 1,
                delay: prefersReducedMotion ? 0 : delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
