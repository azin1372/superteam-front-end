import { useUrl } from "@/hooks/useUrl";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";



export const useHistory = () => {

    const { addToQuery } = useUrl();
    const [searchParams] = useSearchParams();


    const [historyModal, setHistoryModal] = useState(false);
    const [histories, setHistories] = useState<{[key: string]: any}[]>([]);

    const addToHistory = (contract_address: string) => {
        const history = JSON.parse(localStorage.getItem("history") || "[]");

        const is_already_exists = history.find((h: { [key: string]: any }) => h?.contract_address === contract_address);
        if (is_already_exists) return;
        history.unshift({ contract_address, date: Date.now().toString() });
        localStorage.setItem("history", JSON.stringify(history));
    }

    const getHistories = () => {
        const history = JSON.parse(localStorage.getItem("history") || "[]");
        setHistories(history);
    }

    const changeContract = (addr: string) => {

        const current_addr = searchParams.get("contractAddress");
        if (current_addr === addr) return;

        addToQuery("contractAddress", addr);
    }


    const onCloseHistoryModal = () => {
        setHistoryModal(false);
    }

    useEffect(() => {
        getHistories();
    }, [])

    return {
        historyModal,
        changeContract,
        addToHistory,
        histories,
        setHistoryModal,
        onCloseHistoryModal,
        searchParams
    }

}