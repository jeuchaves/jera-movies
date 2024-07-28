import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Buscar, MinhaWatchlist, Sugestoes } from "../pages";

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
            <Route path="/home" element={<Sugestoes/>} />

            <Route path="/buscar" element={<Buscar/>} />

            <Route path="/watchlist" element={<MinhaWatchlist/>} />

            <Route path="*" element={<Navigate to="/home"/>} />
        </Routes>
    );
}