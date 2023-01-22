import React from 'react'

type Props = {
    setConfirm: any
}

export const DeleteConfirmation = ({ setConfirm }: Props) => {

    const handleClose = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setConfirm(false)
    }

    return (
        <div className='delete-confirm'>
            <div className="flex-center">
                <span className="material-symbols-outlined">warning</span>
                <h3 style={{ fontWeight: 'bolder' }}>Are you sure</h3>
                <div className="flex-row" style={{ margin: '1rem 0' }}>
                    <button className='mod2'>Yes, delete</button>
                    <button className='mod2' onClick={handleClose} >No, Cancel</button>
                </div>
            </div>
        </div>
    )
}