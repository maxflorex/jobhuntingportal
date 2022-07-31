import { gql } from '@apollo/client';

const ADD_JOB = gql`
    mutation AddJob(
        $company: String!
        $logo: String!
        $jobTitle: String!
        $jobDesc: String!
        $status:  JobStatus!
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
// const ADD_JOB = gql`
//     mutation AddJob(
//         $company: String!
//         $logo: String!
//         $jobTitle: String!
//         $jobDesc: String!
//         $status: JobStatus!
//         $interviewId: ID!
//     ) {
//         addJob(
//             company: $company
//             logo: $logo
//             jobTitle: $jobTitle
//             jobDesc: $jobDesc
//             status: $status
//             interviewId: $interviewId
//         ) {
//             company
//             logo
//             jobTitle
//             jobDesc
//             status
//             interviewId
//         }
//     }
// `;

export { ADD_JOB };
