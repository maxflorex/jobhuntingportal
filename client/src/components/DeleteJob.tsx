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
            document.body.style.overflow = 'auto'
        }

    };

    const handleShowModal = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setShow(true)
        document.body.style.overflow = 'hidden'
    }


    return (
        <>
            <button className="button is-danger material-symbols-outlined p-1 is-size-7 column" onClick={handleShowModal}>
                delete
            </button>

            {show &&
                <div className='modal'>
                    <div onClick={closeModal} />
                    <section>
                        <div>
                            <h1> Are you sure about this?</h1>
                            <div>
                                <button className="button is-primary dismiss" onClick={closeModal}>God, please no! noooo!</button>
                                <button className="button is-danger">Hell yes!</button>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </>
    );
};

export default DeleteJob;
