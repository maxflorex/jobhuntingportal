import React from 'react';

type Props = {
    interviewDate: string;
    setInterviewDate: any;
    interviewer: string;
    setInterviewer: any;
    notes: string;
    setNotes: any;
    interStatus: string;
    setInterStatus: any;
};

const InterviewForm = ({
    interviewDate,
    setInterviewDate,
    interviewer,
    setInterviewer,
    notes,
    setNotes,
    interStatus,
    setInterStatus,
}: Props) => {
    return (
        <div className="box is-shadowless has-background-success-light mt-5">
            {/* INTERVIEW DATE */}

            <div className="field">
                <label className="label">Interview Date</label>
                <div className="control">
                    <input
                        className="input mt-2"
                        type="text"
                        value={interviewDate}
                        placeholder="Company Name"
                        onChange={(e) => setInterviewDate(e.target.value)}
                    />
                </div>
            </div>

            {/* INTERVIEWER */}

            <div className="field">
                <label className="label">Interviewer</label>
                <div className="control">
                    <input
                        className="input mt-2"
                        type="text"
                        placeholder="Logo URL"
                        value={interviewer}
                        onChange={(e) => setInterviewer(e.target.value)}
                    />
                </div>
            </div>

            {/* NOTES */}

            <div className="field">
                <label className="label">Notes</label>
                <div className="control">
                    <textarea
                        className="textarea mt-2"
                        placeholder="Job Description"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </div>

            {/* STATUS */}

            <div className="select mt-3">
                <select
                    value={interStatus}
                    onChange={(e) => setInterStatus(e.target.value)}
                >
                    <option value="bad">Bad</option>
                    <option value="ok">Ok</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                    <option value="superb">Superb</option>
                </select>
            </div>
        </div>
    );
};

export default InterviewForm;
