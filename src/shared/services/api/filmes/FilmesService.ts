import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IDetalheFilme {
  id: number;
  nome: string;
}

export interface IListagemFilme {
  id: number;
  nome: string;
}

type TFilmesComTotalCount = {
  data: IListagemFilme[];
  totalCount: number;
};

const getSuggested = async (page = 1, deep = 2): Promise<TFilmesComTotalCount | Error> => {
    try {
        const urlRelativa = `/filmes/sugeridos?page=${page}&deep=${deep}`;

        const { data, headers } = await Api().get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers["x-total-count"] || Environment.LIMITE_DE_LINHAS),
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
    const urlRelativa = `/filmes?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;

    const { data, headers } = await Api().get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
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

const getById = async (id: number): Promise<IDetalheFilme | Error> => {
  try {
    const { data } = await Api().get(`/filmes/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<IDetalheFilme, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api().post<IDetalheFilme>("/filmes", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheFilme
): Promise<void | Error> => {
  try {
    await Api().put(`/filmes/${id}`, dados);
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/filmes/${id}`);
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao remover o registro."
    );
  }
};

export const FilmesService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  getSuggested,
};
