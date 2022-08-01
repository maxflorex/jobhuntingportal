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
        <span className="deletebtn" onClick={deleteJob}>
            <button className="delete" />
        </span>
    );
};

export default DeleteJob;
