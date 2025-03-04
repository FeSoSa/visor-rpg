import api from '@/data/api';
import constants from '@/data/constants';
import { IPlayer } from '@/typing.d.ts';
import { Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';

export interface I {
    player: IPlayer
    type: 'primary' | 'secondary',
}

export default function WeaponPlayerCard({ player, type }: I) {
    const [bulletCount, setBulletCount] = useState('');
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const weapon = player.guns[type]
    const magazines = player.magazines[type]
    const magazineIndex = weapon.magazineSelected

    function changeMagazine(index: number) {
        if (magazineIndex !== index) {
            const updatedPlayer = {
                ...player,
                guns: {
                    ...player.guns,
                    [type]: {
                        ...player.guns[type],
                        magazineSelected: index
                    }
                }
            };

            api.post("player/save", updatedPlayer)
        }
    }

    return (
        <>
            <div className="grid grid-rows-2 h-full">
                <Popover showArrow={true} placement='left'>
                    <PopoverTrigger>


                        <div className='w-full relative '>
                            <Image
                                src={constants.driveURL + weapon.url}
                                alt={`${type} - ${weapon.name}`}
                                fill
                                objectFit="contain"
                                className={`p-4 cursor-pointer ${player.gunSelected == type ? 'bg-emerald-950/50' : ''}`}
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div className="text-small font-bold text-[#22c55e]">{weapon.name}</div>
                            <div className="text-small font-bold">Tipo: {weapon.type}</div>
                            <div className="text-small font-bold">Capacidade: {weapon.capacity}</div>
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="flex flex-wrap w-full grid grid-cols-4 grid-rows-2 grid-flow-row">
                    {magazines.map((magazine, index) => (
                        <div onClick={() => changeMagazine(index)}
                            className={`p-1 border-1 border-neutral-900 text-center text-black font-bold cursor-pointer
                                ${type === 'secondary' && "row-span-2 flex items-center justify-center"}
                            `}
                            style={{
                                background: `linear-gradient(to bottom, #404040 ${100 - (magazine.bullets / magazine.capacity) * 100}%, 
                                    ${index === magazineIndex ? "#15803d" : "#22c55e"} ${100 - (magazine.bullets / magazine.capacity) * 100}%)`,
                                transition: 'background 0.2s ease-in-out', // transição suave para o gradiente
                            }}
                            key={index}
                        >
                            {magazine.bullets}/{magazine.capacity}
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}
