import { gql } from '@apollo/client';

const ADD_INTERVIEW = gql`
    mutation addInterview(
        $InterviewDate: String!
        $notes: String!
        $interviewer: String!
        $status: InterviewStatus!
        $jobId: ID!
    ) {
        AddInterview(
            InterviewDate: $InterviewDate
            notes: $notes
            interviewer: $interviewer
            status: $status
            jobId: $jobId
        ) {
            InterviewDate
            notes
            interviewer
            status
            jobId
        }
    }
`;
