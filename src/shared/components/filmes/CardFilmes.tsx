import { Button, Card, CardContent, CardMedia, Icon, Typography } from "@mui/material"
import { IListagemFilme } from "../../services/api/filmes/FilmesService"

interface ICardFilmesProps extends IListagemFilme {}

export const CardFilmes: React.FC<ICardFilmesProps> = ({ title, backdrop_path, overview }) => {
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
                <Button size="small" variant="contained" disableElevation startIcon={<Icon>add</Icon>}>Watchlist</Button>
            </CardContent>
        </Card>
    )
}