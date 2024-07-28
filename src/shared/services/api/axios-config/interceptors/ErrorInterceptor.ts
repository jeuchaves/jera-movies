import { AxiosError } from "axios";

interface ErrorResponse {
    errors: {
        default?: string;
    }
}

export const errorInterceptor = (error: AxiosError) => {
    
    if(error.message === 'Network Error') {
        return Promise.reject(new Error('Erro de conexão.'));
    }

    if(error.response?.status === 401) {
        localStorage.removeItem('APP_ACCESS_TOKEN');

        if(error.config?.url?.includes('entrar')) {
            alert((error.response.data as ErrorResponse).errors.default)
        } else {
            window.location.reload();
        }
    }

    if (error.response?.status === 400) {
        const errorMessage = (error.response.data as ErrorResponse).errors?.default;
        if (errorMessage === 'Perfil não encontrado') {
           // Faça algo...
        }
    }
    
    return Promise.reject(error);

}