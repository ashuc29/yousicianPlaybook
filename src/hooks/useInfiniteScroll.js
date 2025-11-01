
import { useRef, useCallback } from 'react';

export const useInfiniteScroll = ({ isLoading, hasMore, onLoadMore }) => {
    const observer = useRef();

    const lastElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    onLoadMore();
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore, onLoadMore]
    );

    return lastElementRef;
};