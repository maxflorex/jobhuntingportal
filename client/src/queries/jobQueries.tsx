import { gql } from '@apollo/client';

const GET_JOBS = gql`
    query getJobs {
        jobs {
            company
            logo
            jobTitle
            jobDesc
            # status
            # interviewId
        }
    }
`;

const GET_JOB = gql`
    query getJob($id: ID!) {
        job(id: $id) {
            company
            logo
            jobTitle
            jobDesc
            # status
            # interviewId
        }
    }
`;

export { GET_JOBS, GET_JOB };
