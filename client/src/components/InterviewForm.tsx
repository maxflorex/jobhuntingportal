import React from 'react';

type Props = {};

const InterviewForm = (props: Props) => {
    return (
        <div className='box is-shadowless has-background-success-light'>
            {/* INTERVIEW DATE */}

            <div className="field">
                <label className="label">Interview Date</label>
                <div className="control">
                    <input
                        className="input is-small mt-2"
                        type="text"
                        // value={company}
                        placeholder="Company Name"
                        // onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
            </div>

            {/* INTERVIEWER */}

            <div className="field">
                <label className="label">Interviewer</label>
                <div className="control">
                    <input
                        className="input is-small mt-2"
                        type="text"
                        placeholder="Logo URL"
                        // value={logo}
                        // onChange={(e) => setLogo(e.target.value)}
                    />
                </div>
            </div>
            
            {/* NOTES */}

            <div className="field">
                <label className="label">Notes</label>
                <div className="control">
                    <textarea
                        className="textarea is-small mt-2"
                        placeholder="Job Description"
                        // value={jobDesc}
                        // onChange={(e) => setJobDesc(e.target.value)}
                    />
                </div>
            </div>

            {/* STATUS */}

            <div className="select is-small mt-3">
                <select
                // value={status}
                // onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Interviewing">Having an interview</option>
                    <option value="Confirmation">Email Confirmation</option>
                    <option value="Ignored">Completely Gosthed</option>
                </select>
            </div>

            {/* SUBMIT */}

            <div className="field is-full mt-5">
                <button className="button is-primary" type="submit">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default InterviewForm;
