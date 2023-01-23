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
        deleteJob(id: $id) {
            id
        }
    }
`;

const UPDATE_JOB = gql`
    mutation UpdateJob(
        $id: ID!
        $company: String!
        $logo: String!
        $jobTitle: String!
        $jobDesc: String!
        # MAKE SURE TO PUT THE NEW UNIQUE NAME
        $category: CategoryUpdate!
    ) {
        updateJob(
            id: $id
            company: $company
            logo: $logo
            jobTitle: $jobTitle
            jobDesc: $jobDesc
            category: $category
        ) {
            company
            logo
            jobTitle
            jobDesc
            category
        }
    }
`;

const USER_LOGIN = gql`
    mutation UserLogin(
        $username: String!
        # $email: String!
        $pw: String!
    ) {
        userLogin(data: { username: $username, pw: $pw }) {
            id
            username
            email
        }
    }
`;

const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $pw: String!) {
        addUser(data: { username: $username, email: $email, pw: $pw }) {
            id
            username
            email
        }
    }
`;

const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!
        $username: String
        $email: String
        $pw: String
    ) {
        updateUser(
            id: $id
            data : {
                username: $username
                email: $email
                pw: $pw
                balance: $balance
                }
            ) {
                id
                username
                email
                balance                
            }

    }
`

const DELETE_USER = gql`
    mutation DeleteUser(
        $id: ID!
    ) {
        deleteUser(
            id: $id
        ) {
            id
            username
            email
        }
    }
`

export { ADD_JOB, DELETE_JOB, UPDATE_JOB, USER_LOGIN, ADD_USER, UPDATE_USER, DELETE_USER };
