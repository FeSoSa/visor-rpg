import constants from '@/data/constants';
import { IPlayer } from '@/typing.d.ts';
import { Slider } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';

export interface I {
    player: IPlayer
    onChange?: (newHealth: number | number[]) => void;
}

export default function CompanionCard({ player, onChange }: I) {
    const [tempHealth, setTempHealth] = useState<number | number[]>(player.companion.hp);

    return (
        <>
            <div className="flex flex-row">
                <Image
                    src={`${constants.driveURL}${player.companion.url}`}
                    alt={`Companion - ${player.companion.name}`}
                    width={125}
                    height={75}
                    style={{
                        objectFit: "contain",
                    }}
                    className={`p-2 hover:bg-[${player.companion.usable ? '#15803d' : '#8B0000'}] cursor-pointer `}
                    onClick={() => { }}
                />
                <div className="flex flex-col justify-center w-full mx-2">
                    <Slider
                        aria-label="HPBar"
                        color="success"
                        size="lg"
                        maxValue={player.companion.maxHp}
                        minValue={0}
                        onChange={setTempHealth}
                        onChangeEnd={(value) => onChange && onChange(value)}
                        defaultValue={player.companion.hp}
                        endContent={`${tempHealth}/${player.companion.maxHp}`}
                    ></Slider>
                </div>
            </div>
        </>
    );
}
