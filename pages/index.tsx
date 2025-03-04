/* eslint-disable prettier/prettier */
import api from '@/data/api';
import DefaultLayout from '@/layouts/default';
import { Button } from '@nextui-org/button';
import { InputOtp } from "@nextui-org/input-otp";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChevronUp } from "react-icons/fa";

export default function IndexPage() {
  const router = useRouter()
  const [network, setNetwork] = useState(true)
  const [regitry, setRegistry] = useState("")

  const signIn = async () => {
    if (!regitry.trim()) {
      console.error("O campo de registro está vazio!");
      return;
    }
    try {
      const resp = await api.post("/signIn", { registry: `ONX-${regitry}` });
      if (resp?.data) {
        localStorage.setItem("user", JSON.stringify(resp.data));
        Cookies.set("token", resp.data.token, { expires: 1 });
        console.log("Usuário logado com sucesso!");
        resp.data.role == "admin"
          ? router.push(`/admin`)
          : router.push(`/players`);
      }
    } catch (error) {
      setNetwork(false)
    }
  };


  return (
    <DefaultLayout>
      <div className="h-full flex justify-center items-center flex-col">

        {
          network
            ? <>
              <div className='text-center'>
                <div className='fw-bold title' style={{ fontSize: '80px' }} >Bem vindo</div>
                <div className='fw-medium title' style={{ fontSize: '30px' }}>Painél tático da O.N.I.X</div>
              </div>


              <div className='p-5'>
                <fieldset className="input-group input-group-lg mb-5">
                  <InputOtp length={3} size={'lg'} onValueChange={setRegistry} />
                </fieldset>
              </div>

              <Button isIconOnly aria-label="Like" onClick={signIn} className='h-24 w-24 p-5 bg-[#2E2E2E]' radius='lg'>
                <FaChevronUp color='#FFF' size={100} />
              </Button>
            </>
            :
            <div className='fw-bold title' style={{ fontSize: '80px' }} >Fora de alcance</div>
        }


      </div>
    </DefaultLayout>
  );
}
