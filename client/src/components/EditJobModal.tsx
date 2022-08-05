import { useMutation } from '@apollo/client';
import { useState } from 'react';
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

    return (
        <>
            <button
                className="button is-primary"
                onClick={() => setShowModal(!showModal)}
            >
                <span className="material-symbols-outlined">edit</span>
            </button>
            <div className={`modal ${showModal && 'is-active'}`}>
                <div
                    className="modal-background dismiss z-5"
                    onClick={closeModal}
                />
                <section className="section">
                    <form
                        className="box is-shadowless z-10 p-6"
                        onSubmit={update}
                    >
                        {/* COMPANY */}

                        <div className="field">
                            <label className="label">Company</label>
                            <div className="control">
                                <input
                                    className="input mt-2"
                                    type="text"
                                    value={company}
                                    placeholder="Company Name"
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* LOGO */}

                        <div className="field">
                            <label className="label">Logo</label>
                            <div className="control">
                                <input
                                    className="input mt-2"
                                    type="text"
                                    placeholder="Logo URL"
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* JOB */}

                        <div className="field">
                            <label className="label">Job</label>
                            <div className="control">
                                <input
                                    className="input mt-2"
                                    type="text"
                                    placeholder="Job Name"
                                    value={jobTitle}
                                    onChange={(e) =>
                                        setJobTitle(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* DESCRIPTION */}

                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea
                                    className="textarea mt-2"
                                    placeholder="Job Description"
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />
                            </div>
                        </div>

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

                        <div className="field is-full mt-5">
                            <button className="button is-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </section>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => setShowModal(!showModal)}
                >
                    Close
                </button>
            </div>
        </>
    );
};

export default EditJobModal;
