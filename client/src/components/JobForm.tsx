import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_INTERVIEW } from '../mutations/InterviewMutation';
import { ADD_JOB } from '../mutations/JobMutation';
import { GET_JOBS } from '../queries/jobQueries';
import InterviewForm from './InterviewForm';

type Props = {
    show: any;
};

const JobForm = ({ show }: Props) => {
    const [company, setCompany] = useState('');
    const [logo, setLogo] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [status, setStatus] = useState('Ignored');
    const [category, setCategory] = useState('Design');

    // ADD INTERVIEW STATES
    const [interviewDate, setInterviewDate] = useState('');
    const [interviewer, setInterviewer] = useState('');
    const [notes, setNotes] = useState('');
    const [interStatus, setInterStatus] = useState('ok');

    const [addJob]: any = useMutation(ADD_JOB, {
        variables: { company, logo, jobTitle, jobDesc, category, status },
        refetchQueries: [{ query: GET_JOBS }],
    });

    const [addInterview]: any = useMutation(ADD_INTERVIEW, {
        variables: { interviewDate, notes, interviewer, status },
        refetchQueries: [{ query: GET_JOBS }],
    });

    const submitInter = () => {
        if (
            interviewDate === '' ||
            interStatus === '' ||
            notes === '' ||
            interviewer === ''
        ) {
            console.log('Interview submitted');
        }
        addInterview(interviewDate, interStatus, notes, interviewer);

        setInterviewDate('');
        setInterStatus('');
        setNotes('');
        setInterviewer('');
    };

    const submitJob = (e: any) => {
        e.preventDefault();
        if (
            company === '' ||
            logo === '' ||
            jobTitle === '' ||
            jobDesc === ''
        ) {
            return alert('Please fill all fields');
        }

        addJob(company, logo, jobTitle, jobDesc, category);

        if (status === 'Interviewing') {
            submitInter();
        }

        setCompany('');
        setLogo('');
        setJobTitle('');
        setJobDesc('');
        setStatus('Ignored');
        show(false);

        console.log('Submitted!');
    };

    return (
        <section className="section">
            <form className="box is-shadowless" onSubmit={submitJob}>
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
                            onChange={(e) => setJobTitle(e.target.value)}
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

                {/* STATUS */}

                <div className="select mt-3">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Interviewing">
                            Having an interview
                        </option>
                        <option value="Confirmation">Email Confirmation</option>
                        <option value="Ignored">Completely Gosthed</option>
                    </select>
                </div>
                {status === 'Interviewing' && (
                    <InterviewForm
                        interviewDate={interviewDate}
                        setInterviewDate={setInterviewDate}
                        interviewer={interviewer}
                        setInterviewer={setInterviewer}
                        notes={notes}
                        setNotes={setNotes}
                        interStatus={interStatus}
                        setInterStatus={setInterStatus}
                    />
                )}

                <div className="field is-full mt-5">
                    <button className="button is-primary" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default JobForm;
