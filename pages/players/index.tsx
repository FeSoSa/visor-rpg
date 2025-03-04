import ArmorBar from '@/components/armorBar';
import HealthBar from '@/components/heathBar';
import api from '@/data/api';
import constants from '@/data/constants';
import DefaultLayout from '@/layouts/default';
import { IPlayer, IUser } from '@/typing.d.ts';
import { Button } from '@nextui-org/button';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Players() {
    const router = useRouter()
    const userLocal: IUser = JSON.parse(localStorage.getItem("user") || '{}');
    const [players, setPlayers] = useState<IPlayer[]>([]);

    useEffect(() => {
        if (userLocal != null) {
            getPlayers()
        }
    }, [])

    function getPlayers() {
        api.get(`player/user/${userLocal.registry}`).then((resp) => {
            if (resp.data != null) {
                console.log(resp.data)
                setPlayers(resp.data)
            }
        })
    }

    function play(player: IPlayer) {
        localStorage.setItem("player", JSON.stringify(player))
        router.push(`/player/${player.registry}`)
    }

    function logout() {
        localStorage.clear()
        Cookies.remove("token")
        router.push("/")
    }

    return (
        <DefaultLayout>
            <main className='h-full w-full flex flex-col'>
                <div className='p-2 bg-neutral-950 flex flex-row justify-between items-center'>
                    <div className='font-bold text-success'>Painel O.N.I.X</div>
                    <div className='font-bold text-lg'>Selecione um jogador</div>
                    <Button
                        className="text-sm font-normal text-default-600 bg-default-100 hover:bg-danger"
                        variant="flat" onPress={logout}
                    >Sair</Button>
                </div>
                <div className='h-full w-full grid grid-cols-3 gap-4 '>
                    {
                        players.map((player, index) => (
                            <div key={index} onClick={() => play(player)}
                                className='bg-neutral-800 h-full flex flex-col cursor-pointer border-4 border-black hover:scale-95 ease-out duration-300'>
                                <div className='text-lg text-center p-2 bg-neutral-950'>{player.codename}</div>
                                <div className='grid grid-cols-2 w-full h-full'>
                                    <div className="relative m-4">
                                        <Image
                                            src={constants.driveURL + player.photo}
                                            alt="Player"
                                            fill
                                            objectFit="contain"
                                            objectPosition='center'
                                        />
                                    </div>
                                    <div className='p-4 border-l-4 border-neutral-950 flex flex-col'>
                                        <div>Nome: <b>{player.name}</b></div>
                                        <div>Registro: <b>{player.registry}</b></div>
                                        <div>Classe: <b>{player.class}</b></div>
                                        <div className='py-4'>
                                            <HealthBar maxHealth={player.maxHp} currentHealth={player.hp} disabled />
                                            <ArmorBar maxArmor={player.armor.maxHp} currentArmor={player.armor.hp} disabled />
                                        </div>
                                        <div className='flex flex-col'>
                                            <b>Armas:</b>
                                            <div><b>{player.guns.primary.name}</b> - Calibre tipo <b>{player.guns.primary.type}</b></div>
                                            <div><b>{player.guns.secondary.name}</b> - Calibre tipo <b>{player.guns.secondary.type}</b></div>
                                        </div>
                                        <div className={`m-auto text-4xl font-bold ${player.status == "ACTIVE" ? "text-success" : "text-danger"}`}>
                                            {player.status == "ACTIVE" ? "ATIVO" : "DESATIVADO"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </main>
        </DefaultLayout>
    )
}
