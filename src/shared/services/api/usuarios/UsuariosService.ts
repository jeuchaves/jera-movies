import { Api } from "../axios-config";

export interface IDetalheUsuario {
    id: number;
    email: string;
    senha: string;
    nome: string;
    dataNascimento: Date;
}

const create = async (dados: Omit<IDetalheUsuario, 'id'>): Promise<number | Error> => {
    try {

        const { data } = await Api().post<IDetalheUsuario>('/cadastrar', dados);

        if (data) {
            return data.id;
        }

        return new Error('Erro ao criar o registro.');

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message) || 'Erro ao criar o registro.';
    }
};

export const UsuariosService = {
    create,
}