import { gql } from '@apollo/client';

const GET_JOBS = gql`
    query getJobs {
        jobs {
            id
            company
            logo
            jobTitle
            jobDesc
            category
            # status
            # interviewId
        }
    }
`;

const GET_JOB = gql`
    query getJob($id: ID!) {
        job(id: $id) {
            id
            company
            logo
            jobTitle
            jobDesc
            category
            # status
            # interviewId
        }
    }
`;

export { GET_JOBS, GET_JOB };
