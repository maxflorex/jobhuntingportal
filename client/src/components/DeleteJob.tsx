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

    const closeModal = (e: any) => {
        if (e.target.classList.contains('dismiss')) {
            setShow(false);
        }
    };


    return (
        <>
            <button className="button is-danger material-symbols-outlined p-1 is-size-7 column" onClick={() => setShow(true)}>
            delete
        </button>
        <div className={`modal ${show && 'is-active'}`}>
                <div
                    className="modal-background dismiss z-5"
                    onClick={closeModal}
                />
                <section className="section">
                    <div
                        className="box is-shadowless z-10 p-6"
                    >
                       <h1 className='has-text-centered pb-4'> Are you sure about this?</h1>
                        <div className="columns">
                            <div className="column">

                            <button className="button is-primary dismiss" onClick={closeModal}>God, please no! noooo!</button>
                            </div>
                            <div className="column">

                            <button className="button is-danger">Hell yes!</button>
                            </div>
                        </div>
                        </div></section>
            </div>
        </>
    );
};

export default DeleteJob;
