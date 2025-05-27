import { Navbar, TabKey } from "@/components/navbar";
import DefaultLayout from "@/layouts/default";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import GameTab from "./tabs/Game";
import MapTab from "./tabs/Map";
import PlayersTab from "./tabs/Players";
import Users from "./tabs/Users";

export default function AdminPage() {
    const [selected, setSelected] = useState<TabKey>("Users");
    const router = useRouter();

    const tabContent: Record<TabKey, ReactNode> = {
        Users: <Users />,
        Players: <PlayersTab />,
        Game: <GameTab />,
        Map: <MapTab />,
    };

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            console.log("Usuário não autenticado, redirecionando...");
            router.push("/");
        }
    }, []);

    return (
        <DefaultLayout>
            <div className="flex flex-col h-full">
                <Navbar selected={selected} onSelect={setSelected} />
                <main className="flex-1 w-full h-full bg-neutral-950">{tabContent[selected]}</main>
            </div>
        </DefaultLayout>
    );
}
