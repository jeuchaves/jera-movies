import { useSearchParams } from "react-router-dom"
import { CardFilmes, FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import { FilmesService, IListagemFilme } from "../../shared/services/api/filmes/FilmesService";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { Environment } from "../../shared/environment";

export const Buscar = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

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

        debounce(() => {
            FilmesService.getAll(pagina, busca).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    console.error(result.message);
                    return;
                }

                console.log(result.totalPages);
                setTotalCount(result.totalCount);
                setTotalPages(result.totalPages);
                setRows(result.data);
            });
        });
    }, [busca, pagina, debounce]);

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
                                            <CardFilmes {...filme} />
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