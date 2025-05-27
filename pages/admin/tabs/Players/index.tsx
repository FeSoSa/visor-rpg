import EnemieCard from '@/components/EnemieCard';
import PlayerCard from '@/components/playerCard';
import ReloadCard from '@/components/reloadCard';
import { useWebSocket } from '@/context/WebSocketContext';
import api from '@/data/api';
import { armorMock } from '@/data/armors';
import constants from '@/data/constants';
import { enemiesMock } from '@/data/enemies';
import { itemsMock } from '@/data/items';
import { attachmentMock, weaponMock } from '@/data/weapons';
import { Armor, Attachment, Gun, IEnemie, IPlayer, Item, MagazineSlot } from '@/typing.d.ts';
import { Button } from '@nextui-org/button';
import { Checkbox, Divider, Drawer, DrawerContent, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Radio, RadioGroup, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { JSX, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function PlayersTab(): JSX.Element {

    //! Drawers
    const {
        isOpen: isModalArmorOpen,
        onOpen: onModalArmorOpen,
        onOpenChange: onModalOpenArmorChange,
        onClose: onModalArmorClose
    } = useDisclosure();
    const {
        isOpen: isModalWeaponOpen,
        onOpen: onModalWeaponOpen,
        onOpenChange: onModalOpenWeaponChange,
        onClose: onModalWeaponClose
    } = useDisclosure();
    const {
        isOpen: isModalItemOpen,
        onOpen: onModalItemOpen,
        onOpenChange: onModalOpenItemChange,
        onClose: onModalItemClose
    } = useDisclosure();
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onOpenChange: onDrawerOpenChange
    } = useDisclosure();
    const {
        isOpen: isRemoveModalOpen,
        onOpen: onRemoveModalOpen,
        onOpenChange: onRemoveModalOpenChange,
        onClose: onModalRemoveClose
    } = useDisclosure();
    const {
        isOpen: isEnemyModalOpen,
        onOpen: onEnemyModalOpen,
        onOpenChange: onEnemyModalOpenChange,
        onClose: onModalEnemyClose
    } = useDisclosure();

    //! Variaveis
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [enemies, setEnemies] = useState<IEnemie[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | undefined>();
    const [selectedEnemy, setSelectedEnemy] = useState<IEnemie | undefined>();
    const [fire, setFire] = useState<Boolean>(false);

    const [selected, setSelected] = useState<string>("")
    const [selected2, setSelected2] = useState<string>("")
    const [selected3, setSelected3] = useState<boolean | undefined>(false)
    const [selected4, setSelected4] = useState<any[]>([])

    //!Itens
    const armorArray = Object.values(armorMock);
    const weaponArray = Object.values(weaponMock);
    const attachmentArray = Object.values(attachmentMock);
    const itemArray = Object.values(itemsMock);

    //! UseEffects
    const { socket } = useWebSocket();
    useEffect(() => {
        getPlayers()
        getEnemies()
    }, [])
    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                let message;
                try {
                    message = JSON.parse(event.data);
                    if (message.event === "player-updated") {
                        getPlayers();
                    }
                    if (message.event === "enemie-updated") {
                        getEnemies()
                    }
                } catch (e) {
                    console.log("Mensagem recebida (não JSON):", event.data);
                }
            };
        }
    }, [socket]);

    //!Player
    function getPlayers() {
        api.get(`player/status/ACTIVE`).then((resp) => {
            if (resp.data != null) {
                setPlayers([...resp.data.map((p: any) => ({ ...p }))])
                if (selectedPlayer != null) {
                    setSelectedPlayer(resp.data.find((it: IPlayer) => it._id == selectedPlayer._id))
                }
            }
        });
    }
    function getEnemies() {
        api.get(`enemie/list`).then((resp) => {
            if (resp.data != null) {
                setEnemies([...resp.data.map((p: any) => ({ ...p }))])
            }
        });
    }

    function useItem(item: Item) {
        if (!selectedPlayer || !item.usable) return;

        Swal.fire({
            text: item.name,
            title: "Usar item?",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Sim",
            denyButtonText: "Não",
            confirmButtonColor: '#365314'
        }).then((result) => {
            if (!result.isConfirmed) return;

            let updatedUtilitaries = [...selectedPlayer.utilitaries];
            const itemIndex = updatedUtilitaries.findIndex(it => it._id === item._id);

            if (itemIndex !== -1) {
                if (item.rechargeable) {
                    updatedUtilitaries[itemIndex] = {
                        ...updatedUtilitaries[itemIndex],
                        reloading: !updatedUtilitaries[itemIndex]?.reloading
                    };
                }
                else {
                    if (updatedUtilitaries[itemIndex].quantity > 1) {
                        updatedUtilitaries[itemIndex] = {
                            ...updatedUtilitaries[itemIndex],
                            quantity: updatedUtilitaries[itemIndex].quantity - 1
                        };
                    } else {
                        updatedUtilitaries.splice(itemIndex, 1);
                    }
                }

                const updatedPlayer = {
                    ...selectedPlayer,
                    utilitaries: updatedUtilitaries
                };

                api.post("player/save", updatedPlayer);
            }
        });
    }
    function changeArmor() {
        onModalArmorClose();
        if (selectedPlayer != null) {
            const armor = armorArray.find(it => it.type === selected);

            if (armor) {
                const magazines = { ...selectedPlayer.magazines };
                if (selectedPlayer.guns.primary.type != "shell") {

                    magazines.primary = magazines.primary
                        .sort((a, b) => b.bullets - a.bullets)
                        .slice(0, armor.slots);
                    while (magazines.primary.length < armor.slots) {
                        magazines.primary.push(
                            {
                                bullets: 0,
                                capacity: magazines.primary[0].capacity,
                                type: magazines.primary[0].type,
                            }
                        );
                    }
                } else {
                    magazines.primary[1].capacity = armor.slots * selectedPlayer.guns.primary.capacity
                }

                const updatedPlayer = {
                    ...selectedPlayer,
                    armor: armor,
                    magazines: magazines
                };

                api.post("player/save", updatedPlayer);
            }
        }

        setSelected("");
    }
    function changeGun() {
        onModalWeaponClose();

        if (selectedPlayer != null) {
            const weapon = weaponArray.find(it => it.name === selected);

            if (weapon && selectedPlayer.gunSelected != null) {
                const magazines = { ...selectedPlayer.magazines };

                if (weapon.type !== "shell") {
                    const newMagazines: MagazineSlot[] = [];
                    const numMagazines = selectedPlayer.gunSelected === 'primary' ? selectedPlayer.armor.slots : 4;
                    for (let index = 0; index < numMagazines; index++) {
                        newMagazines.push({
                            bullets: 0,
                            capacity: weapon.capacity,
                            type: weapon.type
                        });
                    }
                    magazines[selectedPlayer.gunSelected] = newMagazines;
                } else {
                    magazines[selectedPlayer.gunSelected] = [
                        {
                            bullets: 0,
                            capacity: weapon.capacity,
                            type: weapon.type
                        },
                        {
                            bullets: 0,
                            capacity: selectedPlayer.gunSelected === 'primary' ? selectedPlayer.armor.slots * weapon.capacity : 4 * weapon.capacity,
                            type: weapon.type
                        }
                    ];
                }

                weapon.attachment = selected4 != null
                    ? attachmentArray.filter(att => selected4.includes(att.name))?.slice(0, 3)
                    : [];

                const updatedPlayer = {
                    ...selectedPlayer,
                    guns: {
                        ...selectedPlayer.guns,
                        [selectedPlayer.gunSelected]: weapon
                    },
                    magazines: magazines
                };

                api.post("player/save", updatedPlayer);
                setSelected4([])
                setSelected("")
            }
        }

        setSelected("");
        setSelected2("");
    }
    function addItem() {
        onModalItemClose();
        if (selectedPlayer != null) {
            const updatedItems = [...selectedPlayer[selected2 as "utilitaries" | "items"]];

            const itemIndex = updatedItems.findIndex(it => it.name == selected);
            if (itemIndex !== -1) {
                updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: updatedItems[itemIndex].quantity + 1 };
            } else {
                const itemFromArray = itemArray.find(it => it.name === selected);
                if (itemFromArray) {
                    updatedItems.push({
                        ...itemFromArray,
                        rechargeable: selected3 || undefined,
                        reloading: selected3 == true ? false : undefined,
                        quantity: 1
                    });
                }
            }

            const updatedPlayer = {
                ...selectedPlayer,
                [selected2]: updatedItems
            };

            api.post("player/save", updatedPlayer);
        }

        setSelected("");
        setSelected2("");
        setSelected3(undefined);
    }
    function removeItem(item: Item, action: 'all' | 'one', type: 'items' | 'utilitaries') {
        if (selectedPlayer != null) {

            let updatedList = [...selectedPlayer[type]];

            if (action === 'all') {
                updatedList = updatedList.filter(it => it.name !== item.name);
            } else {
                const itemIndex = updatedList.findIndex(it => it.name === item.name);
                if (itemIndex !== -1) {
                    if (updatedList[itemIndex].quantity > 1) {
                        updatedList[itemIndex] = { ...updatedList[itemIndex], quantity: updatedList[itemIndex].quantity - 1 };
                    } else {
                        updatedList.splice(itemIndex, 1);
                    }
                }
            }

            selectedPlayer[type] = updatedList;
            api.post("player/save", selectedPlayer);
        }
        onModalRemoveClose()
    }
    const columns = [
        { name: "NOME", uid: "name" },
        { name: "QTD", uid: "qty" },
        { name: "ACTIONS", uid: "actions" },
    ];

    //!Inimigos
    const [selectedEnemie, setSelectedEnemie] = useState<string | undefined>();
    const enemieWeapons = ['ak47', 'uzi', 'glock', 'awp', 'ak47', 'uzi', 'gauge', 'uzi', 'glock', 'ak47', 'browning']
    const enemieVests = ['light', 'none', 'medium', 'heavy', 'light', 'none']
    const enemieItems = ['frag', '', '', '', 'molotov']
    const enemiesArray = Object.values(enemiesMock);
    function getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function kill(enemie: IEnemie) {
        setEnemies(prev => prev.filter(it => it._id !== enemie._id));
        api.delete("enemie/remove/" + enemie._id);
    }
    function randomEnemie() {
        const maxHp = getRandomNumber(15, 25);
        const vest = armorMock[enemieVests[getRandomNumber(0, enemieVests.length - 1)]] ?? null;
        const weapon = weaponMock[enemieWeapons[getRandomNumber(0, enemieWeapons.length - 1)]];
        const items = [itemsMock[enemieItems[getRandomNumber(0, enemieItems.length - 1)]]].filter(Boolean);
        const magazines: MagazineSlot[] = [];

        if (weapon.type != "shell") {

            for (let index = 0; index < vest.slots; index++) {
                const magazine: MagazineSlot = {
                    capacity: weapon.capacity,
                    bullets: getRandomNumber(0, weapon.capacity),
                    type: weapon.type
                };
                magazines.push(magazine);
            }
        } else {
            magazines.push({ bullets: weapon.capacity, capacity: weapon.capacity, type: "shell" })
            magazines.push({ bullets: getRandomNumber(0, weapon.capacity * vest.slots), capacity: (weapon.capacity * vest.slots), type: "shell" })
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
            const enemie = enemiesArray.find(it => it.name == "selectedEnemy")
            api.post("enemie/save", enemie).then((resp) => {
                setEnemies([...enemies, resp.data]);
            });
            setSelectedEnemie(undefined)
        }
        onModalEnemyClose()
    }

    return (
        <>
            <section className="h-full w-full flex flex-row">
                <div className="grid grid-cols-2 grid-rows-3 gap-2 w-full" style={{ height: 'calc(100vh - 65px)' }}>
                    {players.map((p) => (
                        <div key={p._id} className="w-full h-full overflow-hidden">
                            {p ? (
                                <PlayerCard
                                    player={p}
                                    key={p._id + p.hp}
                                    selected={selectedPlayer}
                                    setPlayer={setSelectedPlayer}
                                    onOpenPlayer={onDrawerOpen}
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
                <div className='bg-gray-600 p-1'></div>
                <div className={`grid grid-rows-3 gap-2 w-full ${enemies.length >= 6 ? 'grid-cols-3' : 'grid-cols-2'}`} style={{ height: 'calc(100vh - 65px)' }}>
                    {enemies.map((e) => (
                        <div key={e._id} className="w-full h-full overflow-hidden">
                            {e ? (
                                <EnemieCard
                                    enemie={e}
                                    key={e._id! + e.hp}
                                    kill={kill}
                                />
                            ) : null}
                        </div>
                    ))}
                    {
                        enemies.length < 9 &&
                        <section className='w-full h-full flex flex-col overflow-hidden gap-2 p-2'>
                            <Button className="w-full bg-[#27272A] h-full text-red-600 rounded-lg font-bold text-lg " radius="none" onPress={onEnemyModalOpen}>
                                Criar existente
                            </Button>
                            <Button className="w-full bg-[#27272A] h-full text-red-600 rounded-lg font-bold text-lg " radius="none" onPress={randomEnemie}>
                                Criar Aleatório
                            </Button>
                        </section>
                    }
                </div>
            </section>
            <Drawer isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange} radius='none'>
                <DrawerContent>
                    {(onClose) => (selectedPlayer &&
                        <>
                            <ReloadCard player={selectedPlayer} type="primary" />
                            <Divider />
                            {
                                selectedPlayer.guns.secondary != null &&
                                <ReloadCard player={selectedPlayer} type="secondary" />
                            }
                            <Divider />


                            <div className='h-full flex flex-col'>
                                <div className='text-center p-2'>
                                    Utilitários
                                </div>
                                <div className='grid grid-cols-2 grid-rows-2 grid-flow-row h-full m-2 gap-2'>
                                    {selectedPlayer?.utilitaries.map((item, index) => (
                                        <Popover key={index} color="default" placement='left'>
                                            <PopoverTrigger>
                                                <div
                                                    key={index}
                                                    onClick={() => useItem(item)}
                                                    className={`relative border-4 border-neutral-900 flex items-center justify-center p-2 ${item.reloading ? 'bg-red-950/25' : 'bg-neutral-950'} hover:bg-neutral-800 cursor-pointer`}
                                                >
                                                    <div className="absolute top-0 m-2 right-0 bg-neutral-800 text-white text-sm px-2 rounded-full">
                                                        {item.quantity}
                                                    </div>
                                                    {
                                                        item.url == null || item.url == ""
                                                            ? item.name
                                                            : <Image
                                                                src={constants.driveURL + item.url}
                                                                alt={item.name}
                                                                width={50}
                                                                height={50}
                                                                style={{
                                                                    objectFit: "contain",
                                                                }}
                                                            />
                                                    }
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

                            <div className="grid grid-cols-2 h-1/2">
                                <Button className="w-full h-full bg-lime-900 border-4 border-neutral-900 font-bold lg:text-lg text-wrap" radius="none" onPress={onModalArmorOpen}>
                                    Trocar colete
                                </Button>
                                <Button className="w-full h-full bg-lime-900 border-4 border-neutral-900 font-bold lg:text-lg text-wrap" radius="none" onPress={onModalWeaponOpen}>
                                    Trocar Arma
                                </Button>
                                <Button className="w-full h-full bg-lime-900 border-4 border-neutral-900 font-bold lg:text-lg text-wrap" radius="none" onPress={onModalItemOpen}>
                                    Adicionar
                                </Button>
                                <Button className="w-full h-full bg-lime-900 border-4 border-neutral-900 font-bold lg:text-lg text-wrap" radius="none" onPress={onRemoveModalOpen}>
                                    Remover
                                </Button>
                            </div>
                        </>
                    )}
                </DrawerContent>
            </Drawer>

            //!Troca de Colete
            <Modal isOpen={isModalArmorOpen} placement="top-center" onOpenChange={onModalOpenArmorChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Trocar colete</ModalHeader>
                            <ModalBody>
                                <Select
                                    items={armorArray}
                                    className='max-w-md'
                                    size='lg'
                                    placeholder="Selecione um colete"
                                    name='armor'
                                    aria-label='Colete'
                                    onChange={(e) => setSelected(e.target.value)}
                                    selectedKeys={[selected]}
                                >
                                    {(armor: Armor) => <SelectItem key={armor?.type}>{armor?.name}</SelectItem>}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={changeArmor}>
                                    Trocar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            //!Troca de Arma
            <Modal isOpen={isModalWeaponOpen} placement="top-center" onOpenChange={onModalOpenWeaponChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Trocar Arma</ModalHeader>
                            <ModalBody>
                                <Select
                                    items={weaponArray}
                                    className='max-w-md'
                                    size='lg'
                                    placeholder="Selecione uma arma"
                                    name='weapon'
                                    aria-label='Arma'
                                    onChange={(e) => setSelected(e.target.value)}
                                    selectedKeys={[selected]}
                                >
                                    {(gun: Gun) => <SelectItem key={gun?.name}>{gun?.name}</SelectItem>}
                                </Select>

                                <Select
                                    items={attachmentArray}
                                    className='max-w-md'
                                    size='lg'
                                    placeholder="Selecione os modificador"
                                    name='attachment'
                                    selectionMode="multiple"
                                    aria-label='Modificador'
                                    onChange={(e) => setSelected4(e.target.value.split(','))}
                                    selectedKeys={selected4}
                                >
                                    {(attachment: Attachment) => <SelectItem key={attachment?.name}>{attachment?.name}</SelectItem>}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={changeGun}>
                                    Trocar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            //!Adicionar Itens
            <Modal isOpen={isModalItemOpen} placement="top-center" onOpenChange={onModalOpenItemChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Adicionar item</ModalHeader>
                            <ModalBody>
                                <Select
                                    items={itemArray}
                                    className='max-w-md'
                                    size='lg'
                                    placeholder="Selecione um item"
                                    name='weapon'
                                    aria-label='Item'
                                    onChange={(e) => setSelected(e.target.value)}
                                    selectedKeys={[selected]}
                                >
                                    {(item: Item) => <SelectItem key={item?.name}>{item?.name}</SelectItem>}
                                </Select>
                                <RadioGroup label="Tipo de item" orientation="horizontal" value={selected2} onValueChange={setSelected2}>
                                    <Radio value="items">Normal</Radio>
                                    <Radio value="utilitaries">Gadget</Radio>
                                </RadioGroup>
                                <Checkbox isSelected={selected3} onValueChange={setSelected3}>
                                    Recarregavel
                                </Checkbox>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={addItem}>
                                    Adicionar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            //!Remover Itens
            <Modal isOpen={isRemoveModalOpen} placement="top-center" onOpenChange={onRemoveModalOpenChange} className='max-w-[60vw]' scrollBehavior='inside'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className='text-center'>
                                    <ModalHeader className="flex flex-col gap-1">Itens</ModalHeader>
                                    <Table aria-label="Utilitários" isStriped>
                                        <TableHeader columns={columns}>
                                            {(column) => (
                                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                                    {column.name}
                                                </TableColumn>
                                            )}
                                        </TableHeader>
                                        <TableBody items={selectedPlayer?.items}>
                                            {(item) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-center gap-4">
                                                            <button className="bg-rose-800  rounded-lg cursor-pointer active:opacity-50 p-2" onClick={() => removeItem(item, 'one', 'items')}>
                                                                Remover um
                                                            </button>
                                                            <button className="bg-rose-800  rounded-lg cursor-pointer active:opacity-50 p-2" onClick={() => removeItem(item, 'all', 'items')}>
                                                                Limpar
                                                            </button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className='text-center'>
                                    <ModalHeader className="flex flex-col gap-1">Utilitários</ModalHeader>
                                    <Table aria-label="Utilitários" isStriped>
                                        <TableHeader columns={columns}>
                                            {(column) => (
                                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                                    {column.name}
                                                </TableColumn>
                                            )}
                                        </TableHeader>
                                        <TableBody items={selectedPlayer?.utilitaries}>
                                            {(item) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-center gap-4">
                                                            <button className="bg-rose-800  rounded-lg cursor-pointer active:opacity-50 p-2" onClick={() => removeItem(item, 'one', 'utilitaries')}>
                                                                Remover um
                                                            </button>
                                                            <button className="bg-rose-800  rounded-lg cursor-pointer active:opacity-50 p-2" onClick={() => removeItem(item, 'all', 'utilitaries')}>
                                                                Limpar
                                                            </button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            //!Gerar inimigos
            <Modal isOpen={isEnemyModalOpen} isDismissable={true} onOpenChange={onEnemyModalOpenChange} >
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
