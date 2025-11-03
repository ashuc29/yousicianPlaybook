import React from 'react';
import { Loader2 } from 'lucide-react';

export const InfiniteLoader = () => (
    <div className="flex justify-center items-center py-8">
        <Loader2 className="w-10 h-10 text-[var(--color-grey-light)] animate-spin" />
        <span className="sr-only">Loading more songs...</span>
    </div>
);