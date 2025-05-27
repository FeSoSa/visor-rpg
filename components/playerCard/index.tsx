import api from '@/data/api';
import constants from '@/data/constants';
import { IPlayer, Item } from '@/typing.d.ts';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import ArmorBar from '../armorBar';
import CompanionCard from '../CompanionCard';
import HealthBar from '../heathBar';
import WeaponCard from '../weaponCard/index';

export default function PlayerCard({
    player,
    selected,
    setPlayer,
    onOpenPlayer
}: {
    player: IPlayer;
    selected: IPlayer | undefined;
    setPlayer: Dispatch<SetStateAction<IPlayer | undefined>>;
    onOpenPlayer: () => void
}) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)

    function handleChangeHp(value: number | number[]) {
        if (typeof value === "number") {
            player.hp = value
            api.post("player/save", player);
        }
    }
    function handleChangeArmor(value: number | number[]) {
        if (typeof value === "number") {
            player.armor.hp = value
            api.post("player/save", player);
        }
    }
    function handleChangeCompanion(value: number | number[]) {
        if (typeof value === "number") {
            player.companion.hp = value
            api.post("player/save", player);
        }
    }
    function useItem() {
        onClose();
        const item = player.items.find(it => it._id === selectedItem?._id);
        if (item != null) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                player.items = player.items.filter(it => it._id !== item._id);
            }

            const updatedPlayer = {
                ...player,
                items: [...player.items]
            };
            api.post("player/save", updatedPlayer)
        }
        setSelectedItem(null);
    }
    function handleUseItem(item: Item) {
        setSelectedItem(item)
        onOpen()
    }

    return (
        <>
            <div
                className={`flex flex-col h-full grow bg-neutral-900 transition-transform ${selected?._id != player._id && "hover:scale-95"}`}
            >
                {/* Header */}
                <div
                    className={`grid grid-cols-3 cursor-pointer ease-out duration-300 ${selected?._id === player._id ? "bg-lime-900" : "bg-neutral-800"
                        }`}
                    onClick={() => { setPlayer(player); onOpenPlayer() }}
                >
                    <div className="relative col-span-2 w-full h-full">
                        <Image
                            src={player.photo ? `${constants.driveURL}${player.photo}` : "/assets/players/WP.png"}
                            alt="Player"
                            fill
                            objectFit="cover"
                            objectPosition="center"
                        />
                    </div>
                    <div className="p-1">
                        <div className="flex flex-col justify-between items-center">
                            <div className='text-xl font-bold'>{player.codename}</div>
                            <div className='line-clamp-1'>{player.name}</div>
                        </div>
                    </div>
                </div>
                {/* Bars */}
                <div className="px-1">
                    <HealthBar
                        maxHealth={player.maxHp}
                        currentHealth={player.hp}
                        onChange={(newHealth) => handleChangeHp(newHealth)}
                    />
                    <ArmorBar
                        maxArmor={player.armor.maxHp}
                        currentArmor={player.armor.hp}
                        onChange={(newArmor) => handleChangeArmor(newArmor)}
                    />
                </div>
                {/* Weapons and Items */}
                <div className="flex flex-col h-full overflow-hidden">
                    <WeaponCard player={player} type="primary" />
                    <hr className="m-0" />
                    {
                        player.companion != null
                            ? <CompanionCard player={player} onChange={(newHealth) => handleChangeCompanion(newHealth)} />
                            : <WeaponCard player={player} type="secondary" />
                    }
                    <hr className="m-0" />
                    <div className="grid grid-cols-4 grid-rows-1 gap-2 h-full p-2" >
                        {player.items.map((item, index) => (
                            <div onClick={() => handleUseItem(item)}
                                key={index}
                                className="relative flex items-center justify-center p-2 bg-neutral-950 hover:bg-neutral-800 cursor-pointer"
                            >
                                <div className="absolute top-0 m-2 right-0 bg-neutral-800 text-white text-sm px-2 rounded-full">
                                    {item.quantity}
                                </div>
                                <Image
                                    src={`${constants.driveURL}${item.url}`}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    style={{
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <h2 className='font-bold text-lg text-center'>Usar item?</h2>
                            </ModalBody>
                            <ModalFooter className='flex justify-center'>
                                <Button className='bg-red-700' onPress={onClose}>
                                    Não
                                </Button>
                                <Button color="success" onPress={() => useItem()}>
                                    Sim
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );

}