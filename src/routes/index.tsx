import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { DetalheDePessoas, ListagemDePessoas, Sugestoes } from "../pages";
import { ListagemDeCidades } from "../pages/cidades/ListagemDeCidades";
import { DetalheDeCidades } from "../pages/cidades/DetalheDeCidades";

export const AppRoutes = () => {

    const { setDrawerOptions } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Sugeridos',
                icon: 'home',
                path: '/home'
            },
            {
                label: 'Buscar',
                icon: 'search',
                path: '/buscar'
            },
            {
                label: 'Watchlist',
                icon: 'favorite',
                path: '/watchlist'
            },
        ]);
    },[setDrawerOptions])

    return (
        <Routes>
            <Route path="/home" element={<Sugestoes/>}/>

            <Route path="/cidades" element={<ListagemDeCidades/>}/>
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades/>}/>

            <Route path="/pessoas" element={<ListagemDePessoas/>}/>
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    );
}