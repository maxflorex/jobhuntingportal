import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';
import DeleteJob from './DeleteJob';
import EditJobModal from './EditJobModal';
import Pagination from './Pagination';
import { useSelector } from 'react-redux'
import _ from 'lodash';

// ITEMS PER PAGINATION
let PageSize = 20;

const JobList = () => {
    const [dataL, setDataL] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [getPagination, setGetPagination] = useState([]);
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [selectedJob, setSelectedJob] = useState([])
    const [selectedId, setSelectedId] = useState('')
    const suggestions = useSelector((state: any) => state.suggestions.value)

    // LOADASH
    const chunkedSuggestions = _.chunk(suggestions, 4);

    // FECTH JOBS
    const { loading, error, data } = useQuery(GET_JOBS);

    // DATA LOADER LISTENER
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

    // DISPLAY DATA
    const results = () => {
        if (getPagination && suggestions.length === 0) {
            return getPagination
        } else {
            return chunkedSuggestions[0]
        }
    }

    // HANDLERS
    const getId = (e: React.SyntheticEvent, id: string) => {
        e.preventDefault()
        setSelectedId(id)
        setShowDelete(true)
    }

    const getJob = (e: React.SyntheticEvent, job: any) => {
        e.preventDefault()
        setSelectedJob(job)
        setShowEdit(true)
    }


    // RETURNS
    if (loading) return null;
    if (error) return <p>Something went wrong :(</p>;

    return (<>
        <div className='job-list'>
            <table>

                <thead>
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


                <tbody>
                    {results()?.map((job: any, i: any) => (
                        <tr
                            key={i}
                        >
                            <td data-label='#'>{i + 1}</td>
                            <td data-label='Company'>
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
                            <td data-label='Title'>{job.jobTitle}</td>
                            <td data-label='Link'>
                                <a
                                    href={job.jobDesc}
                                    target="_blank"
                                    className="material-symbols-outlined btn-light"
                                >
                                    link
                                </a>
                            </td>
                            <td data-label='Category'>{job.category}</td>
                            <td data-label='Interview'>none</td>
                            <td data-label='Actions'>
                                <div>
                                    <button className="material-symbols-outlined btn-light" onClick={(e) => getJob(e, job)}>edit</button>
                                    <button className="material-symbols-outlined btn-light" onClick={(e) => getId(e, job.id)}>delete</button>
                                </div>
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
        {showEdit && <EditJobModal job={selectedJob} setShowEdit={setShowEdit} />}
        {showDelete && <DeleteJob jobID={selectedId} setShowDelete={setShowDelete} />}
    </>
    );
};

export default JobList;
