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
        currentPage !== lastPage && onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        currentPage !== 1 && onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className="pagination" role="navigation" aria-label="pagination">
            {/* ARROWS */}
            <a
                className={`pagination-previous ${
                    currentPage === 1 && 'is-disabled'
                }`}
                title="This is the first page"
                onClick={onPrevious}
            >
                <span className="material-symbols-outlined">arrow_back</span>
            </a>
            <a className={`pagination-next ${currentPage === lastPage && 'is-disabled'}`} onClick={onNext}>
                <span className="material-symbols-outlined">arrow_forward</span>
            </a>

            {/* LIST */}

            <ul className="pagination-list">
                {paginationRange.map((pageNumber: any, i: number) => {
                    // IF PAGE IS DOT, THEN RENDER CODE ICON
                    if (pageNumber === DOTS) {
                        return (
                            <li
                                className={`pagination-link ${
                                    pageNumber == currentPage && 'is-current'
                                }`}
                                key={i}
                            >
                                &#8230;
                            </li>
                        );
                    }

                    // RENDER PAGE PILS
                    return (
                        <li
                            key={i}
                            className={`pagination-link ${
                                pageNumber == currentPage && 'is-current'
                            }`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Pagination;
