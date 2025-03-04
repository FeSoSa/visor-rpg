import { Button } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function ConfigTab() {
    const router = useRouter()

    function home() {
        router.push("/players")
    }

    function logout() {
        localStorage.clear()
        Cookies.remove("token")
        router.push("/")
    }

    return (
        <div className='h-full gap-4 flex items-center justify-center flex-col'>

            <Button className="w-100 px-[15px]" color="default" onPress={home}>
                Menu
            </Button>

            <Button className="w-100 px-[15px]" color="danger" onPress={logout}>
                Sair
            </Button>
        </div>
    )
}
