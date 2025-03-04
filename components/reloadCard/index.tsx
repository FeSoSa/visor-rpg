import api from '@/data/api';
import { IPlayer } from '@/typing.d.ts';
import { Button } from '@nextui-org/button';
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import '@sweetalert2/theme-dark/dark.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function ReloadCard({ player, type }: { player: IPlayer, type: 'primary' | 'secondary' }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [bulletCount, setBulletCount] = useState('');
    const weapon = player.guns[type]

    const savePlayer = () => api.post('player/save', player);

    const reloadAll = () => {
        Swal.fire({
            title: `${player.guns[type].name}`,
            text: `Recarregar todos cartuchos?`,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
            confirmButtonColor: '#365314',
        }).then((result) => {
            if (result.isConfirmed) {
                player.magazines[type].forEach((magazine) => {
                    magazine.bullets = magazine.capacity;
                });
                savePlayer();
            }
        });
    };

    const fullReload = () => {
        Swal.fire({
            title: `${player.guns[type].name}`,
            text: `Recarregar completamente o cartucho atual?`,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
            confirmButtonColor: '#365314',
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedMagazine = player.magazines[type][player.guns[type].magazineSelected];
                if (weapon.type == "I") {
                    console.log(player.guns[type].magazineSelected == 0)
                    if (player.guns[type].magazineSelected == 0) {
                        const ammoBag = player.magazines[type][1];
                        const bulletsNeeded = selectedMagazine.capacity - selectedMagazine.bullets;
                        const bulletsToTransfer = Math.min(bulletsNeeded, ammoBag.bullets);

                        selectedMagazine.bullets += bulletsToTransfer;
                        ammoBag.bullets -= bulletsToTransfer;
                    } else {
                        selectedMagazine.bullets = selectedMagazine.capacity;
                    }
                } else {
                    selectedMagazine.bullets = selectedMagazine.capacity;
                }
                savePlayer();
            }
        });
    };

    const partialReload = () => {
        onClose();
        const bulletCountNumber = Number(bulletCount);

        if (isNaN(bulletCountNumber) || bulletCountNumber <= 0) {
            Swal.fire('Erro', 'Por favor, insira um número válido de balas!', 'error');
            return;
        }

        const selectedMagazine = player.magazines[type][player.guns[type].magazineSelected];
        const magazineCapacity = selectedMagazine.capacity;
        const magazineBullets = selectedMagazine.bullets;

        if (bulletCountNumber + magazineBullets > magazineCapacity) {
            fullReload();
        } else {
            if (weapon.type == "I") {
                if (player.guns[type].magazineSelected == 0) {
                    const ammoBag = player.magazines[type][1];
                    const bulletsToTransfer = Math.min(bulletCountNumber, ammoBag.bullets);
                    selectedMagazine.bullets += bulletsToTransfer;
                    ammoBag.bullets -= bulletsToTransfer;
                } else {
                    selectedMagazine.bullets = selectedMagazine.capacity;
                }
            } else {
                selectedMagazine.bullets += bulletCountNumber;
            }
        }
        savePlayer();
        setBulletCount('');
    };

    return (
        <>
            <div className='text-center p-2'>
                Munições | {player.guns[type].name}
            </div>
            <Button className='bg-lime-900 py-4 w-full' radius='none' onPress={reloadAll}>Recarregar todos cartuchos</Button>
            <div className='flex flex-col'>
                <Button className='bg-neutral-950 py-2 w-full' radius='none' onPress={fullReload}>Recarregamento completo</Button>
                <Button className='bg-neutral-950 py-2 w-full' radius='none' onPress={onOpen}>Recarregamento parcial</Button>
            </div>

            <Modal isOpen={isOpen} isDismissable={true} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Recarregamento parcial | {player.guns[type].name}</ModalHeader>
                            <p className='text-center'>{player.magazines[type][player.guns[type].magazineSelected].bullets} / {player.magazines[type][player.guns[type].magazineSelected].capacity}</p>
                            <ModalBody>
                                <Input
                                    type='number'
                                    placeholder="Recarregar quantas balas?"
                                    variant="bordered"
                                    min={1}
                                    value={bulletCount}
                                    onChange={(e) => setBulletCount(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" className='w-full' onPress={partialReload}  >
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
