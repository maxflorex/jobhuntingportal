import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';

type Props = {};

const JobForm = (props: Props) => {
    const [company, setCompany] = useState('');
    const [logo, setLogo] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [status, setStatus] = useState('Ignored');
    const [interviewId, setInterviewId] = useState('No Interviews');

    // const [addJob]: any = useMutation(ADD_JOB, {
    //     variables: { company, logo, jobTitle, jobDesc, status, interviewId },
    //     update(cache, { data: { addJob } }) {
    //         const { jobs }: any = cache.readQuery({ query: GET_JOBS });
    //         cache.writeQuery({
    //             query: GET_JOBS,
    //             data: { jobs: [...jobs, addJob] },
    //         });
    //     },
    // });

    const [addJob]: any = useMutation(ADD_JOB, {
        variables: { company, logo, jobTitle, jobDesc },
        update(cache, { data: { addJob } }) {
            const { jobs }: any = cache.readQuery({ query: GET_JOBS });
            cache.writeQuery({
                query: GET_JOBS,
                data: { jobs: [...jobs, addJob] },
            });
        },
    });

    const submitJob = (e: any) => {
        e.preventDefault();
        if (company === '' || logo === '' || jobTitle === '' || jobDesc === '') {
            return alert('Please fill all fields');
        }

        addJob(company, logo, jobTitle, jobDesc);
        
        setCompany('');
        setLogo('');
        setJobTitle('');
        setJobDesc('');
        setStatus('Ignored');
        setInterviewId('');
    };
    // const submitJob = (e: any) => {
    //     e.preventDefault();
    //     if (company === '' || logo === '' || jobTitle === '' || jobDesc === '') {
    //         return alert('Please fill all fields');
    //     }

    //     addJob(company, logo, jobTitle, jobDesc, status, interviewId);
        
    //     setCompany('');
    //     setLogo('');
    //     setJobTitle('');
    //     setJobDesc('');
    //     setStatus('Ignored');
    //     setInterviewId('');
    // };
    

    return (
        <section className="section">
            <form className="box is-shadowless" onSubmit={submitJob}>
                {/* COMPANY */}

                <div className="field">
                    <label className="label is-small">Company</label>
                    <div className="control">
                        <input
                            className="input is-small mt-2"
                            type="text"
                            value={company}
                            placeholder="Company Name"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                </div>

                {/* LOGO */}

                <div className="field">
                    <label className="label is-small">Logo</label>
                    <div className="control">
                        <input
                            className="input is-small mt-2"
                            type="text"
                            placeholder="Logo URL"
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                        />
                    </div>
                </div>

                {/* JOB */}

                <div className="field">
                    <label className="label is-small">Job</label>
                    <div className="control">
                        <input
                            className="input is-small mt-2"
                            type="text"
                            placeholder="Job Name"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>
                </div>

                {/* DESCRIPTION */}

                <div className="field">
                    <label className="label is-small">Description</label>
                    <div className="control">
                        <textarea
                            className="textarea is-small mt-2"
                            placeholder="Job Description"
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                        />
                    </div>
                </div>

                {/* STATUS */}

                <div className="is-flex is-justify-content-space-between is-align-content-center my-5">
                    <div className="select is-small">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Interviewing">
                                Having an interview
                            </option>
                            <option value="Confirmation">
                                Email Confirmation
                            </option>
                            <option value="Ignored">Completely Gosthed</option>
                        </select>
                    </div>

                    {/* INTERVIEW */}

                    <div className="control">
                        <label className="radio">
                            <input
                                type="radio"
                                name="answer"
                                onChange={() => setInterviewId('Interviewing')}
                                />
                            Yes
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                name="answer"
                                onChange={() => setInterviewId('No Interviews')}
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* SUBMIT */}

                <div className="field is-full mt-4">
                    <button className="button is-primary" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default JobForm;
