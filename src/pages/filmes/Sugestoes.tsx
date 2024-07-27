import { useEffect, useState } from "react"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { FilmesService, IListagemFilme } from "../../shared/services/api/filmes/FilmesService";

export const Sugestoes = () => {

    const [rows, setRows] = useState<IListagemFilme[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        FilmesService.getSuggested()
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    return;
                }
                setRows(result.data);
                setTotalCount(result.totalCount);
        });
    }, []);

    return (
        <LayoutBaseDePagina titulo="Filmes sugeridos">
            { !isLoading && (
                <>
                    Não está carregando
                </>
            )}
        </LayoutBaseDePagina>
    )
}