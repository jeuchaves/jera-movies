import { useEffect, useState } from "react"

import { Avatar, Dialog, DialogProps, DialogTitle, Icon, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import { blue } from "@mui/material/colors";

import { IListagemPerfil, PerfisService } from "../../services/api/Perfis/PerfisService"
import { AdicionarPerfil } from "./AdicionarPerfil";

interface ISelecionarPerfilProps {
    open: boolean;
    onClose: () => void;
}

export const SelecionarPerfil = ({ open, onClose }: ISelecionarPerfilProps) => {

    const [perfis, setPerfis] = useState<IListagemPerfil[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDialogAddProfileOpen, setIsDialogAddProfileOpen] = useState<boolean>(false);

    useEffect(() => {
        loadProfiles();
    }, []);

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
        PerfisService.selectProfile(perfilId);
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