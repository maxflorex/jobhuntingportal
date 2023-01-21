import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';
import DeleteJob from './DeleteJob';
import EditJobModal from './EditJobModal';
import Pagination from './Pagination';

type Props = {};

// ITEMS PER PAGINATION
let PageSize = 20;

const JobList = (props: Props) => {
    const [showActions, setShowActions] = useState('');
    const [dataL, setDataL] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [getPagination, setGetPagination] = useState([]);

    const { loading, error, data } = useQuery(GET_JOBS);

    useEffect(() => {
        if (data?.jobs?.length > 0) {
            setDataL(data?.jobs?.length);
        }
    }, [data]);

    // PAGINATION
    useEffect(() => {
        const paginatedData = () => {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return data?.jobs?.slice(firstPageIndex, lastPageIndex);
        };
        setGetPagination(paginatedData());
    }, [currentPage, data]);

    if (loading) return null;
    if (error) return <p>Something went wrong :(</p>;

    return (
        <div className='job-list'>
            <table>


                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Job</th>
                        <th>Link</th>
                        <th>Category</th>
                        <th>Interviews</th>
                        <th>Actions</th>
                    </tr>
                </thead>


                <tbody>
                    {getPagination &&
                        getPagination.map((job: any, i: any) => (
                            <tr
                                key={i}
                                onMouseEnter={() => setShowActions(i)}
                                onMouseLeave={() => setShowActions('')}
                            >
                                <td>
                                    <div>
                                        <img
                                            src={job.logo}
                                            onError={(e: any) =>
                                            (e.target.src =
                                                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png')
                                            }
                                            alt="logo"
                                        />
                                        {job.company}
                                    </div>
                                </td>
                                <td>{job.jobTitle}</td>
                                <td>
                                    <a
                                        href={job.jobDesc}
                                        target="_blank"
                                        className="material-symbols-outlined"
                                    >
                                        link
                                    </a>
                                </td>
                                <td>{job.category}</td>
                                <td>none</td>
                                <td>
                                    <EditJobModal job={job} />
                                    <DeleteJob jobID={job.id} />
                                </td>
                            </tr>
                        ))}
                </tbody>


            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={dataL}
                pageSize={PageSize}
                onPageChange={(page: any) => setCurrentPage(page)}
            />
        </div>
    );
};

export default JobList;
