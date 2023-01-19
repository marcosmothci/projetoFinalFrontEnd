import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, {useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizarRecado, buscarRecadoPorId, deletarRecado, buscarRecados } from '../../store/modules/recados/recadosSlice';
import { atualizarUsuario, buscarUsuarios } from '../../store/modules/users/usersSlice';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    id: string;
    mode: ModeModal
}

type ModeModal = 'edit' | 'delete' | ''

function Modal({ open, handleClose, id, mode }: ModalProps) {
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
    const recado = useAppSelector((state) => buscarRecadoPorId(state, id))    
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(recado) {
            setDescription(recado.description)
            setDetail(recado.detail)
        }
    }, [recado])

    const handleConfirm = () => {
        
        if(mode === 'delete') {
            dispatch(deletarRecado(id))
            
        }

        if(mode === 'edit') {
            dispatch(atualizarRecado({ id: id, changes: { detail, description }}))
        }

        handleClose()
    }


    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            {mode === 'delete' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Tem certeza que deseja excluir o recado?`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Após confirmar não é possível desfazer a exclusão.
                        </DialogContentText>
                    </DialogContent>
                </React.Fragment>
            )}
            {mode === 'edit' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Editar recado`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Informe o titulo e o texto.
                        </DialogContentText>
                        <>
                            <TextField value={description} name='description' label='Titulo' onChange={(ev) => setDescription(ev.target.value)}/>
                            <TextField value={detail} name='detail' label='Texto' onChange={(ev) => setDetail(ev.target.value)} />
                        
                        </>
                    </DialogContent>
                </React.Fragment>
            )}
            <DialogActions>
                <Button onClick={handleClose} autoFocus color='error' variant='outlined'>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color='info' variant='contained'>Confirmo</Button>
            </DialogActions>
        </Dialog>
    )
}


export { Modal }