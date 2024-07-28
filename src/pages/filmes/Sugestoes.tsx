import { useEffect, useState } from "react"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { FilmesService, IListagemFilme } from "../../shared/services/api/filmes/FilmesService";
import { LOCAL_STORAGE_PERFIL_ID } from "../../shared/services/api/Perfis/PerfisService";
import { SelecionarPerfil } from "../../shared/components";

export const Sugestoes = () => {

    const [rows, setRows] = useState<IListagemFilme[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isDialogProfilesOpen, setIsDialogProfilesOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        
        const perfilId = localStorage.getItem(LOCAL_STORAGE_PERFIL_ID);
        if (!perfilId) {
            setIsDialogProfilesOpen(true);
            setIsLoading(false);
            return;
        }

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

    const handleCloseDialogProfiles = () => {
        setIsDialogProfilesOpen(false);
    }

    return (
        <LayoutBaseDePagina titulo="Filmes sugeridos">
            <SelecionarPerfil open={isDialogProfilesOpen} onClose={handleCloseDialogProfiles} />
            Página
        </LayoutBaseDePagina>
    )
}