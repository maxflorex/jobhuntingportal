import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { DELETE_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';

type Props = {
    jobID: string;
    setShowDelete: any
};

const DeleteJob = ({ jobID, setShowDelete }: Props) => {

    const [deleteJob]: any = useMutation(DELETE_JOB, {
        variables: { id: jobID },
        refetchQueries: [{ query: GET_JOBS }],
    });

    const closeModal = () => {
        setShowDelete(false);
        document.body.style.overflow = 'visible'
    };

    const handleDelete = () => {
        deleteJob().then(() => {
            closeModal()
        })
    }


    return (
        <>
            <div className='modal'>
                <section className='flex-center' style={{ gap: '1rem' }}>
                    <h1 style={{textAlign: 'center', lineHeight: '4rem', margin: '2rem 0'}}> Are you sure about this?</h1>
                    <div className='flex-row'>
                        <button onClick={closeModal}>God, please no! noooo!</button>
                        <button className="btn-danger" onClick={handleDelete}>Yes, delete</button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default DeleteJob;
