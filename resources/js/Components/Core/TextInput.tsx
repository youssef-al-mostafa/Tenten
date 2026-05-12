import {
    InputHTMLAttributes,
    Ref,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    ref?: Ref<{ focus: () => void }>;
};

export default function TextInput({
    type = 'text',
    className = '',
    isFocused = false,
    ref,
    ...props
}: TextInputProps) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md shadow-sm border-gray-700 text-black focus:border-gray-600  focus:ring-gray-600 bg-white ' +
                className
            }
            ref={localRef}
        />
    );
}
