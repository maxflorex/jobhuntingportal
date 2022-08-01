import { gql } from '@apollo/client';

const ADD_INTERVIEW = gql`
    mutation addInterview(
        $interviewDate: String!
        $notes: String!
        $interviewer: String!
        # $status: InterviewStatus!
        # $jobId: ID!
    ) {
        addInterview(
            interviewDate: $interviewDate
            notes: $notes
            interviewer: $interviewer
            # status: $status
            # jobId: $jobId
        ) {
            interviewDate
            notes
            interviewer
            # status
            # jobId
        }
    }
`;

export { ADD_INTERVIEW };
