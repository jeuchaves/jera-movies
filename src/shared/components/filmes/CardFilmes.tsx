import { Box, Button, Card, CardContent, CardMedia, Icon, Typography } from "@mui/material"
import { IListagemFilme } from "../../services/api/filmes/FilmesService"

interface ICardFilmesProps extends IListagemFilme {
    mostrarBotaoWatchlist?: boolean;
    mostrarBotaoAssistido?: boolean;
    assistido?: boolean;
    aoClicarEmWatchlist?: (filmeId: number) => void;
    aoClicarEmAssistido?: (filmeId: number) => void;
}

export const CardFilmes: React.FC<ICardFilmesProps> = ({ 
    id,
    title, 
    backdrop_path, 
    overview, 
    isInWatchlist, 
    mostrarBotaoAssistido = false, 
    mostrarBotaoWatchlist = false, 
    aoClicarEmAssistido, 
    aoClicarEmWatchlist 
}) => {

    const handleWatchlistClick = () => {
        if (aoClicarEmWatchlist) {
            aoClicarEmWatchlist(id)
        }
    };

    const handleAssistidoClick = () => {
        if (aoClicarEmAssistido) {
            aoClicarEmAssistido(id)
        }
    }
    
    return (
        <Card elevation={0} sx={{ height: '100%' }}>
            <CardMedia
                component="img"
                alt={title}
                height="140"
                image={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography marginBottom={2} variant="body2" color="text.secondary" sx={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    {overview}
                </Typography>
                <Box display='flex' gap={2}>
                    {mostrarBotaoWatchlist && (
                        <Button 
                            disabled={isInWatchlist} 
                            size="small" 
                            variant="contained" 
                            disableElevation 
                            onClick={handleWatchlistClick} 
                            startIcon={<Icon>add</Icon>}
                        >
                            Watchlist
                        </Button>
                    )}
                    {mostrarBotaoAssistido && (
                        <Button 
                            disabled={!isInWatchlist} 
                            size="small" 
                            variant="outlined" 
                            disableElevation 
                            onClick={handleAssistidoClick} 
                            startIcon={<Icon>check</Icon>}
                        >
                            Assistido
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}