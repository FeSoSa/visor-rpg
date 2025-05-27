import api from '@/data/api';
import constants from '@/data/constants';
import { IGame } from '@/typing.d.ts';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

export default function MapTab() {
    const [game, setGame] = useState<IGame | undefined>();

    useEffect(() => {
        getGame();
    }, []);

    function getGame() {
        api.get("/game").then((resp) => {
            if (resp.data != null) {
                setGame(resp.data);
            }
        });
    }

    return (
        <main className={`grid grid-rows-2 h-full gap-4 ${(game?.others.length ?? 0) + 1 > 4 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {game && (
                <>
                    <div className="w-full h-full relative">
                        <Image
                            src={constants.driveURL + game.completeMap}
                            alt="Mapa desfocado"
                            fill
                            style={{ objectFit: 'cover', zIndex: 0 }}
                            className="blur-sm"
                        />
                        <div className="absolute inset-0 z-10">
                            <TransformWrapper>
                                <TransformComponent>
                                    <Image
                                        src={constants.driveURL + game.completeMap}
                                        alt="Mapa interativo"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </TransformComponent>
                            </TransformWrapper>
                        </div>
                    </div>


                    {game.others?.map((it, index) => (
                        <div className="w-full h-full relative">
                            <Image
                                src={constants.driveURL + it.props}
                                alt="Mapa desfocado"
                                fill
                                style={{ objectFit: 'cover', zIndex: 0 }}
                                className="blur-sm"
                            />
                            <div className="absolute inset-0 z-10">
                                <TransformWrapper>
                                    <TransformComponent>
                                        <Image
                                            src={constants.driveURL + it.props}
                                            alt={it.name}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </TransformComponent>
                                </TransformWrapper>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </main>
    );
}