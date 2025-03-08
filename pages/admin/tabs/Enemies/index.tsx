import EnemieCard from '@/components/EnemieCard';
import { useWebSocket } from '@/context/WebSocketContext';
import api from '@/data/api';
import { armorMock } from '@/data/armors';
import { enemiesMock } from '@/data/enemies';
import { itemsMock } from '@/data/items';
import { weaponMock } from '@/data/weapons';
import { IEnemie, MagazineSlot } from '@/typing.d.ts';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { JSX, useEffect, useState } from 'react';

export default function EnemiesTab(): JSX.Element {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedEnemie, setSelectedEnemie] = useState<string | undefined>();
    const [enemies, setEnemies] = useState<IEnemie[]>([]);
    const { socket } = useWebSocket();

    const enemieWeapons = ['ak47', 'uzi', 'glock', 'awp', 'ak47', 'uzi', 'gauge', 'uzi', 'glock', 'ak47']
    const enemieVests = ['light', 'none', 'medium', 'heavy', 'light', 'none']
    const enemieItems = ['frag', '', '', '']
    const enemiesArray = Object.values(enemiesMock);


    useEffect(() => {
        getEnemies()
    }, [])
    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                let message;
                try {
                    message = JSON.parse(event.data);
                    if (message.event === "enemie-updated") {
                        getEnemies();
                    }
                } catch (e) {
                    console.log("Mensagem recebida (não JSON):", event.data);
                }
            };
        }
    }, [socket]);

    function getEnemies() {
        api.get(`enemie/list`).then((resp) => {
            if (resp.data != null) {
                setEnemies([...resp.data])
            }
        });
    }
    function getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function randomEnemie() {
        const maxHp = getRandomNumber(15, 25);
        const vest = armorMock[enemieVests[getRandomNumber(0, enemieVests.length - 1)]] ?? null;
        const weapon = weaponMock[enemieWeapons[getRandomNumber(0, enemieWeapons.length - 1)]];
        const items = [itemsMock[enemieItems[getRandomNumber(0, enemieItems.length - 1)]]].filter(Boolean);
        const magazines: MagazineSlot[] = [];

        if (weapon.type != "I") {

            for (let index = 0; index < vest.slots; index++) {
                const magazine: MagazineSlot = {
                    capacity: weapon.capacity,
                    bullets: getRandomNumber(0, weapon.capacity),
                    type: weapon.type
                };
                magazines.push(magazine);
            }
        } else {
            magazines.push({ bullets: weapon.capacity, capacity: weapon.capacity, type: "I" })
            magazines.push({ bullets: getRandomNumber(0, weapon.capacity * vest.slots), capacity: (weapon.capacity * vest.slots), type: "I" })
        }

        const enemie: IEnemie = {
            maxHp: maxHp,
            hp: getRandomNumber(10, maxHp),
            name: "Inimigo",
            armor: vest,
            gun: weapon,
            magazines: magazines,
            items: items,
            obs: ""
        };

        api.post("enemie/save", enemie).then((resp) => {
            setEnemies([...enemies, resp.data]);
        });
    }

    function generateEnemie() {
        if (selectedEnemie != null) {
            const enemie = enemiesArray.find(it => it.name == selectedEnemie)
            api.post("enemie/save", enemie).then((resp) => {
                setEnemies([...enemies, resp.data]);
            });
            setSelectedEnemie(undefined)
        }
        onClose()
    }

    return (
        <>
            <section className="w-full h-full flex flex-row">
                <div className="grid grid-flow-row grid-cols-5 grid-rows-2 h-full w-full">
                    {enemies.map((enemie, index) => (
                        <EnemieCard
                            enemie={enemie}
                            key={index}
                        />
                    ))}
                </div>
                <section className='flex flex-col'>
                    <Button className="w-full h-full bg-red-900 border-4 border-neutral-900 font-bold lg:text-lg text-wrap" radius="none" onPress={onOpen}>
                        Gerar Inimigo
                    </Button>
                    <Button className="w-full h-full bg-red-900 border-4 border-neutral-900 font-bold lg:text-lg text-wrap" radius="none" onPress={randomEnemie}>
                        Gerar Inimigo Aleatório
                    </Button>
                </section>
            </section>

            <Modal isOpen={isOpen} isDismissable={true} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Gerar inimigo</ModalHeader>
                            <ModalBody>
                                <Select
                                    items={enemiesArray}
                                    className='max-w-md'
                                    size='lg'
                                    aria-label="Selecionar inimigo"
                                    placeholder="Selecione"
                                    onChange={(e) => setSelectedEnemie(e.target.value)}
                                    selectedKeys={[selectedEnemie ?? ""]}
                                >
                                    {(enemie) => <SelectItem key={enemie.name}>{enemie?.name}</SelectItem>}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" className='w-full' onPress={onClose}  >
                                    Cancelar
                                </Button>
                                <Button color="success" className='w-full' onPress={generateEnemie}  >
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
