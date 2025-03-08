import api from '@/data/api';
import constants from '@/data/constants';
import { IEnemie, IPlayer } from '@/typing.d.ts';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';

export interface I {
    player: IPlayer | IEnemie
    type: 'primary' | 'secondary',
}
// Type Guard para verificar se o player é um IPlayer
const isPlayer = (p: IPlayer | IEnemie): p is IPlayer => 'guns' in p;

export default function WeaponCard({ player, type, }: I) {
    const [bulletCount, setBulletCount] = useState('');
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const weapon = isPlayer(player) ? player.guns[type] : player.gun;
    const magazines = isPlayer(player) ? player.magazines[type] : player.magazines;
    const magazineIndex = weapon?.magazineSelected ?? 0;

    function fire() {
        onClose();

        const bulletCountNumber = Number(bulletCount);
        const availableBullets = magazines[magazineIndex].bullets;

        if (bulletCountNumber <= availableBullets) {
            const updatedMagazines = [...magazines];
            updatedMagazines[magazineIndex].bullets -= bulletCountNumber;
            const updatedPlayer = isPlayer(player)
                ? {
                    ...player,
                    magazines: {
                        ...player.magazines,
                        [type]: updatedMagazines
                    }
                }
                : {
                    ...player,
                    magazines: updatedMagazines
                };

            api.post(`${isPlayer(player) ? 'player' : 'enemie'}/save`, updatedPlayer);
            setBulletCount('');
        } else {
            const updatedMagazines = [...magazines];
            updatedMagazines[magazineIndex].bullets = 0;
            const updatedPlayer = isPlayer(player)
                ? {
                    ...player,
                    magazines: {
                        ...player.magazines,
                        [type]: updatedMagazines
                    }
                }
                : {
                    ...player,
                    magazines: updatedMagazines
                };

            api.post(`${isPlayer(player) ? 'player' : 'enemie'}/save`, updatedPlayer);
            setBulletCount('');
        }
    }

    function changeMagazine(index: number) {
        if (magazineIndex !== index) {
            const updatedPlayer = isPlayer(player)
                ? {
                    ...player,
                    guns: {
                        ...player.guns,
                        [type]: {
                            ...player.guns[type],
                            magazineSelected: index
                        }
                    }
                }
                : {
                    ...player,
                    gun: {
                        ...player.gun,
                        magazineSelected: index
                    }
                };

            api.post(`${isPlayer(player) ? 'player' : 'enemie'}/save`, updatedPlayer);
        }
    }

    function changeWeapon() {
        const updatedPlayer = {
            ...player,
            gunSelected: type
        };
        api.post("player/save", updatedPlayer);
    }

    return (
        <>
            <div className="flex flex-row">
                <Image
                    src={`${constants.driveURL}${weapon.url}`}
                    alt={`${type} - ${weapon.name}`}
                    width={125}
                    height={75}
                    style={{
                        objectFit: "contain",
                    }}
                    className={`p-2 hover:bg-[${isPlayer(player) && player.gunSelected == type ? '#8B0000' : '#15803d'}] cursor-pointer ${isPlayer(player) && player.gunSelected == type && 'bg-[#15803d]'}`}
                    onClick={!isPlayer(player) || player.gunSelected == type ? onOpen : changeWeapon}
                />
                <div className="flex flex-wrap w-full grid grid-cols-4 grid-rows-2 grid-flow-row">
                    {magazines.map((magazine, index) => (
                        <div onClick={() => changeMagazine(index)}
                            className={`p-1 border-1 border-neutral-900 text-center text-black font-bold cursor-pointer
        hover:bg-lime-900 
        ${type === 'secondary' && "row-span-2 flex items-center justify-center"}
    `}
                            style={{
                                background: `linear-gradient(to bottom, #404040 ${100 - (magazine.bullets / magazine.capacity) * 100}%, 
            ${index === magazineIndex ? "#15803d" : "#22c55e"} ${100 - (magazine.bullets / magazine.capacity) * 100}%)`,
                                transition: 'background 0.2s ease-in-out', // transição suave para o gradiente
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = `linear-gradient(to bottom, #404040 ${100 - (magazine.bullets / magazine.capacity) * 100}%, 
            #15803d 0%)`; // ou a cor de hover desejada
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = `linear-gradient(to bottom, #404040 ${100 - (magazine.bullets / magazine.capacity) * 100}%, 
            ${index === magazineIndex ? "#15803d" : "#22c55e"} ${100 - (magazine.bullets / magazine.capacity) * 100}%)`; // gradiente original
                            }}
                            key={index}
                        >
                            {magazine.bullets}/{magazine.capacity}
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={isOpen} isDismissable={true} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Atirar</ModalHeader>
                            <ModalBody>
                                <Input
                                    type='number'
                                    label="Balas"
                                    placeholder="Atirou quantas balas?"
                                    variant="bordered"
                                    min={1}
                                    value={bulletCount}
                                    max={magazines[magazineIndex].bullets}
                                    onChange={(e) => setBulletCount(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" className='w-full' onPress={() => {
                                    if (magazines[magazineIndex].bullets >= Number(bulletCount) && Number(bulletCount) > 0) {
                                        fire();
                                    }
                                }}  >
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
