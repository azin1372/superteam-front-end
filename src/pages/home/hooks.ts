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
    const [bubble, setBubble] = useState<string | null>("") // string is in loading, null : has no screenshot!
    const [tokenData, setTokenData] = useState<{ [key: string]: any } | null | "loading">("loading"); // obj is in loading, null : has no data!


    const addToHistory = (contract_address: string) => {

        if (!contract_address || typeof contract_address !== "string" || contract_address.length <= 8) return;

        const history = JSON.parse(localStorage.getItem("history") || "[]");

        const is_already_exists = history.find((h: { [key: string]: any }) => h?.contract_address === contract_address);
        if (is_already_exists) return;
        history.unshift({ contract_address, date: Date.now().toString() });
        localStorage.setItem("history", JSON.stringify(history));
    }



    const countTodayScans = () => {

        let data = JSON.parse(localStorage.getItem("history") || "[]");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);


        const todayCount = data.filter((item: any) => {
            if (!item?.date) return false;
         
            const itemDate = new Date(Number(item.date));


            return itemDate >= today && itemDate < tomorrow;
        }).length;

        if (todayCount > 10) {
            console.log(`Warning: ${todayCount} scans recorded today, exceeding the limit of 10!`);
        }

        return todayCount;
    }


    const getThread = async (addr: string) => {
        try {


            const todays_scan = countTodayScans();
            const is_subscribed = localStorage.getItem("is_subscribed");

            console.log({todays_scan})
            if (todays_scan && todays_scan > 10 && !is_subscribed) {
                return addToast({
                    color: "danger",
                    title: "Maximum scan limit reached",
                    description: "You have scanned more than 10 contracts today, subscribe you account or try again tomorrow",
                });
            }


            if (!addr || addr.length <= 10) {
                return addToast({
                    color: "danger",
                    title: "Invalid Contract Address",
                    description: "Please enter a valid contract address in SOL",
                });
            }
            setLoading(true);

            //* reset 
            setResult({});
            addToQuery("contractAddress", addr);
            const { data } = await Api.get(`/threat/considerations/${addr}`);

            addToHistory(addr)
            getBubbleMap("B7xavrAozTa1msQxu8YAcvPftf76x1fJYyLrYdTnbrah");
            getData(addr);

            setResult(data?.data || {});
        } catch (e) {
            console.log("e", e);
        } finally {
            setLoading(false);
        }
    }

    const getBubbleMap = async (addr: string) => {
        try {
            setBubble("");
            const { data } = await Api.get(`/bubble-map/${addr}`);

            if (data?.data) setBubble(data?.data);
            else setBubble(null)

        } catch (e) {
            console.log("E", e);
        } finally {
            //
        }
    }

    const getData = async (addr: string) => {
        try {
            setTokenData("loading");
            const { data } = await Api.get(`/token-info/${addr}`);
            if (data?.data) setTokenData(data?.data);
            else setTokenData(null)
        } catch (e) {
            console.log("e", e);
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
            getThread(contract_address_param);
            setContractAddress(contract_address_param);
        }
        else if (!contract_address_param) searchParams.delete("contractAddress");

    }, [searchParams])



    return {
        loading,
        getThread,
        contractAddress,
        setContractAddress,
        result,
        findTopic,
        bubble,
        tokenData,
    }


}