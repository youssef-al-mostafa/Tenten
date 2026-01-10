import { useState, useEffect } from 'react';

const WelcomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisitedTenten');
        if (!hasVisited) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('hasVisitedTenten', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8">
                <div className="flex flex-col gap-5">
                    <div className="flex items-start justify-between">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Welcome
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-3 text-gray-700">
                        <p className="text-base sm:text-lg leading-relaxed">
                            This is a <strong>demo portfolio project</strong> - not a real store.
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed opacity-80">
                            No actual transactions are processed.
                        </p>
                        <div className="pt-2">
                            <p className="text-sm text-gray-600">
                                Built with Laravel , React & TypeScript
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://github.com/youssef-al-mostafa/Tenten"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-900
                                       font-medium py-3 px-4 rounded-lg hover:bg-gray-200
                                       transition-colors duration-200 text-sm sm:text-base">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                            </svg>
                            View Source
                        </a>
                        <button
                            onClick={handleClose}
                            className="flex-1 bg-black text-white font-medium py-3 px-4 rounded-lg
                                       hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base">
                            I Understand
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
