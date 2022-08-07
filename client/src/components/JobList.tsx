import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';
import DeleteJob from './DeleteJob';
import EditJobModal from './EditJobModal';
import Pagination from './Pagination';

type Props = {};

// ITEMS PER PAGINATION
let PageSize = 12;

const JobList = (props: Props) => {
    const [showActions, setShowActions] = useState('');
    //
    const [currentPage, setCurrentPage] = useState(1);
    const [getPagination, setGetPagination] = useState([]);

    const { loading, error, data } = useQuery(GET_JOBS);

    if (loading) return null;
    if (error) return <p>Something went wrong :(</p>;

    // PAGINATION
    const dataLength: any = data.jobs.length;

    // useEffect(() => {
    //     const paginatedData = () => {
    //         const firstPageIndex = (currentPage - 1) * PageSize;
    //         const lastPageIndex = firstPageIndex + PageSize;
    //         return data.slice(firstPageIndex, lastPageIndex);
    //     };
    //     setGetPagination(paginatedData());
    // }, [currentPage, data]);
    
    return (
        <div className="section has-background-white">
            <table className="table is-fullwidth is-hoverable">
                <thead className="has-background-white sticky2 texture">
                    <tr>
                        <th>#</th>
                        <th>Company</th>
                        <th>Job</th>
                        <th>Link</th>
                        <th>Category</th>
                        <th>Interviews</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <>
                    <tbody>
                        {data &&
                            data.jobs.map((job: any, i: any) => (
                                <tr
                                    key={i}
                                    onMouseEnter={() => setShowActions(i)}
                                    onMouseLeave={() => setShowActions('')}
                                >
                                    <td className="is-size-7">{i + 1}</td>
                                    <td className="is-flex is-align-items-center">
                                        <img
                                            src={job.logo}
                                            onError={(e: any) =>
                                                (e.target.src =
                                                    'https://www.turnkeytec.com/wp-content/uploads/2020/07/placeholder-image-400x300.jpg')
                                            }
                                            alt="logo"
                                            className="logo mr-4"
                                        />
                                        <h2 className="is-size-7 is-italic">
                                            {job.company}
                                        </h2>
                                    </td>
                                    <td className="has-text-weight-semibold is-size-7">
                                        {' '}
                                        {job.jobTitle}{' '}
                                    </td>
                                    <td>
                                        <a
                                            href={job.jobDesc}
                                            target="_blank"
                                            className="material-symbols-outlined"
                                        >
                                            link
                                        </a>
                                    </td>
                                    <td className="is-size-7">
                                        {job.category}
                                    </td>
                                    <td>none</td>
                                    <td className="is-3">
                                        {showActions === i && (
                                            <div className="">
                                                <EditJobModal job={job} />
                                                <DeleteJob jobID={job.id} />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </>
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={dataLength}
                pageSize={PageSize}
                onPageChange={(page: any) => setCurrentPage(page)}
            />
        </div>
    );
};

export default JobList;
