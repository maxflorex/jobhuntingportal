import { useMutation } from '@apollo/client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_ALL_JOBS, DELETE_USER } from '../mutations/JobMutation'
import { GET_JOBS } from '../queries/jobQueries'
import { signoutCurrent } from '../redux/userSlice'

type Props = {
    setConfirm: any,
    deleting: string,
    closeModal: any
}

export const DeleteConfirmation = ({ setConfirm, deleting, closeModal }: Props) => {
    const id: any = useSelector((state: any) => state.currentState.value.id)
    const dispatch = useDispatch()


    const [deleteUser]: any = useMutation(DELETE_USER, {
        variables: { id: id }
    })

    const [deleteAllJobs]: any = useMutation(DELETE_ALL_JOBS, {
        variables: { id: id },
        refetchQueries: [{ query: GET_JOBS, variables: { userId: id } }],
    })

    const handleClose = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setConfirm(false)
    }

    const handleSubmit = (e: any) => {
        if (deleting === 'user') {
            deleteUser(id)
            dispatch(signoutCurrent())
        } else if (deleting === 'jobs') {
            deleteAllJobs(id)
            closeModal(e)
        }
    }

    return (
        <div className='delete-confirm'>
            <div className="flex-center" style={{ height: 'auto' }}>
                <span className="material-symbols-outlined">warning</span>
                <h3 style={{ fontWeight: 'bolder' }}>Are you sure</h3>
                <p>You're about to delete {deleting === "user" ? 'your USER' : deleting === "jobs" ? 'ALL your jobs' : ''}</p>
                <div className="flex-row" style={{ margin: '1rem 0' }}>
                    <button className='mod2' onClick={(e) => handleSubmit(e)}>Yes, delete</button>
                    <button className='mod2' onClick={handleClose} >No, Cancel</button>
                </div>
            </div>
        </div>
    )
}