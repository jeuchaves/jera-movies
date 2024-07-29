import React, { useEffect, useState } from "react"

import { Avatar, Dialog, DialogProps, DialogTitle, Icon, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import { blue } from "@mui/material/colors";

import { IListagemPerfil, PerfisService } from "../../services/api/perfis/PerfisService"
import { AdicionarPerfil } from "./AdicionarPerfil";
import { useAppDrawerContext } from "../../contexts";

interface ISelecionarPerfilProps {
    open: boolean;
    onClose: () => void;
}

export const SelecionarPerfil: React.FC<ISelecionarPerfilProps> = ({ open, onClose }) => {

    const { setSelectedProfileId } = useAppDrawerContext();

    const [perfis, setPerfis] = useState<IListagemPerfil[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDialogAddProfileOpen, setIsDialogAddProfileOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            loadProfiles();
        }
    }, [open]);

    const loadProfiles = () => {
        setIsLoading(true);
        PerfisService.getAll().then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
                console.error(result.message);
                return;
            }
            setPerfis(result.data);
            setTotalCount(result.totalCount);
        });
    }

    const handleListItemClick = (perfilId: number) => {
        setSelectedProfileId(perfilId);
        onClose();
    }

    const handleListAddProfile = () => {
        setIsDialogAddProfileOpen(true);
    }

    const handleClose: DialogProps['onClose'] = (event, reason) => {
        if (reason && reason === 'backdropClick') return;
        onClose();
    }

    const handleCloseDialogAddProfile = () => {
        setIsDialogAddProfileOpen(false);
        loadProfiles();
    }

    return (
        <>
            <Dialog disableEscapeKeyDown onClose={handleClose} open={open}>
                <DialogTitle>Selecionar perfil</DialogTitle>
                {!isLoading && (
                    <List sx={{ pt: 0 }}>
                        {perfis.map((perfil) => (
                            <ListItem disableGutters key={perfil.id}>
                                <ListItemButton onClick={() => handleListItemClick(perfil.id)}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600]}}>
                                            <Icon>person_icon</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={perfil.nome} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {totalCount < 4 && (
                            <ListItem disableGutters>
                                <ListItemButton onClick={handleListAddProfile}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600]}}>
                                            <Icon>add</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={'Adicionar novo'} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                )}
            </Dialog>

            <AdicionarPerfil onClose={handleCloseDialogAddProfile} open={isDialogAddProfileOpen}/>
        </>
    )
}