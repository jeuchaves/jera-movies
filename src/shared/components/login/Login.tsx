import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Typography } from '@mui/material'
import { useAuthContext } from '../../contexts'
import * as yup from 'yup'
import { IVFormErros, VForm, VtexField, useVForm } from '../../forms'
import { useState } from 'react'
import { UsuariosService } from '../../services/api/usuarios/UsuariosService'

interface ILoginData {
    email: string;
    senha: string;
}

interface ICadastroData {
    email: string;
    senha: string;
    nome: string;
    dataNascimento: Date;
}

const loginValidationSchema: yup.ObjectSchema<ILoginData> = yup.object({
    email: yup.string().required().email(),
    senha: yup.string().required().min(5),
})

const cadastroValidationSchema: yup.ObjectSchema<ICadastroData> = yup.object({
    email: yup.string().required().email(),
    senha: yup.string().required().min(5),
    nome: yup.string().required().min(3),
    dataNascimento: yup.date().required(),
})

interface ILoginProps {
    children: React.ReactNode
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext()
    const { formRef, save } = useVForm()

    const [isLoading, setIsLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    const handleForm = () => {
        setIsLogin(!isLogin);
        if (formRef.current) {
            formRef.current.setData({
                nome: '',
                email: '',
                senha: '',
                dataNascimento: '',
            })
        }
    }

    const handleSubmit = (dados: ILoginData) => {
        console.log('entrando');
        setIsLoading(true)
        loginValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                login(dadosValidados.email, dadosValidados.senha).then(() => {
                    setIsLoading(false);
                });
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                const validationErrors: IVFormErros = {}
                errors.inner.forEach((error) => {
                    if (!error.path) return
                    validationErrors[error.path] = error.message
                })
                formRef.current?.setErrors(validationErrors)
            })
    }

    const handleSignIn = (dados: ICadastroData) => {
        console.log('cadastrando');
        setIsLoading(true);
        cadastroValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                UsuariosService.create(dadosValidados).then((result) => {
                    if (result instanceof Error) {
                        window.alert(result.message);
                        setIsLoading(false);
                        return;
                    }
                    handleForm();
                    setIsLoading(false);
                    setShowAlert(true);

                    setTimeout(() => {
                        setShowAlert(false);
                    }, 5000);
                })
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                const validationErrors: IVFormErros = {}
                errors.inner.forEach((error) => {
                    if (!error.path) return;
                    validationErrors[error.path] = error.message;
                })
                formRef.current?.setErrors(validationErrors)
            })
    }

    if (isAuthenticated) return <>{children}</>

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            {showAlert && (
                <Alert severity='success'>Conta criada com sucesso! Faça login para continuar</Alert>
            )}

            <VForm
                ref={formRef}
                placeholder=""
                onSubmit={(e) => isLogin ? handleSubmit(e) : handleSignIn(e)}
            >
                <Card sx={{ marginBlock: 2 }}>
                    <CardContent>
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            width={250}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                align="center"
                            >
                                { isLogin ? 'Login' : 'Cadastre-se' }
                            </Typography>
                            {isLogin ? (
                                <>
                                    <VtexField
                                        autoFocus
                                        fullWidth
                                        label="E-mail"
                                        name="email"
                                        disabled={isLoading}
                                    />
                                    <VtexField
                                        fullWidth
                                        label="Senha"
                                        name="senha"
                                        disabled={isLoading}
                                        type="password"
                                    />
                                </>
                            ) : (
                                <>
                                    <VtexField
                                        autoFocus
                                        fullWidth
                                        label="Nome"
                                        name="nome"
                                        disabled={isLoading}
                                    />
                                    <VtexField
                                        autoFocus
                                        fullWidth
                                        label="E-mail"
                                        name="email"
                                        disabled={isLoading}
                                    />
                                    <VtexField
                                        fullWidth
                                        label="Senha"
                                        name="senha"
                                        disabled={isLoading}
                                        type="password"
                                    />
                                    <VtexField
                                        fullWidth
                                        type='date'
                                        name="dataNascimento"
                                        disabled={isLoading}
                                    />
                                </>
                            )}
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                onClick={save}
                                disabled={isLoading}
                                endIcon={isLoading ? <CircularProgress size={20} variant='indeterminate' color='inherit' /> : undefined}
                            >
                                { isLogin ? 'Entrar' : 'Cadastrar' }
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </VForm>
            <Typography>
                {isLogin ? (
                    <>
                        Não tem uma conta? 
                        <Button onClick={handleForm} variant='text'>Criar conta</Button>
                    </>
                ) : (
                    <>
                        Já tem uma conta? 
                        <Button onClick={handleForm} variant='text'>Fazer login</Button>
                    </>
                )}
            </Typography>
        </Box>
    )
}
