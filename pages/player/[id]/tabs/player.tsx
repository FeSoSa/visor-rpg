import ArmorBar from '@/components/armorBar';
import HealthBar from '@/components/heathBar';
import WeaponPlayerCard from '@/components/weaponPlayerCard';
import constants from '@/data/constants';
import { IGame, IPlayer } from '@/typing.d.ts';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import Image from 'next/image';

export default function Player({ player, game }: { player: IPlayer, game: IGame }) {
    return (
        <section className="d-flex w-full h-full p-2">
            <div className='grid grid-rows-2 grid-flow-row grid-cols-4 w-full h-full gap-2'>

                <div className="relative w-full h-full ">
                    <Image
                        src={`${constants.driveURL}${player.photo}`}
                        alt="PlayerPhoto"
                        objectFit="cover"
                        fill
                        objectPosition='center'
                        className='bg-neutral-800'
                    />
                </div>

                <div className='col-span-2'>
                    <WeaponPlayerCard type='primary' player={player} key={0} />
                </div>

                <div className="grid grid-cols-2 grid-rows-3 h-full gap-2" >
                    {player.items.map((item, index) => (

                        <Popover showArrow={true} placement='left'>
                            <PopoverTrigger>
                                <div
                                    key={index}
                                    className="relative flex items-center justify-center bg-neutral-800 p-6 hover:bg-neutral-700 cursor-pointer"
                                >
                                    <div className="absolute top-0 m-2 right-0 bg-neutral-900 text-white text-sm px-2 rounded-full">
                                        {item.quantity}
                                    </div>
                                    <Image
                                        src={constants.driveURL + item.url}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        style={{
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <div className="text-small font-bold">{item.name}</div>
                                    <div className="text-tiny">{item.desc}</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>

                <div className="text-center d-flex flex-column w-full h-full px-2">
                    <div className="text-2xl font-bold">{player.name}</div>
                    <p>
                        Codinome: <strong>{player.codename}</strong>
                    </p>
                    <div className='md:text-sm mb-4'>
                        Registro: <strong>{player.registry}</strong>
                    </div>
                    <HealthBar maxHealth={player.maxHp} currentHealth={player.hp} disabled={true} />
                    <ArmorBar maxArmor={player.armor.maxHp} currentArmor={player.armor.hp} disabled={true} />

                    <div className='relative h-full w-full md:hidden'>

                        <Image
                            src="/assets/logo.png"
                            alt="ONIX"
                            fill
                            style={{
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </div>

                <div className='col-span-2'>
                    <WeaponPlayerCard type='secondary' player={player} key={1} />
                </div>

                <div className="grid grid-cols-2 grid-rows-3 h-full gap-2" >
                    {player.utilitaries.map((item, index) => (

                        <Popover showArrow={true} placement='left'>
                            <PopoverTrigger>
                                <div
                                    key={index}
                                    className="relative flex items-center justify-center bg-neutral-800 p-6 hover:bg-neutral-700 cursor-pointer"
                                >
                                    <div className="absolute top-0 m-2 right-0 bg-neutral-900 text-white text-sm px-2 rounded-full">
                                        {item.quantity}
                                    </div>
                                    <Image
                                        src={constants.driveURL + item.url}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        style={{
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <div className="text-small font-bold">{item.name}</div>
                                    <div className="text-tiny">{item.desc}</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>

            </div>
        </section>
    )
}
