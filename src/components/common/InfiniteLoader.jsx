import React from 'react';
import { Loader2 } from 'lucide-react';

export const InfiniteLoader = () => (
    <div className="flex justify-center items-center py-8">
        <Loader2 className="w-10 h-10 text-[#6fc13e] animate-spin" />
        <span className="sr-only">Loading more songs...</span>
    </div>
);