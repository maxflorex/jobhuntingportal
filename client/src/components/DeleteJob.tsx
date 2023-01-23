import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DELETE_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';

type Props = {
    jobID: string;
    setShowDelete: any
};

const DeleteJob = ({ jobID, setShowDelete }: Props) => {

    const id = useSelector((state: any) => state.currentState.value.id)

    const [deleteJob]: any = useMutation(DELETE_JOB, {
        variables: { id: jobID },
        refetchQueries: [{ query: GET_JOBS, variables: { userId: id } }],
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
                    <h1 style={{ textAlign: 'center', lineHeight: '4rem', margin: '2rem 0' }}> Are you sure about this?</h1>
                    <div className='flex-row'>
                        <button className="btn-danger" onClick={closeModal}>God, please no! noooo!</button>
                        <button onClick={handleDelete}>Yes, delete</button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default DeleteJob;
