import { usePagination, DOTS } from '../hooks/usePagination';

const Pagination = (props: any) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    // PAGINATION RANGE
    const paginationRange: any = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // IF < THAN TWO TIMES - DO NOT RENDER
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        // <ul className="flex gap-4 justify-center items-center w-full">
        //     {/* LEFT ARROW */}
        //     {currentPage !== 1 && (
        //         <li onClick={onPrevious} className="cursor-pointer">
        // <span className="material-symbols-outlined">
        //     arrow_back
        // </span>
        //         </li>
        //     )}
        //     {paginationRange.map((pageNumber: any, i: number) => {
        //         // IF PAGE IS DOT, THEN RENDER CODE ICON
        //         if (pageNumber === DOTS) {
        //             return (
        //                 <li className="pagination-item dots" key={i}>
        //                     &#8230;
        //                 </li>
        //             );
        //         }

        //         // RENDER PAGE PILS
        //         return (
        //             <li
        //                 key={i}
        //                 className={`cursor-pointer ${
        //                     pageNumber == currentPage ? 'bg-off-3' : 'bg-off-1'
        //                 } rounded-full px-4 py-2 hover:scale-125`}
        //                 onClick={() => onPageChange(pageNumber)}
        //             >
        //                 {pageNumber}
        //             </li>
        //         );
        //     })}
        //     {/* RIGHT ARROW */}
        //     {currentPage !== lastPage && (
        //         <li onClick={onNext} className="cursor-pointer">
        //             <span className="material-symbols-outlined">
        //                 arrow_forward
        //             </span>
        //         </li>
        //     )}
        // </ul>

        <div className="pagination" role="navigation" aria-label="pagination">
            <a
                className="pagination-previous is-disabled"
                title="This is the first page"
            >
                <span className="material-symbols-outlined">arrow_back</span>{' '}
            </a>
            <a className="pagination-next">
                <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <ul className="pagination-list">
                <li>
                    <a
                        className="pagination-link is-current"
                        aria-label="Page 1"
                        aria-current="page"
                    >
                        1
                    </a>
                </li>
                <li>
                    <a className="pagination-link" aria-label="Goto page 2">
                        2
                    </a>
                </li>
                <li>
                    <a className="pagination-link" aria-label="Goto page 3">
                        3
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
