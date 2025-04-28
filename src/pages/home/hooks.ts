import { useUrl } from "@/hooks/useUrl";
import { addToast } from "@heroui/react";
import axios from "axios";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";



export const useResult = () => {

    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [contractAddress, setContractAddress] = useState("");
    const {addToQuery} = useUrl();



    const getData = async (addr: string) => {
        try {
            if (!addr || addr.length <= 10) {
                return addToast({
                    color: "danger",
                    title: "Invalid Contract Address",
                    description: "Please enter a valid contract address in SOL",
                });
            }
            setLoading(true);
            addToQuery("contractAddress", addr);
            // const {data}  = await axios.get("")
        } catch (e) {
            console.log("e", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const contract_address_param = searchParams.get("contractAddress");

        if (contract_address_param && contract_address_param.length > 10) getData(contract_address_param);
        else if (!contract_address_param) searchParams.delete("contractAddress");

    }, [])



    return {
        loading,
        getData,
        contractAddress,
        setContractAddress
    }


}