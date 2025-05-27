"use client";

import HealthBar from "@/components/heathBar";
import api from "@/data/api";
import { IEnemie, IPlayer } from "@/typing.d.ts";
import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface IContext {
    isShooting: boolean,
    setIsShooting: Dispatch<SetStateAction<boolean>>,
    shoot: IPlayer | IEnemie | undefined,
    setShoot: Dispatch<SetStateAction<IPlayer | IEnemie | undefined>>,
    shooted: IEnemie | IPlayer | undefined,
    setShooted: Dispatch<SetStateAction<IEnemie | IPlayer | undefined>>,
    prepare: (x: IPlayer | IEnemie) => void,
}
const InitialValue: IContext = {
    isShooting: false,
    setIsShooting: () => { },
    shoot: undefined,
    setShoot: () => { },
    shooted: undefined,
    setShooted: () => { },
    prepare: (x: IPlayer | IEnemie) => { }
};

export const GameContext = createContext<IContext>(InitialValue);
const isPlayer = (p: IPlayer | IEnemie): p is IPlayer => {
    return (p as IPlayer).userRegistry !== undefined;
};
export function GameProvider({ children }: { children: React.ReactNode }) {
    const [isShooting, setIsShooting] = useState(false);
    const [shoot, setShoot] = useState<IPlayer | IEnemie | undefined>();
    const [shooted, setShooted] = useState<IEnemie | IPlayer | undefined>();
    const [damage, setDamage] = useState(0);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


    const { player } = useContext(AuthContext)

    useEffect(() => {
        if (shoot != null && shooted != null) {
            onOpen()
            setIsShooting(false)
        }
    }, [shoot, shooted]);

    async function fire(e: any) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        const bulletCountNumber = Number(data.bullets);
        const damage = Number(data.damage);
        const availableBullets = (shoot != null && isPlayer(shoot)
            ? shoot.magazines[shoot.gunSelected]?.[shoot.guns[shoot.gunSelected]?.magazineSelected ?? 0]?.bullets
            : shoot?.magazines[shoot.gun?.magazineSelected ?? 0].bullets) ?? 0
        const magazines = isPlayer(shoot!)
            ? shoot.magazines[shoot.gunSelected]!
            : shoot?.magazines!
        const magazineIndex = isPlayer(shoot!)
            ? shoot.guns[shoot.gunSelected]?.magazineSelected ?? 0
            : shoot!.gun?.magazineSelected ?? 0
        if (bulletCountNumber <= availableBullets) {
            const updatedMagazines = [...magazines];
            updatedMagazines[magazineIndex].bullets -= bulletCountNumber;
            const updatedPlayer = isPlayer(shoot!)
                ? {
                    ...shoot,
                    magazines: {
                        ...shoot.magazines,
                        [shoot.gunSelected]: updatedMagazines
                    }
                }
                : {
                    ...shoot,
                    magazines: updatedMagazines
                };

            api.post(`${isPlayer(shoot!) ? 'player' : 'enemie'}/save`, updatedPlayer);
        }
        else {
            const updatedMagazines = [...magazines];
            updatedMagazines[magazineIndex].bullets = 0;
            const updatedPlayer = isPlayer(shoot!)
                ? {
                    ...shoot,
                    magazines: {
                        ...shoot.magazines,
                        [shoot.gunSelected]: updatedMagazines
                    }
                }
                : {
                    ...shoot,
                    magazines: updatedMagazines
                };

            api.post(`${isPlayer(shoot!) ? 'player' : 'enemie'}/save`, updatedPlayer);
        }

        if (damage > 0) {
            const updatedPlayer = {
                ...shooted,
                hp: Math.max(0, shooted!.hp - damage)
            }

            api.post(`${isPlayer(shooted!) ? 'player' : 'enemie'}/save`, updatedPlayer);
        }

        setShoot(undefined)
        setShooted(undefined)
        setDamage(0)
        onClose();
    }
    function prepare(target: IPlayer | IEnemie) {
        const same = shoot?._id === target._id;

        if (same) {
            setShoot(undefined);
            setShooted(undefined);
            setIsShooting(false);
        } else if (shoot != undefined && isPlayer(shoot) !== isPlayer(target)) {
            setShooted(target);
            setIsShooting(true);
        } else {
            setShoot(target);
            setShooted(undefined);
            setIsShooting(true);
        }
    }

    return (
        <GameContext.Provider value={{ isShooting, setIsShooting, shoot, setShoot, setShooted, shooted, prepare }}>
            {children}

            <Modal isOpen={isOpen} isDismissable={true} onOpenChange={onOpenChange} className="flex flex-col gap-2">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Atirar</ModalHeader>
                            <ModalBody >
                                <Form validationBehavior="native" onSubmit={fire} >
                                    <Input
                                        type='number'
                                        label="Balas"
                                        name='bullets'
                                        placeholder="Atirou quantas balas?"
                                        variant="bordered"
                                        min={1}
                                        max={
                                            shoot != null && isPlayer(shoot)
                                                ? shoot.magazines[shoot.gunSelected]?.[shoot.guns[shoot.gunSelected]?.magazineSelected ?? 0]?.bullets
                                                : shoot?.magazines[shoot.gun?.magazineSelected ?? 0]?.bullets
                                        }
                                    />
                                    <Input
                                        type='number'
                                        label="Dano"
                                        name='damage'
                                        placeholder="Quanto de dano?"
                                        variant="bordered"
                                        min={0}
                                        onChange={(e) => setDamage(Math.max(0, Number(e.target.value)))}
                                    />

                                    <div className="w-full my-5">
                                        <HealthBar disabled currentHealth={shooted?.hp! - damage} maxHealth={shooted?.maxHp!} />
                                    </div>

                                    <Button color="success" className="w-full" type="submit">
                                        Confirmar
                                    </Button>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </GameContext.Provider>
    );
}
