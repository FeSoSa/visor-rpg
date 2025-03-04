import { Slider } from '@nextui-org/react';
import { useState } from 'react';
const ArmorBar = ({ currentArmor, maxArmor, onChange, disabled = false }: { currentArmor: number; maxArmor: number; onChange?: (newHealth: number | number[]) => void; disabled?: boolean }) => {
    const [tempArmor, setTempArmor] = useState<number | number[]>(currentArmor);
    const healthPercentage = (currentArmor / maxArmor) * 100;

    return (
        <div>
            {!disabled
                ?
                <Slider
                    aria-label="HPBar"
                    color="primary"
                    size="lg"
                    maxValue={maxArmor}
                    minValue={0}
                    onChangeEnd={(value) => onChange && onChange(value)}
                    onChange={setTempArmor}
                    defaultValue={currentArmor}
                    endContent={`${tempArmor}/${maxArmor}`}
                ></Slider>
                :
                <div className="w-full max-w-sm">
                    {/* Barra de vida */}
                    <div className="w-full h-6 bg-gray-800 rounded-lg overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${healthPercentage}%` }} // Ajusta a largura
                        />
                    </div>

                    {/* Informações */}
                    <div className="text-center text-sm text-white">
                        {currentArmor}/{maxArmor} AP
                    </div>
                </div>
            }


        </div>
    );
};

export default ArmorBar;
