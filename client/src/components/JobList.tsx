import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { DELETE_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';
import DeleteJob from './DeleteJob';

type Props = {};

const JobList = (props: Props) => {
    const [showActions, setShowActions] = useState('');

    const { loading, error, data } = useQuery(GET_JOBS);

    if (loading) return null;
    if (error) return <p>Something went wrong :(</p>;

    return (
        <div className="section has-background-white">
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Job</th>
                        <th>Description</th>
                        <th>Interviews</th>
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
                                    <td>{job.company}</td>
                                    <td>{job.jobTitle}</td>
                                    <td>{job.jobDesc}</td>
                                    <td>
                                        none
                                        {showActions === i && (
                                            <DeleteJob jobID={job.id} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </>
            </table>
        </div>
    );
};

export default JobList;
