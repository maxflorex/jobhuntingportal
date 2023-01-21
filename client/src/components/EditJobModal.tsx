import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { UPDATE_JOB } from '../mutations/JobMutation';
import { GET_JOB } from '../queries/jobQueries';

type Props = {
    job: any;
};

const EditJobModal = ({ job }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [company, setCompany] = useState(job.company);
    const [logo, setLogo] = useState(job.logo);
    const [jobTitle, setJobTitle] = useState(job.jobTitle);
    const [jobDesc, setJobDesc] = useState(job.jobDesc);
    const [category, setCategory] = useState(job.category);

    const closeModal = (e: any) => {
        if (e.target.classList.contains('dismiss')) {
            setShowModal(false);
            document.body.style.overflow = 'auto'
        }
    };

    const [updateJob]: any = useMutation(UPDATE_JOB, {
        variables: { id: job.id, company, logo, jobTitle, jobDesc, category },
        refetchQueries: [{ query: GET_JOB, variables: { id: job.id } }],
    });

    const update = (e: any) => {
        e.preventDefault();
        if (
            company === '' ||
            logo === '' ||
            jobTitle === '' ||
            jobDesc === ''
        ) {
            return alert('Please fill all fields');
        }

        updateJob(company, logo, jobTitle, jobDesc, category).then(() => {
            console.log('Updated!');
        });
        setShowModal(false);
    };

    const handleShowModal = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setShowModal(true)
        document.body.style.overflow = 'hidden'
    }

    return (
        <>

            <button onClick={handleShowModal} >
                <span className="material-symbols-outlined">edit</span>
            </button>

            {showModal &&

                <div className='modal' onClick={closeModal}>
                    <section className="flex-center">
                        <form onSubmit={update}>


                            {/* COMPANY */}
                            <label className="label">Company</label>
                            <input
                                className="input mt-2"
                                type="text"
                                value={company}
                                placeholder="Company Name"
                                onChange={(e) => setCompany(e.target.value)}
                            />
                            {/* LOGO */}
                            <label className="label">Logo</label>
                            <input
                                className="input mt-2"
                                type="text"
                                placeholder="Logo URL"
                                value={logo}
                                onChange={(e) => setLogo(e.target.value)}
                            />

                            {/* JOB */}
                            <label className="label">Job</label>
                            <input
                                className="input mt-2"
                                type="text"
                                placeholder="Job Name"
                                value={jobTitle}
                                onChange={(e) =>
                                    setJobTitle(e.target.value)
                                }
                            />

                            {/* DESCRIPTION */}
                            <label className="label">Description</label>
                            <textarea
                                className="textarea mt-2"
                                placeholder="Job Description"
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                            />

                            {/* CATEGORY */}
                            <div className="select mt-3">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="Production">Production</option>
                                    <option value="Design">Design</option>
                                    <option value="Development">Development</option>
                                </select>
                            </div>

                            <button className="button is-primary" type="submit">
                                Submit
                            </button>
                        </form>
                    </section>
                    <button onClick={closeModal} className='dismiss'>Close</button>
                </div>
            }
        </>
    );
};

export default EditJobModal;
