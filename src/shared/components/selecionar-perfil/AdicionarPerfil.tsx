import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

import * as yup from 'yup';
import { IVFormErros, useVForm, VForm, VtexField } from "../../forms";
import { PerfisService } from "../../services/api/perfis/PerfisService";

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object({
    nome: yup
        .string()
        .required()
        .min(2)
        .matches(/^[^\s]+$/, 'Perfil deve ter somente um nome'),
})

interface IAdicionarPerfilProps {
    open: boolean;
    onClose: () => void;
}

export const AdicionarPerfil = ({ open, onClose }: IAdicionarPerfilProps) => {

    const { formRef, save } = useVForm();

    const handleCreateProfile = (dados: IFormData) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                PerfisService.create(dadosValidados).then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    onClose();
                })
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErros = {}
                errors.inner.forEach((error) => {
                    if (!error.path) return;
                    validationErrors[error.path] = error.message;
                })
                formRef.current?.setErrors(validationErrors);
            })
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Adicionar novo perfil</DialogTitle>
            <VForm ref={formRef} placeholder="" onSubmit={handleCreateProfile}>
                <DialogContent>
                    <DialogContentText>
                        Crie um perfil e aproveite as recomendações mais precisas para você.
                    </DialogContentText>
                    <VtexField
                        autoFocus
                        fullWidth
                        label="Nome"
                        name="nome"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" disableElevation onClick={save}>Criar</Button>
                </DialogActions>
            </VForm>
        </Dialog>
    )
}