import api from '@/data/api';
import constants from '@/data/constants';
import { IEnemie, Item } from '@/typing.d.ts';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, Textarea, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaShieldAlt, FaTimesCircle } from 'react-icons/fa';
import ArmorBar from '../armorBar';
import HealthBar from '../heathBar';
import WeaponCard from '../weaponCard/index';

export default function EnemieCard({
    enemie,
}: {
    enemie: IEnemie;
}) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [text, setText] = useState(enemie.obs)

    function handleChangeHp(value: number | number[]) {
        if (typeof value === "number") {
            enemie.hp = value
            api.post("enemie/save", enemie);
        }
    }
    function handleChangeArmor(value: number | number[]) {
        if (typeof value === "number") {
            enemie.armor.hp = value
            api.post("enemie/save", enemie);
        }
    }
    function handleObs() {
        const updatedEnemie = {
            ...enemie,
            obs: text
        };
        api.post("enemie/save", updatedEnemie);
    }

    function useItem() {
        onClose();
        const item = enemie.items.find(it => it._id === selectedItem?._id);
        if (item != null) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                enemie.items = enemie.items.filter(it => it._id !== item._id);
            }

            const updatedEnemie = {
                ...enemie,
                items: [...enemie.items]
            };
            api.post("enemie/save", updatedEnemie)
        }
        setSelectedItem(null);
    }
    function kill() {
        api.delete("enemie/remove/" + enemie._id)
    }
    function handleUseItem(item: Item) {
        setSelectedItem(item)
        onOpen()
    }

    return (
        <>
            <div
                className={`flex flex-col h-full grow bg-neutral-900 transition-transform border-2 border-black`}>
                <div className={`flex justify-between items-center p-2 px-4 bg-neutral-800"`}>
                    <div className='flex gap-2 items-center'>
                        <div className='text-xl text-red-700 font-bold'>{enemie.name}</div>
                        <div className='flex items-center gap-1'><FaShieldAlt /> {enemie.armor.type}</div>
                    </div>
                    <button className='hover:text-red-700 cursor-pointer' onClick={kill}><FaTimesCircle size={25} /></button>
                </div>

                <div className="px-1">
                    <HealthBar
                        maxHealth={enemie.maxHp}
                        currentHealth={enemie.hp}
                        onChange={(newHealth) => handleChangeHp(newHealth)}
                    />
                    <ArmorBar
                        maxArmor={enemie.armor.maxHp}
                        currentArmor={enemie.armor.hp}
                        onChange={(newArmor) => handleChangeArmor(newArmor)}
                    />
                </div>

                <div className="flex flex-col h-full">
                    <WeaponCard player={enemie} type="primary" />
                    <hr className="m-0" />
                    <div className="grid grid-cols-3 grid-rows-1 gap-2 h-full p-2" >
                        {enemie.items.map((item, index) => (
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
                    <Textarea
                        aria-label="Descrição"
                        placeholder="Anotações"
                        value={text}
                        size='lg'
                        variant="flat"
                        radius='none'
                        maxRows={3}
                        onBlur={handleObs}
                        onValueChange={setText}
                    />
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