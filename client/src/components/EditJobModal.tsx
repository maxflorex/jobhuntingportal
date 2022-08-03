import { useState } from 'react';

type Props = {};

const EditJobModal = (props: Props) => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = (e: any) => {
        if (e.target.classList.contains('dismiss')) {
            setShowModal(false);
        }
    };

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
                    className="modal-background dismiss"
                    onClick={closeModal}
                />
                <div className="modal-content">
                    <div className="box">
                        <h1 className="is-2">This is the modal</h1>
                    </div>
                </div>
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
