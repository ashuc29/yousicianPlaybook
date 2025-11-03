import React from 'react';
import { Loader2 } from 'lucide-react';

export const FullPageLoader = () => (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-80 flex items-center justify-center z-50">
        <Loader2 className="w-16 h-16 text-[#6fc13e] animate-spin" />
    </div>
);
