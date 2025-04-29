import { useUrl } from "@/hooks/useUrl";
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { Api } from "@/libs/axios";



export const useResult = () => {

    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [contractAddress, setContractAddress] = useState("");
    const { addToQuery } = useUrl();
    const [result, setResult] = useState<{ [key: string]: any }>({});


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
            const { data } = await Api.get(`/threat/considerations/${addr}`);

            console.log(data?.data);
            setResult(data?.data || {});
        } catch (e) {
            console.log("e", e);
        } finally {
            setLoading(false);
        }
    }


    const findTopic = () => {

        const tags = result?.issues?.[0]?.tags || [];

        const is_trusted = tags.find((t: any) => t.key === "trust_list");
        if (is_trusted) return is_trusted;

        const is_fake_token = tags.find((t: any) => t.key === "is_fake_token");
        if (is_fake_token) return is_fake_token;

        const is_stealing_attack = tags.find((t: any) => t.key === "stealing_attack");
        if (is_stealing_attack) return is_stealing_attack;

        const is_phishing_activities = tags.find((t: any) => t.key === "phishing_activities");
        if (is_phishing_activities) return is_phishing_activities;

        const is_sanctioned = tags.find((t: any) => t.key === "sanctioned");
        if (is_sanctioned) return is_sanctioned;

        const highestSeverityTag = tags.reduce(
            (max: any, current: any) => {
                return current.severity > max.severity ? current : max;
            },
            tags?.[0]
        );

        return highestSeverityTag;
    }

    useEffect(() => {
        const contract_address_param = searchParams.get("contractAddress");

        if (contract_address_param && contract_address_param.length > 10) {
            getData(contract_address_param);
            setContractAddress(contract_address_param);
        }
        else if (!contract_address_param) searchParams.delete("contractAddress");

    }, [])



    return {
        loading,
        getData,
        contractAddress,
        setContractAddress,
        result,
        findTopic
    }


}