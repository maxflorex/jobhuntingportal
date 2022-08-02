import { gql } from '@apollo/client';

const ADD_JOB = gql`
    mutation AddJob(
        $company: String!
        $logo: String!
        $jobTitle: String!
        $jobDesc: String!
        $category: Category!
        $status: JobStatus!
    ) {
        addJob(
            company: $company
            logo: $logo
            jobTitle: $jobTitle
            jobDesc: $jobDesc
            category: $category
            status: $status
        ) {
            company
            logo
            jobTitle
            jobDesc
            category
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
