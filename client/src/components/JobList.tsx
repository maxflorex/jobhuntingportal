import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../queries/jobQueries';

type Props = {};

const JobList = (props: Props) => {
    const { loading, error, data } = useQuery(GET_JOBS);

    if (loading) return null;
    if (error) return <p>Something went wrong :(</p>;

    return (
        <div className="section has-background-danger has-text-white texture">
            <div className="content">
                <ol type="1">
                    {data &&
                        data.jobs.map((job: any, i: number) => (
                            <li key={i}>{job.company}</li>
                        ))}
                </ol>
            </div>
        </div>
    );
};

export default JobList;
