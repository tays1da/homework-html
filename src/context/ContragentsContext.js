import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    createContragent,
    deleteContragent as deleteContragentRequest,
    getContragents,
    updateContragent
} from '../api/contragentsApi';

const ContragentsContext = createContext(null);

export function ContragentsProvider({ children }) {
    const [contragents, setContragents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadContragents();
    }, []);

    async function loadContragents() {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getContragents();
            setContragents(data);
        } catch (requestError) {
            setError('Не удалось загрузить контрагентов');
        } finally {
            setIsLoading(false);
        }
    }

    async function saveContragent(payload) {
        setError(null);

        try {
            if (payload.id == null) {
                const createdContragent = await createContragent(payload);
                setContragents((previousContragents) => [...previousContragents, createdContragent]);
                return;
            }

            const updatedContragent = await updateContragent(payload.id, payload);
            setContragents((previousContragents) =>
                previousContragents.map((contragent) => {
                    if (contragent.id === payload.id) {
                        return updatedContragent;
                    }

                    return contragent;
                })
            );
        } catch (requestError) {
            setError('Не удалось сохранить контрагента');
            throw requestError;
        }
    }

    async function deleteContragent(id) {
        setError(null);

        try {
            await deleteContragentRequest(id);
            setContragents((previousContragents) =>
                previousContragents.filter((contragent) => contragent.id !== id)
            );
        } catch (requestError) {
            setError('Не удалось удалить контрагента');
            throw requestError;
        }
    }

    const value = useMemo(
        () => ({
            contragents,
            isLoading,
            error,
            loadContragents,
            saveContragent,
            deleteContragent
        }),
        [contragents, isLoading, error]
    );

    return <ContragentsContext.Provider value={value}>{children}</ContragentsContext.Provider>;
}

export function useContragents() {
    const context = useContext(ContragentsContext);

    if (!context) {
        throw new Error('useContragents must be used within ContragentsProvider');
    }

    return context;
}
