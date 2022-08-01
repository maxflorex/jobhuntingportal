import { gql } from '@apollo/client';

const ADD_JOB = gql`
    mutation AddJob(
        $company: String!
        $logo: String!
        $jobTitle: String!
        $jobDesc: String!
        $status: JobStatus!
    ) {
        addJob(
            company: $company
            logo: $logo
            jobTitle: $jobTitle
            jobDesc: $jobDesc
            status: $status
        ) {
            company
            logo
            jobTitle
            jobDesc
            status
        }
    }
`;

const DELETE_JOB = gql`
    mutation DeleteJob($id: ID!) {
        deleteJob(id:$id) {
            id
        }
    }
`;

export { ADD_JOB, DELETE_JOB };
