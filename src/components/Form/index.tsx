import React, { useState } from 'react';
import { InputDefault, InputName } from '../InputDefault';
import { Stack, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { adicionarNovoUsuario, buscarUsuarios } from '../../store/modules/users/usersSlice';
import { setUsuarioLogado } from '../../store/modules/userLogged/userLoggedSlice';


export interface FormProps {
  mode: 'login' | 'signup';
}

function Form({ mode }: FormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const usersRedux = useAppSelector(buscarUsuarios); // get - traz as infos de users da store

    const dispatch = useAppDispatch(); // cria-se uma variavel que recebe o retorno da execução do useAppDispatch
    
    const navigate = useNavigate();

    const handleValidateInput = (value: string, key: InputName) => {
        switch(key) {
            case 'name':
                if(value.length < 3) {
                    setErrorName(true);
                } else {
                    setErrorName(false);
                }
            break;

            case 'email':
                // eslint-disable-next-line no-useless-escape
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if(!value.match(regexEmail)) {
                    setErrorEmail(true)
                }else {
                    setErrorEmail(false)
                }
            break;

            case 'password':
                if(mode === 'signup') {
                    if(!value || value.length < 6) {
                        setErrorPassword(true)
                        
                    } else {
                        setErrorPassword(false)
                    }
                }

                if(mode === 'login') {
                    if(!value){
                        setErrorPassword(true)
                    } else {
                        setErrorPassword(false)
                    }
                }
            break;

            case 'repassword':
                if(value !== password) {
                    setErrorPassword(true)
                } else {
                    setErrorPassword(false)
                }
            break

            default:
        }
    }

    const mudarInput = (value: string, key: InputName) => {
        switch(key) {
            case 'name':
                setName(value)
                handleValidateInput(value, key)
            break;

            case 'email':
                setEmail(value)
                handleValidateInput(value, key)
            break;

            case 'password':
                setPassword(value)
                handleValidateInput(value, key)
            break;

            case 'repassword':
                setRepassword(value)
                handleValidateInput(value, key)
            break

            default:
        }
    }

    const handleNavigate = () => {
        if(mode === 'login') {
            navigate('/signup')
        } else {
            navigate('/')
        }
    }


    const createAccount = () => {
        const newUser = {
            name,
            email,
            password,
            recados: []
        }

        const userExist = usersRedux.some((user) => user.email === newUser.email);

        if(!userExist) {
            dispatch(adicionarNovoUsuario(newUser))
            clearInputs();
            alert("Usuário cadastrado com sucesso! Você será redirecionado em instantes");

            setTimeout(() => {
                navigate('/')
            }, 1000)
        } else {
            alert('E-mail já em uso, por favor tente novamente')
        }

    }

    const login = () => {
        const userExist = usersRedux.find((user) => user.email === email && user.password === password);

        if(!userExist) {
           const confirma = window.confirm("Usuário não cadastrado. Deseja criar uma nova conta? ")

           if(confirma) {
                navigate('/signup')
           }
        }
        
        dispatch(setUsuarioLogado({ name: userExist!.name, email: userExist!.email, password: userExist!.password }))
        alert('Login efetuado com sucesso! Redirecionando...')
        setTimeout(() => {
            navigate('/home')
        }, 1000)
    }

    const clearInputs = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRepassword('');
    }

    return (
        <>  
            <Typography color='white' variant='h1' marginBottom={'6vh'}>gROWnOTES </Typography>
            <Stack direction="column" spacing={2} sx={{width: '80%'}}>
                { mode === 'signup' && (
                    <>
                       
                        <InputDefault type='text' label='Nome' name='name' value={name} handleChange={mudarInput} color={errorName ? 'error' : 'secondary'}/>
                        <InputDefault type='email' label='E-mail' name='email' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'secondary'}/>
                        <InputDefault type='password' label='Senha' name='password' value={password} handleChange={mudarInput} color={errorPassword ? 'error' : 'secondary'}/>
                        <InputDefault type='password' label='Repita a Senha' name='repassword' value={repassword} handleChange={mudarInput} color={errorPassword ? 'error' : 'secondary'}/>
                        <Button disabled={errorName || errorEmail || errorPassword} variant='contained' color='primary' onClick={createAccount}>Criar Conta</Button>
                    </>
                )}

                { mode === 'login' && (
                    <>  
                       
                        <InputDefault type='email' label='E-mail' name='email' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'secondary'}/>
                        <InputDefault type='password' label='Senha' name='password' value={password} handleChange={mudarInput} color={errorPassword ? 'error' : 'secondary'}/>
                        <Button disabled={errorEmail || errorPassword} variant='contained' color='primary' onClick={login}>Acessar</Button>
                    </>
                )}
                
            </Stack>
            <Box marginTop={3}>
                { mode === 'login' && ( <Typography color='white' variant='subtitle2'>Não tem conta? <Typography variant='button' color='secondary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Cadastre-se</Typography></Typography> )}
                { mode === 'signup' && ( <Typography color='white' variant='subtitle2'>Já tem conta? <Typography variant='button' color='secondary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Fazer Login</Typography></Typography> )}
            </Box>
        </>

    )
}

export { Form }