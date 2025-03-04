import constants from "@/data/constants";
import { IGame } from "@/typing.d.ts";
import Image from 'next/image';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function Second({ game }: { game: IGame }) {
    return (
        <section className="h-full w-full border-4 border-neutral-800 relative">
            <TransformWrapper>
                <TransformComponent>
                    <Image
                        src={constants.driveURL + game?.completeMap}
                        alt="Segunda tela"
                        layout="fill"
                        objectFit="contain"
                    />
                </TransformComponent>
            </TransformWrapper>
        </section>
    )
}
