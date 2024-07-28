import { useEffect, useMemo, useState } from "react"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { FilmesService, IListagemFilme } from "../../shared/services/api/filmes/FilmesService";
import { CardFilmes, SelecionarPerfil } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useAppDrawerContext } from "../../shared/contexts";
import { useSearchParams } from "react-router-dom";
import { WatchlistServices } from "../../shared/services/api/watchlist/WatchlistService";

export const Sugestoes = () => {

    const { selectedProfileId } = useAppDrawerContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const [rows, setRows] = useState<IListagemFilme[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState(0);

    const [isDialogProfilesOpen, setIsDialogProfilesOpen] = useState<boolean>(false);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);


    useEffect(() => {
        setIsLoading(true);
        
        if (!selectedProfileId) {
            setIsDialogProfilesOpen(true);
            setIsLoading(false);
            return;
        }

        FilmesService.getSuggested(selectedProfileId, pagina)
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    return;
                }
                setRows(result.data);
                setTotalCount(result.totalCount);
                setTotalPages(result.totalPages);
        });
    }, [selectedProfileId, pagina]);

    const handleCloseDialogProfiles = () => {
        setIsDialogProfilesOpen(false);
    }

    const handleAddMovieToWatchlist = (filmeId: number) => {

        if (!selectedProfileId) {
            setIsDialogProfilesOpen(true);
            setIsLoading(false);
            return;
        }

        WatchlistServices.create(selectedProfileId, filmeId).then((result) => {
            if (result instanceof Error) {
                console.error(result.message);
                window.alert(result.message);
                return;
            }
            
            setRows((prevWatchlist) => {
                return prevWatchlist.map((item) => {
                    if (item.id === filmeId) {
                        return {
                            ...item,
                            isInWatchlist: true,
                        }
                    }
                    return item;
                })
            })
        })
    }

    return (
        <LayoutBaseDePagina titulo="Filmes sugeridos">
            <SelecionarPerfil open={isDialogProfilesOpen} onClose={handleCloseDialogProfiles} />
            <Box margin={1}>
                {!isLoading && (
                    <>
                        {(totalCount === 0) ? (
                            <Typography>
                                {Environment.LISTAGEM_VAZIA}
                            </Typography>
                        ): (
                            <>
                                <Grid container spacing={2}>
                                    {rows.map((filme) => (
                                        <Grid item key={filme.id} xs={12} sm={6} md={4} lg={3} alignItems='stretch'>
                                            <CardFilmes {...filme} mostrarBotaoWatchlist aoClicarEmWatchlist={handleAddMovieToWatchlist}/>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Box marginTop={2} justifyContent='center' display='flex'>
                                    <Pagination 
                                        page={pagina}
                                        color="primary"
                                        count={totalPages}
                                        onChange={(_, newPage) => setSearchParams({ pagina: newPage.toString()}, { replace: true })}
                                    />
                                </Box>
                            </>
                        )}
                    </>
                )}
            </Box>
        </LayoutBaseDePagina>
    )
}