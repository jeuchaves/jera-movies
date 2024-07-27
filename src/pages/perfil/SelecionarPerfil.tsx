import { useEffect, useState } from "react"
import * as yup from 'yup';

import { LayoutBaseDePagina } from "../../shared/layouts"
import { IListagemPerfil, PerfisService } from "../../shared/services/api/Perfis/PerfisService";
import { IVFormErros, useVForm, VForm, VtexField } from "../../shared/forms";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";

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

export const SelecionarPerfil = () => {

    const { formRef, save } = useVForm();

    const [perfis, setPerfis] = useState<IListagemPerfil[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState(false);

    const loadProfiles = () => {
        setIsLoading(true);
        PerfisService.getAll().then((result) => {
            if (result instanceof Error) {
                alert(result.message);
                return;
            }
            setTotalCount(result.totalCount);
            setPerfis(result.data);
            if(result.totalCount === 0) handleOpenDialog();
            setIsLoading(false);
        })
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        loadProfiles();
    }, []);

    const handleCreateProfile = (dados: IFormData) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                PerfisService.create(dadosValidados).then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    handleCloseDialog();
                    loadProfiles();
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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleSelectProfile = (perfilId: number) => {
        console.log('perfil selecionado: ', perfilId);
    }

    return (
        <LayoutBaseDePagina titulo="Selecionar perfil">

            <Dialog onClose={handleCloseDialog} open={openDialog}>
                <DialogTitle>Criar novo perfil</DialogTitle>
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
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button variant="contained" disableElevation onClick={save}>Criar</Button>
                    </DialogActions>
                </VForm>
            </Dialog>

            {isLoading ? (
                <Typography>Carregando...</Typography>
            ) : (
                <>
                    <List sx={{ pt: 0 }}>
                        { perfis.map((perfil) => (
                            <ListItem disableGutters key={perfil.id}>
                                <ListItemButton onClick={() => handleSelectProfile(perfil.id)}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Icon>person_icon</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={perfil.nome} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                
                    <Button 
                        variant="contained" 
                        disableElevation 
                        disabled={totalCount >= 4} 
                        onClick={handleOpenDialog}
                    >
                        Criar novo perfil
                    </Button>
                </>
            )}
        </LayoutBaseDePagina>
    )
}