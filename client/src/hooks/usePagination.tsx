import { useMemo } from 'react';

// DOTS
export const DOTS = '...';

// DEFINE RANGE
const range = (start: any, end: any) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

// HOOK
export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}: any) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // PAGE COUNT - DETERMINED AS SIBLING (FIRST P + lAST P + CURRENT P + DOTS)
        const totalPageNumbers = siblingCount + 5;

        // PAGES < PAGES TO SHOW ? RETURN RANGE
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        // SHOW PAGINATION ONLY IF THERE'S MORE THAN ONE POSITION LEFT
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};
