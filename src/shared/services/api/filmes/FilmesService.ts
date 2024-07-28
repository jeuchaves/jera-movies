import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IDetalheFilme {
  id: number;
  nome: string;
}

export interface IListagemFilme {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type TFilmesComTotalCount = {
  data: IListagemFilme[];
  totalCount: number;
  totalPages: number;
};

const getSuggested = async (perfilId: number, page = 1): Promise<TFilmesComTotalCount | Error> => {
    try {
        const urlRelativa = `/filmes/${perfilId}/sugeridos?page=${page}`;

        const { data, headers } = await Api().get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(
                  headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
                ),
                totalPages: Number(
                  headers["x-total-pages"] || '1'
                ),
            }
        }

        return new Error("Erro ao listar os registros.");
    } catch (error) {
        console.error(error);
        return (
          new Error((error as { message: string }).message) || "Erro ao listar os registros."
        );
    }
}

const getAll = async (
  page = 1,
  filter = ""
): Promise<TFilmesComTotalCount | Error> => {
  try {
    const urlRelativa = `/filmes?page=${page}&filter=${filter}`;

    const { data, headers } = await Api().get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
        totalPages: Number(
          headers["x-total-pages"] || '1'
        ),
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao listar os registros."
    );
  }
};

export const FilmesService = {
  getAll,
  getSuggested,
};
