import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IDetalhePerfil {
  id: number;
  nome: string;
}

export interface IListagemPerfil {
  id: number;
  nome: string;
}

type TPerfisComTotalCount = {
  data: IListagemPerfil[];
  totalCount: number;
};

const getAll = async (): Promise<TPerfisComTotalCount | Error> => {
  try {
    const { data, headers } = await Api().get('/perfis');

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

const create = async (
  dados: Omit<IDetalhePerfil, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api().post<IDetalhePerfil>("/perfis", dados);

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

export const PerfisService = {
  getAll,
  create,
};
