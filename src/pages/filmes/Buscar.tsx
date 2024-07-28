import { useSearchParams } from "react-router-dom"
import { CardFilmes, FerramentasDaListagem, SelecionarPerfil } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import { FilmesService, IListagemFilme } from "../../shared/services/api/filmes/FilmesService";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { Environment } from "../../shared/environment";
import { useAppDrawerContext } from "../../shared/contexts";
import { WatchlistServices } from "../../shared/services/api/watchlist/WatchlistService";

export const Buscar = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { selectedProfileId } = useAppDrawerContext();
    const { debounce } = useDebounce();

    const [isDialogProfilesOpen, setIsDialogProfilesOpen] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleCloseDialogProfiles = () => {
        setIsDialogProfilesOpen(false);
    }

    const [rows, setRows] = useState<IListagemFilme[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

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

        debounce(() => {
            FilmesService.getAll(selectedProfileId, pagina, busca).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    console.error(result.message);
                    return;
                }

                setTotalCount(result.totalCount);
                setTotalPages(result.totalPages);
                setRows(result.data);
            });
        });
    }, [busca, pagina, debounce, selectedProfileId]);

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
        <LayoutBaseDePagina 
            titulo="Buscar filmes"
            barraDeFerramentas={
                <FerramentasDaListagem 
                    textoDaBusca={busca}
                    mostrarInputBusca
                    mostrarBotaoNovo={false}
                    aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto, pagina: '1'}, { replace: true })}
                />
            }
        >
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
                                            <CardFilmes 
                                                {...filme} 
                                                mostrarBotaoWatchlist
                                                aoClicarEmWatchlist={handleAddMovieToWatchlist}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <Box marginTop={2} justifyContent='center' display='flex'>
                                    <Pagination 
                                        page={pagina}
                                        color="primary"
                                        count={totalPages}
                                        onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString()}, { replace: true })}
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