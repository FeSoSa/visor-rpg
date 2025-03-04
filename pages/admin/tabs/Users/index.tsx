import api from '@/data/api';

import { operators } from '@/data/operators/operators';
import { IPlayer, IUser, PlayerClass } from '@/typing.d.ts';
import { Form } from "@nextui-org/form";
import { Button, Card, CardBody, Divider, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUser | null>();
    const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>();
    const [loadClass, setLoadClass] = useState(false);
    const [operatorList, setOperatorList] = useState<IPlayer[]>([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        getUsers()
    }, [])

    function getUsers() {
        api.get("user").then((resp) => {
            if (resp.data != null) {
                setUsers(resp.data)
            }
        })
    }
    function getPlayers(user: IUser) {
        api.get(`/player/user/${user?.registry}`).then((resp) => {
            if (resp.data != null) {
                setOperatorList(resp.data)
            }
        }).catch((err) => { })
    }

    function save() {
        if (selectedUser == null) {
            api.post("/user/register", {}).then((resp) => {
                if (resp.data != null) {
                    getUsers()
                    setSelectedPlayer(resp.data)
                }
            })
        } else if (selectedUser != null) {

        }
    }

    const setPlayerClassData = (className: string) => {
        const playerClass = className as PlayerClass;
        if (playerClass && operators[playerClass]) {
            return {
                ...selectedPlayer,
                maxHp: operators[playerClass].maxHp,
                hp: operators[playerClass].hp,
                magazines: operators[playerClass].magazines,
                armor: operators[playerClass].armor,
                guns: operators[playerClass].guns,
                utilitaries: operators[playerClass].utilitaries,
                items: operators[playerClass].items,
            };
        }
        return selectedPlayer;
    };

    function handleSelectUser(user: IUser) {
        setSelectedPlayer(null)

        setSelectedUser(user)
        getPlayers(user)
    }
    function handleSelectPlayer(registry: string | null) {
        if (registry != null && operatorList) {
            setSelectedPlayer(operatorList.find(o => o.registry == registry) ?? null)
        }
    }
    const unload = () => {
        setSelectedPlayer(null)
        setSelectedUser(null)
        setOperatorList([])
        setLoadClass(false)
    }

    const onSubmitPlayer = async (e: any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        if (loadClass) {
            const updatedPlayer = await setPlayerClassData(data.class.toString());
            await setSelectedPlayer(updatedPlayer as IPlayer);
        }
        setSelectedPlayer((prevPlayer: any) => {
            if (!prevPlayer || !selectedUser) {
                return null;
            }
            return {
                ...prevPlayer,
                userRegistry: selectedUser.registry,
                name: data.name,
                registry: data.registry,
                codename: data.codename,
                photo: data.photo,
                status: data.status,
                class: data.class
            };
        });
        console.log(data)
        console.log(selectedPlayer)
        api.post("/player/save", selectedPlayer).then((resp) => {
            console.log(resp)
            if (resp.data != null && selectedUser) {
                setLoadClass(false)
                getPlayers(selectedUser)
            }
        })
    };

    const onSubmitUser = (e: any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        api.post("/user/register", { name: data.name, registry: data.registry }).then((resp) => {
            if (resp.data != null) {
                getUsers()
            }
        })
    };

    return (
        <main className="grid grid-cols-5 h-full">
            <div className="bg-[#2E2E2E] border-r-8 border-r-[#1C1C1C] flex flex-col justify-between h-full">
                <ul className="list-unstyled flex-1 overflow-y-auto">
                    <div className="w-100 p-3 hover:bg-green-600 border-b-2 border-b-[#1C1C1C] cursor-pointer text-center" onClick={unload}>
                        Novo Usuário
                    </div>
                    {users.map((user, index) => (
                        <li
                            key={index}
                            className="w-100 decoration-none p-3 border-b-2 border-b-black hover:bg-black cursor-pointer"
                            onClick={() => handleSelectUser(user)}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>


            {
                selectedUser
                    ?
                    <div className='w-100 h-100 d-flex flex-column col-span-4' >
                        <header className="flex flex-col py-2 bg-[#2E2E2E] justify-center items-center border-b-8 border-b-[#1C1C1C]">
                            <div className='text-xl  font-bold'>{selectedUser?.name}</div>
                            <div className='text-base'>{selectedUser?.registry}</div>
                        </header>

                        <Form validationBehavior="native" onSubmit={onSubmitPlayer} className='h-100 p-4 flex items-center'>

                            <Select
                                items={operatorList}
                                className="max-w-xs"
                                placeholder="Selecione um operador"
                                name='operator'
                                selectedKeys={[selectedPlayer?.registry ?? ""]}
                                onChange={(e) => handleSelectPlayer(e.target.value)}
                            >
                                {(operator) => <SelectItem key={operator.registry} value={operator.registry}>{operator.codename}</SelectItem>}
                            </Select>

                            <Divider className="my-4" />

                            <Card>
                                <CardBody>
                                    <p>{selectedPlayer?.codename}</p>
                                </CardBody>
                            </Card>

                            <Input className="max-w-md mb-2"
                                label="Nome"
                                labelPlacement="outside"
                                placeholder="Insira o nome"
                                name='name'
                                value={selectedPlayer?.name}
                            />

                            <Input className="max-w-md mb-2"
                                label="Codinome"
                                labelPlacement="outside"
                                placeholder="Insira o codinome"
                                name='codename'
                                value={selectedPlayer?.codename}
                            />

                            <Input className="max-w-md mb-2"
                                label="Registro"
                                labelPlacement="outside"
                                placeholder="Insira o registro"
                                name='registry'
                                value={selectedPlayer?.registry}
                            />

                            <Input className="max-w-md mb-2"
                                label="Foto"
                                labelPlacement="outside"
                                placeholder="Insira a foto"
                                name='photo'
                                value={selectedPlayer?.photo}
                            />

                            <Select
                                className="max-w-md mb-2"
                                labelPlacement="outside"
                                label="Status"
                                placeholder="Selecione um status"
                                name="status"
                                selectedKeys={[selectedPlayer?.status ?? ""]}
                                onChange={(e) => setSelectedPlayer({ ...selectedPlayer!, status: e.target.value })}>
                                <SelectItem key="ACTIVE">Ativo</SelectItem>
                                <SelectItem key="WAITING">Aguardando</SelectItem>
                            </Select>


                            <Select
                                value={selectedPlayer?.class}
                                className="max-w-md mb-2"
                                labelPlacement="outside"
                                label="Classe"
                                name='class'
                                placeholder="Selecione uma classe"
                                selectedKeys={[selectedPlayer?.class ?? ""]}
                                onChange={(e) => setSelectedPlayer({ ...selectedPlayer!, class: e.target.value as PlayerClass })}>
                                <SelectItem key="sniper">Sniper</SelectItem>
                                <SelectItem key="assault">Assalto</SelectItem>
                                <SelectItem key="engeneer">Engenheiro</SelectItem>
                                <SelectItem key="medic">Médico</SelectItem>
                                <SelectItem key="inteligence">Inteligência</SelectItem>
                            </Select>

                            <Button className="max-w-md px-[15px]" color="success" type="button" onPress={() => setLoadClass(true)}>
                                Carregar classe
                            </Button>

                            <div className="flex gap-4">
                                <Button className="w-full px-[15px]" color="success" type="submit">
                                    Salvar
                                </Button>
                                <Button type="reset" variant="bordered">
                                    Resetar
                                </Button>
                            </div>

                        </Form>

                    </div>
                    :
                    <div className='w-100 h-100 d-flex flex-column col-span-4' >
                        <Form validationBehavior="native" onSubmit={onSubmitUser} className='h-full p-4 flex items-center justify-center'>

                            <Input className="max-w-md mb-2"
                                label="Nome"
                                labelPlacement="outside"
                                placeholder="Insira o nome"
                                name='name'
                            />

                            <Input className="max-w-md mb-2"
                                label="Registro"
                                labelPlacement="outside"
                                placeholder="Insira o registro"
                                name='registry'
                            />

                            <div className="flex gap-4">
                                <Button className="w-full px-[15px]" color="success" type="submit">
                                    Registrar
                                </Button>
                                <Button type="reset" variant="bordered">
                                    Resetar
                                </Button>
                            </div>

                        </Form>

                    </div>
            }

        </main>
    )
}