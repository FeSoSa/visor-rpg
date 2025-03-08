import { Navbar, TabKey } from "@/components/navbar";
import DefaultLayout from "@/layouts/default";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import EnemiesTab from "./tabs/Enemies";
import GameTab from "./tabs/Game";
import PlayersTab from "./tabs/Players";
import Users from "./tabs/Users";

export default function AdminPage() {
    const [selected, setSelected] = useState<TabKey>("Users");
    const router = useRouter();

    const tabContent: Record<TabKey, ReactNode> = {
        Users: <Users />,
        Players: <PlayersTab />,
        Enemies: <EnemiesTab />, // Substitua pelo conteúdo de "Enemies"
        Game: <GameTab />, // Substitua pelo conteúdo de "Items"
    };

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            console.log("Usuário não autenticado, redirecionando...");
            router.push("/"); // Redireciona para a página inicial
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
