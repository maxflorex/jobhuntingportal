import { useMutation } from '@apollo/client';
import React from 'react';
import { DELETE_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';

type Props = {
    jobID: string;
};

const DeleteJob = ({ jobID }: Props) => {
    const [deleteJob]: any = useMutation(DELETE_JOB, {
        variables: { id: jobID },
        refetchQueries: [{ query: GET_JOBS }],
    });

    return (
        <button className="button is-danger mx-3 material-symbols-outlined" onClick={deleteJob}>
            delete
        </button>
    );
};

export default DeleteJob;
