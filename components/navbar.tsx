import { Button } from "@nextui-org/button";
import {
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar
} from "@nextui-org/navbar";
import Cookies from "js-cookie";
import Image from 'next/image';
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export type TabKey = "Users" | "Players" | "Enemies" | "Game";
interface I {
  selected: TabKey
  onSelect: Dispatch<SetStateAction<TabKey>>
}

export const Navbar = ({ selected, onSelect }: I) => {
  const router = useRouter();
  const tabs: { label: string; href: TabKey }[] = [
    { href: "Users", label: "Cadastro" },
    { href: "Players", label: "Jogadores" },
    { href: "Enemies", label: "Inimigos" },
    { href: "Game", label: "jogo" },
  ];

  function logout() {
    localStorage.clear()
    Cookies.remove("token")
    router.push("/")
  }

  return (
    <NextUINavbar maxWidth="full">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">

        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={50}
          height={50}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {tabs.map((item) => (
            <NavbarItem key={item.label} onClick={() => onSelect(item.href)} className="cursor-pointer">
              {item.label}
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          ONX-001
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button
            className="text-sm font-normal text-default-600 bg-default-100"
            onPress={logout}
            variant="flat"
          >
            Sair
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
