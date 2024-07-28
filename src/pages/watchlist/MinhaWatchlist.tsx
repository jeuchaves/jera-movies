import { Box, Grid, Typography } from "@mui/material"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useState } from "react"
import { Environment } from "../../shared/environment";
import { IListagemWatchlist, WatchlistServices } from "../../shared/services/api/watchlist/WatchlistService";
import { CardFilmes, SelecionarPerfil } from "../../shared/components";
import { useAppDrawerContext } from "../../shared/contexts";

export const MinhaWatchlist = () => {

    const { selectedProfileId } = useAppDrawerContext();

    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IListagemWatchlist[]>([]);

    const [isDialogProfilesOpen, setIsDialogProfilesOpen] = useState<boolean>(false);

    const handleCloseDialogProfiles = () => {
        setIsDialogProfilesOpen(false);
    }

    useEffect(() => {
        setIsLoading(true);

        if (!selectedProfileId) {
            setIsDialogProfilesOpen(true);
            setIsLoading(false);
            return;
        }

        WatchlistServices.getAll(selectedProfileId).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
                console.error(result.message);
                return;
            }
            setRows(result.data);
            setTotalCount(result.totalCount);
        })

    }, [selectedProfileId])

    const handleAssistidoClick = (filmeId: number) => {
        if (!selectedProfileId) {
            setIsDialogProfilesOpen(true);
            setIsLoading(false);
            return;
        }

        const row = rows.find((row) => row.filmeId === filmeId);

        if (row) {
            WatchlistServices.markAsWatched(selectedProfileId, row.id).then((result) => {
                if (result instanceof Error) {
                    console.error(result.message);
                    window.alert(result.message);
                    return;
                }

                setRows((prevWatchlist) => {
                    return prevWatchlist.map((item) => {
                        if (item.filmeId === filmeId) {
                            return {
                                ...item,
                                assistido: true,
                            }
                        }
                        return item;
                    })
                })
            })
        }


    }

    return (
        <LayoutBaseDePagina titulo="Watchlist">
            <SelecionarPerfil open={isDialogProfilesOpen} onClose={handleCloseDialogProfiles} />
            <Box margin={1}>
                {!isLoading && (
                    <>
                        {(totalCount === 0) ? (
                            <Typography>
                                {Environment.LISTAGEM_VAZIA}
                            </Typography>
                        ) : (
                            <>
                                <Grid container spacing={2}>
                                    {rows.map((watchlist) => (
                                        <Grid item key={watchlist.id} xs={12} sm={6} md={4} lg={3} alignItems='stretch'>
                                            <CardFilmes 
                                                {...watchlist.detalhes} 
                                                assistido={watchlist.assistido}
                                                mostrarBotaoAssistido
                                                aoClicarEmAssistido={handleAssistidoClick}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </>
                )}
            </Box>
        </LayoutBaseDePagina>
    )
}