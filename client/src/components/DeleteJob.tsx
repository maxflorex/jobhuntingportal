import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { DELETE_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';

type Props = {
    jobID: string;
};

const DeleteJob = ({ jobID }: Props) => {
    const [show, setShow] = useState(false)

    const [deleteJob]: any = useMutation(DELETE_JOB, {
        variables: { id: jobID },
        refetchQueries: [{ query: GET_JOBS }],
    });

    const closeModal = () => {
        setShow(false);
        document.body.style.overflow = 'auto'
    };

    const handleShowModal = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setShow(true)
        document.body.style.overflow = 'hidden'
    }

    const handleDelete = () => {
        deleteJob().then(() => {
            closeModal()
        })
    }


    return (
        <>
            <button className="material-symbols-outlined btn-light" onClick={handleShowModal}>
                delete
            </button>

            {show &&
                <div className='modal'>
                    <section className='flex-center' style={{ gap: '1rem' }}>
                        <h2> Are you sure about this?</h2>
                        <div className='flex-row'>
                            <button onClick={closeModal}>God, please no! noooo!</button>
                            <button className="btn-danger" onClick={handleDelete}>Yes, delete</button>
                        </div>
                    </section>
                </div>
            }
        </>
    );
};

export default DeleteJob;
