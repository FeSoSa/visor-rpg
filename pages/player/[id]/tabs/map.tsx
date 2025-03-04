import constants from "@/data/constants";
import { IGame } from "@/typing.d.ts";
import Image from 'next/image';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function Map({ game }: { game: IGame }) {
    return (
        <section className="h-full w-full border-4 border-neutral-800 relative">
            <TransformWrapper>
                <TransformComponent>
                    <Image
                        src={game?.showCompleteMap ? constants.driveURL + game.completeMap : constants.driveURL + game?.ruinedMap}
                        alt="Mapa"
                        layout="fill"
                        objectFit="contain"
                    />
                </TransformComponent>
            </TransformWrapper>
        </section>
    )
}
