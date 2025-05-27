import { GameContext } from '@/context/gameContext';
import api from '@/data/api';
import constants from '@/data/constants';
import { IEnemie, IPlayer } from '@/typing.d.ts';
import Image from 'next/image';
import { useContext, useState } from 'react';

export interface I {
    player: IPlayer | IEnemie
    type: 'primary' | 'secondary',
}
// Type Guard para verificar se o player é um IPlayer
const isPlayer = (p: IPlayer | IEnemie): p is IPlayer => 'guns' in p;

export default function WeaponCard({ player, type, }: I) {
    const { prepare, isShooting, shoot, shooted } = useContext(GameContext)
    const [bulletCount, setBulletCount] = useState('');
    const weapon = isPlayer(player) ? player.guns[type] : player.gun;
    const magazines = isPlayer(player) ? player.magazines[type] : player.magazines;
    const magazineIndex = weapon?.magazineSelected ?? 0;

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
            <div className='flex flex-row'>
                <Image
                    src={`${constants.driveURL}${weapon?.url}`}
                    alt={`${type} - ${weapon?.name}`}
                    width={110}
                    height={75}
                    style={{
                        objectFit: "contain",
                    }}
                    className={`p-2 cursor-pointer ${(isShooting && shoot?._id == player._id && (isPlayer(player) && player.gunSelected == type || !isPlayer(player))) ? 'bg-amber-500' : isPlayer(player) && (player.gunSelected == type || weapon?.type == "shield") && 'bg-[#15803d]'}`}
                    onClick={() => {
                        if (weapon?.type === "shield") return;
                        if ((!isPlayer(player) || player.gunSelected === type)) prepare(player);
                        else changeWeapon();
                    }}
                />
                {
                    type == "primary" && isPlayer(player) &&
                    <div className='grid grid-rows-3 grid-cols-1 w-10 p-1 gap-1'>
                        {[...Array(3)].map((_, index) => {
                            const att = weapon?.attachment?.[index];
                            return (
                                <div className='bg-neutral-700 rounded flex items-center justify-center'>
                                    {att?.url != null &&
                                        <Image
                                            key={index}
                                            src={`${constants.driveURL}${att.url}`}
                                            alt="attachment"
                                            width={16}
                                            height={16}
                                            style={{ objectFit: "cover" }}
                                        />}
                                </div>
                            );
                        })}
                    </div>
                }
                <div className={`flex flex-wrap w-full grid  grid-rows-2 grid-flow-row ${type == "primary" ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {magazines?.map((magazine, index) => (
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
        </>
    );
}
