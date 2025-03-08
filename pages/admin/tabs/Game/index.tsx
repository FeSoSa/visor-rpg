import api from '@/data/api';
import constants from '@/data/constants';
import { IGame } from '@/typing.d.ts';
import { Button, cn, Divider, Form, Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import './styles.scss';

export default function GameTab() {

    const [form, setForm] = useState<{ name: string, id: string } | null>()
    const [game, setGame] = useState<IGame | undefined>();

    useEffect(() => {
        getGame()
    }, [])

    function getGame() {
        api.get("/game").then((resp) => {
            if (resp.data != null) {
                setGame(resp.data)
            }
        })
    }

    function handleDelete(item: string) {
        console.log(item)
        setGame((prev: any) => {
            const updatedGame = {
                ...prev,
                dbImages: prev.dbImages.filter((it: any) => it.props != item)
            };

            api.post("/game/save", updatedGame).then((resp) => { });
            return updatedGame;
        });
    }


    async function addImage(e: any) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        if (data.name && data.id) {
            setGame((prev: any) => {
                const updatedGame = {
                    ...prev,
                    dbImages: [...(prev?.dbImages ?? []), { name: data.name, props: data.id }]
                };
                // Envia a atualização diretamente, sem depender de `game` após o set
                api.post("/game/save", updatedGame).then((resp) => {
                    if (resp.data != null) {
                        console.log(resp.data);
                        getGame();
                        setForm({ name: '', id: '' });
                    }
                });
                return updatedGame;  // Retorna o estado atualizado
            });
        }
    }

    return (
        <main className="grid grid-cols-2 h-full">
            <div className='h-full flex flex-col items-center p-8 gap-8'>
                <Switch
                    isSelected={game?.combat}
                    onValueChange={(e) => setGame((prev: any) => {
                        const updatedGame = { ...prev, combat: Boolean(e) }
                        api.post("/game/save", updatedGame).then((resp) => { });
                        return updatedGame
                    })}
                    classNames={{
                        base: cn(
                            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                            "data-[selected=true]:bg-danger",
                        ),
                        wrapper: "p-0 h-4 overflow-visible",
                        thumb: cn(
                            "w-6 h-6 border-2 shadow-lg",
                            "group-data-[hover=true]:border-primary",
                            //selected
                            "group-data-[selected=true]:ms-6",
                            // pressed
                            "group-data-[pressed=true]:w-7",
                            "group-data-[selected]:group-data-[pressed]:ms-4",
                        ),
                    }}
                >
                    <div className="flex flex-col gap-1">
                        <p className="text-medium">Em Combate</p>
                    </div>
                </Switch>

                <Switch
                    isSelected={game?.showCompleteMap}
                    onValueChange={(e) => setGame((prev: any) => {
                        const updatedGame = { ...prev, showCompleteMap: Boolean(e) }
                        api.post("/game/save", updatedGame).then((resp) => { });
                        return updatedGame
                    })}
                    classNames={{
                        base: cn(
                            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                            "data-[selected=true]:bg-success",
                        ),
                        wrapper: "p-0 h-4 overflow-visible",
                        thumb: cn(
                            "w-6 h-6 border-2 shadow-lg",
                            "group-data-[hover=true]:border-primary",
                            //selected
                            "group-data-[selected=true]:ms-6",
                            // pressed
                            "group-data-[pressed=true]:w-7",
                            "group-data-[selected]:group-data-[pressed]:ms-4",
                        ),
                    }}
                >
                    <div className="flex flex-col gap-1">
                        <p className="text-medium">Mapa Completo</p>
                    </div>
                </Switch>

                {game != null &&
                    <>
                        <Select
                            items={game?.dbImages}
                            className='max-w-md'
                            size='lg'
                            label="Mapa completo"
                            placeholder="Selecione"
                            name='completeMap'
                            onChange={(e) =>
                                setGame((prev: any) => {
                                    const updatedGame = {
                                        ...prev,
                                        completeMap: e.target.value
                                    };
                                    api.post("/game/save", updatedGame).then((resp) => { });
                                    return updatedGame;
                                })
                            }
                            selectedKeys={[game?.completeMap]}
                        >
                            {(image) => <SelectItem key={image?.props}>{image?.name}</SelectItem>}
                        </Select>

                        <Select
                            items={game?.dbImages}
                            className='max-w-md'
                            size='lg'
                            label="Mapa Danificado"
                            placeholder="Selecione"
                            name='ruinedMap'
                            onChange={(e) =>
                                setGame((prev: any) => {
                                    const updatedGame = {
                                        ...prev,
                                        ruinedMap: e.target.value
                                    };
                                    api.post("/game/save", updatedGame).then((resp) => { });
                                    return updatedGame;
                                })
                            }
                            selectedKeys={[game?.ruinedMap]}
                        >
                            {(image) => <SelectItem key={image?.props}>{image?.name}</SelectItem>}
                        </Select>

                        <Select
                            items={game?.dbImages}
                            className='max-w-md'
                            size='lg'
                            label="Outros"
                            placeholder="Selecione"
                            name='others'
                            selectionMode="multiple"
                            onSelectionChange={(e: any) => {
                                setGame((prev: any) => {
                                    const selectedImages = game?.dbImages.filter((it) => e.has(it.props)); // Usando o método 'has' de Set
                                    const updatedGame = {
                                        ...prev,
                                        others: selectedImages
                                    };
                                    api.post("/game/save", updatedGame).then((resp) => { });
                                    return updatedGame; // Retorna o estado atualizado
                                });
                            }}
                            selectedKeys={game?.others?.map(item => item.props)}
                        >
                            {(image) => <SelectItem key={image?.props}>{image?.name}</SelectItem>}
                        </Select>
                    </>
                }

                <Divider />

                <Form validationBehavior="native" onSubmit={addImage} className="flex flex-col gap-2">
                    <div className='flex flex-row gap-4'>
                        <Input label="Nome" name='name' value={form?.name} onChange={(e) => setForm((prev: any) => ({ ...prev, name: e.target.value }))} />
                        <Input label="ID" name='id' value={form?.id} onChange={(e) => setForm((prev: any) => ({ ...prev, id: e.target.value }))} />
                    </div>
                    <Button color="primary" className='w-full' type='submit'>Adicionar</Button>
                </Form>
            </div>

            {game != null &&
                <div className='h-full grid grid-rows-3'>

                    <Table className=' px-8'>
                        <TableHeader>
                            <TableColumn>Nome</TableColumn>
                            <TableColumn>ID</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody >
                            {game?.dbImages
                                ? game.dbImages.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.props}</TableCell>
                                        <TableCell>
                                            <Button isIconOnly className='bg-transparent' radius='lg' onPress={() => handleDelete(item.props)}>
                                                <FaTimesCircle color='#FFF' size={25} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : []}
                        </TableBody>
                    </Table>

                    <div className="h-full row-span-2 w-full relative p-8">
                        <TransformWrapper>
                            <TransformComponent>
                                <Image
                                    src={constants.driveURL + game.completeMap}
                                    alt="Imagem de fundo"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                </div>
            }
        </main>
    )
}