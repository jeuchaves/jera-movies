import { useEffect, useState } from "react"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { FilmesService, IListagemFilme } from "../../shared/services/api/filmes/FilmesService";
import { SelecionarPerfil } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { Box, Button, Card, CardContent, CardMedia, Grid, Icon, Typography } from "@mui/material";
import { useAppDrawerContext } from "../../shared/contexts";

export const Sugestoes = () => {

    const { selectedProfileId } = useAppDrawerContext();

    const [rows, setRows] = useState<IListagemFilme[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isDialogProfilesOpen, setIsDialogProfilesOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        
        if (!selectedProfileId) {
            setIsDialogProfilesOpen(true);
            setIsLoading(false);
            return;
        }

        FilmesService.getSuggested(selectedProfileId)
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    return;
                }
                setRows(result.data);
                setTotalCount(result.totalCount);
        });
    }, [selectedProfileId]);

    const handleCloseDialogProfiles = () => {
        setIsDialogProfilesOpen(false);
    }

    return (
        <LayoutBaseDePagina titulo="Filmes sugeridos">
            <SelecionarPerfil open={isDialogProfilesOpen} onClose={handleCloseDialogProfiles} />
            <Box margin={2}>
                {!isLoading && (
                    <>
                        {(totalCount === 0) ? (
                            <Typography>
                                {Environment.LISTAGEM_VAZIA}
                            </Typography>
                        ): (
                            <Grid container spacing={2}>
                                {rows.map((filme) => (
                                    <Grid item key={filme.id} xs={12} sm={6} md={4} lg={3} alignItems='stretch'>
                                        <Card elevation={0} sx={{ height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                alt={filme.title}
                                                height="140"
                                                image={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {filme.title}
                                                </Typography>
                                                <Typography marginBottom={2} variant="body2" color="text.secondary" sx={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                                                    {filme.overview}
                                                </Typography>
                                                <Button size="small" variant="contained" disableElevation startIcon={<Icon>add</Icon>}>Watchlist</Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}
            </Box>
        </LayoutBaseDePagina>
    )
}