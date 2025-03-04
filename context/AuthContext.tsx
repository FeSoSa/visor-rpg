"use client";

import { IContext, IPlayer, IUser } from "@/typing.d.ts";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const InitialValue: IContext = {
    user: null,
    player: null,
    getUser: () => { },
    getPlayer: () => { },
    authenticated: false,
    setAuthenticated: () => { },
};

export const AuthContext = createContext<IContext>(InitialValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [player, setPlayer] = useState<IPlayer | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();  // Pega a pathname atual

    const getUser = () => {
        const userLocal: IUser = JSON.parse(localStorage.getItem("user") || '{}');
        setUser(userLocal);
    }
    const getPlayer = () => {
        const playerLocal: IPlayer = JSON.parse(localStorage.getItem("player") || '{}');
        setPlayer(playerLocal);
    }

    useEffect(() => {
        getUser();
        getPlayer()
    }, []);

    useEffect(() => {
        const token = Cookies.get("token");
        const userLocal: IUser = JSON.parse(localStorage.getItem("user") || '{}');
        if (!token || token != userLocal.token) {
            localStorage.clear()
            Cookies.remove('token')
            router.push("/");
            setLoading(false);
            return;
        }
        if (userLocal) {
            if (pathname === "/admin" && userLocal.role !== "admin") {
                router.push(`/players`);
                setLoading(false);
            }
            else if (pathname === "/" && userLocal.role == "admin") {
                router.push(`/admin`);
                setLoading(false);
            }
            else if (pathname === "/" && userLocal.role == "player") {
                router.push(`/players`);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } else {
            router.push(`/`);
            setLoading(false);
        }

    }, [pathname]);

    return (
        <AuthContext.Provider value={{ user, getUser, player, getPlayer, authenticated, setAuthenticated }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
