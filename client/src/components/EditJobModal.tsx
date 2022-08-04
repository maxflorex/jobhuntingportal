import { useState } from 'react';

type Props = {
    job: any
};

const EditJobModal = ({job}: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [company, setCompany] = useState('');
    const [logo, setLogo] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [category, setCategory] = useState('Design');

    const closeModal = (e: any) => {
        if (e.target.classList.contains('dismiss')) {
            setShowModal(false);
        }
    };

    console.log(job);
    

    const updateJob = () => {
        
    }

    return (
        <>
            <button
                className="button is-primary"
                onClick={() => setShowModal(!showModal)}
            >
                Edit
            </button>
            <div className={`modal ${showModal && 'is-active'}`}>
                <div
                    className="modal-background dismiss z-5"
                    onClick={closeModal}
                />
                <section className="section">
                    <form className="box is-shadowless z-10 p-6" onSubmit={updateJob}>
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
