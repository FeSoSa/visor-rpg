import DefaultLayout from '@/layouts/default';

export default function PlayerPanel() {
    /*  const [menu, setMenu] = useState('map')
      const [player, setPlayer] = useState<IPlayer | null>(null);
      const [game, setGame] = useState<IGame | undefined>();
      const router = useRouter();
  
      const tabContent: Record<string, ReactNode> = {
          second: <Second game={game!} />,
          map: <Map game={game!} />,
          player: <Player game={game!} player={player!}></Player>,
          rules: <RulesTab />, // Substitua pelo conteúdo de "Enemies"
          settings: <ConfigTab />, // Substitua pelo conteúdo de "Items"
      };
  
      useEffect(() => {
          if (router.query.id) {
              getGame()
              getPlayer(router.query.id as string);
          }
      }, [router.query.id]);
  
      function getPlayer(id: string) {
          api.get(`player/${id}`).then((resp) => {
              if (resp.data != null) {
                  setPlayer(resp.data[0]);
              }
          }).catch((error) => {
              console.error("Erro ao buscar jogador:", error);
          });
      }
  
      function getGame() {
          api.get("/game").then((resp) => {
              if (resp.data != null) {
                  setGame(resp.data)
              }
          })
      }
  
  
      const { socket } = useWebSocket();
      useEffect(() => {
          if (socket) {
              socket.onmessage = (event) => {
                  console.log(event)
                  let message;
                  try {
                      message = JSON.parse(event.data);
                      console.log("WebSocket recebido")
                      if (message.event == "game-updated") {
                          setGame(message.data);
                      } else if (message.event == "player-updated" && message.registry == player?.registry) {
                          setPlayer(message.data);
                      }
                  } catch (e) {
                      console.log("Mensagem recebida (não JSON):", event.data);
                  }
              };
          }
      }, [socket]);
  */
    return (
        <DefaultLayout>
            <div>desativado</div>
            {/*
                player?.registry ?
                    <main className="flex flex-row w-full h-full bg-neutral-900 border-box" >

                        <section className="flex w-[10vw] h-full flex-col bg-red">
                            <div onClick={() => menu != "map" ? setMenu('map') : game?.view && game.view != "" && setMenu("second")}
                                className='w-full h-full flex justify-center items-center text-7xl cursor-pointer border-8 border-amber-800 bg-amber-600 hover:bg-amber-700'>
                                <FaMapMarkedAlt />
                            </div>
                            <div onClick={() => setMenu('player')}
                                className='w-full h-full flex justify-center items-center text-7xl cursor-pointer border-8 border-lime-800 bg-lime-600 hover:bg-lime-700'>
                                <FaUser />
                            </div>
                            <div onClick={() => setMenu('rules')}
                                className='w-full h-full flex justify-center items-center text-7xl cursor-pointer border-8 border-cyan-800 bg-cyan-600 hover:bg-cyan-700'>
                                <FaFileAlt />
                            </div>
                            <div onClick={() => setMenu('settings')}
                                className='w-full h-full flex justify-center items-center text-7xl cursor-pointer border-8 border-neutral-800 bg-neutral-600 hover:bg-neutral-700'>
                                <AiFillSetting />
                            </div>
                        </section>

                        {game != null &&
                            <main className="w-full h-full" >{tabContent[menu]}</main>
                        }
                    </main>
                    : <div>Carregando</div>
                    */
            }
        </DefaultLayout>
    )
}
