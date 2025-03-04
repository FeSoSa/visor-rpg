import { Slider } from "@nextui-org/react";
import { useState } from "react";

const HealthBar = ({ currentHealth, maxHealth, onChange, disabled = false }: {
    currentHealth: number;
    maxHealth: number;
    onChange?: (newHealth: number | number[]) => void;
    disabled?: boolean
}) => {
    const [tempHealth, setTempHealth] = useState<number | number[]>(currentHealth);

    return (
        <div>
            {!disabled
                ?
                <Slider
                    aria-label="HPBar"
                    color="success"
                    size="lg"
                    maxValue={maxHealth}
                    minValue={0}
                    onChange={setTempHealth}
                    onChangeEnd={(value) => onChange && onChange(value)}
                    defaultValue={currentHealth}
                    endContent={`${tempHealth}/${maxHealth}`}
                    isDisabled={disabled}
                ></Slider>
                :
                <div className="w-full max-w-sm">
                    {/* Barra de vida */}
                    <div className="w-full h-6 bg-gray-800 rounded-lg overflow-hidden">
                        <div
                            className="h-full bg-red-500 transition-all duration-300"
                            style={{ width: `${(currentHealth / maxHealth) * 100}%` }} // Ajusta a largura
                        />
                    </div>

                    {/* Informações */}
                    <div className="text-center text-sm text-white">
                        {currentHealth}/{maxHealth} HP
                    </div>
                </div>
            }
        </div>
    );
};

export default HealthBar;
