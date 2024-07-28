import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { IListagemFilme } from "../filmes/FilmesService";

export interface IListagemWatchlist {
    id: number;
    perfilId: number;
    filmeId: number;
    assistido: boolean;
    detalhes: IListagemFilme;
}

type TWatchlistComTotal = {
    data: IListagemWatchlist[];
    totalCount: number;
}

const getAll = async (perfilId: number): Promise<TWatchlistComTotal | Error> => {
    try {
        const urlRelativa = `/filmes/${perfilId}/para-assistir`;

        const { data, headers } = await Api().get(urlRelativa);
    
        if (data) {
            return {
                data,
                totalCount: Number(
                    headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
                )
            }
        }
    
        return new Error('Erro ao listar os registros');
    } catch (error) {
        console.error(error);
        return (
            new Error((error as { message: string }).message) || 'Erro ao listar os registros'
        );
    }
}

const create = async (perfilId: number, filmeId: number): Promise<number | Error> => {
    try {
        const urlRelativa = `/filmes/${perfilId}/para-assistir/${filmeId}`;

        const { data } = await Api().post<IListagemWatchlist>(urlRelativa);

        if (data) {
            return data.id;
        }

        return new Error('Erro ao criar o registro');
    } catch (error) {
        console.error(error);
        return (
            new Error((error as { message: string }).message) ||
            "Erro ao criar o registro."
        );
    }
}

export const WatchlistServices = {
    getAll,
    create,
}