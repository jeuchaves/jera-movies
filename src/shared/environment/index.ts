export const Environment = {
    /**
     * Define a quantidade de linhas a ser carregada por padrão nas listagens.
     */
    LIMITE_DE_LINHAS: 4,
    /**
     * Placeholder exbido na busca.
     */
    INPUT_DE_BUSCA: 'Pesquisar...',
    /**
     * Texto exibido quando nenhum registro é encontrado em uma listagem.
     */
    LISTAGEM_VAZIA: 'Nenhum registro encontado.',
    /**
     * URL base de consulta dos dados dessa aplicação.
     */
    URL_BASE: process.env.REACT_APP_BACKEND_URL || 'https://localhost:3333',
}