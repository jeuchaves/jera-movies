import { useCallback, useContext, useState, createContext } from "react";

interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOption[];
    selectedProfileId?: number;
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
    setSelectedProfileId: (newSelectedProfileId: number) => void;
}
const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
    return useContext(DrawerContext);
}

interface IThemeProviderProps {
    children: React.ReactNode
}
interface IDrawerOption {
    icon: string;
    label: string;
    path: string;
}
export const DrawerProvider: React.FC<IThemeProviderProps> = ({ children }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const [selectedProfileId, setSelectedProfileId] = useState<number | undefined>(undefined);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);

    const handleSelectedProfileId = useCallback((newSelectedProfileId: number) => {
        setSelectedProfileId(newSelectedProfileId);
    }, [])

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions, selectedProfileId, setSelectedProfileId: handleSelectedProfileId }}>
            {children}
        </DrawerContext.Provider>
    )
}