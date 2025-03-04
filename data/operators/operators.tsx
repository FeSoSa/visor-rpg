import { OperatorData, PlayerClass } from "@/typing.d.ts";

export const operators: Record<PlayerClass, OperatorData> = {
  sniper: {
    maxHp: 20,
    hp: 20,
    magazines: {
      primary: [
        { bullets: 7, type: "H", capacity: 7 },
        { bullets: 7, type: "H", capacity: 7 },
        { bullets: 7, type: "H", capacity: 7 },
        { bullets: 7, type: "H", capacity: 7 },
        { bullets: 7, type: "H", capacity: 7 },
        { bullets: 7, type: "H", capacity: 7 },
      ],
      secondary:
        [
          { bullets: 7, type: "M", capacity: 7 },
          { bullets: 7, type: "M", capacity: 7 },
          { bullets: 7, type: "M", capacity: 7 },
          { bullets: 7, type: "M", capacity: 7 }
        ]
    },
    armor: {
      name: "Colete Médio",
      type: "M",
      hp: 32,
      maxHp: 32,
      slots: 6,
      pocket: 2
    },
    gunSelected: 'primary',
    guns: {
      primary:
      {
        url: "1Ky4koQTNHNW7TZ4DY-QmA9s62lJDL1V9",
        name: "Barret M82",
        capacity: 7,
        magazineSelected: 0,
        type: "H",
        mod: 0
      },
      secondary:
      {
        url: "1ri6cwcKkM9Cho_hmLGk8DSBKL_OsMWfg",
        name: "Desert Eagle",
        capacity: 7,
        magazineSelected: 0,
        type: "M",
        mod: 0
      }
    },
    utilitaries: [
      {
        url: "1f_yxE1Pefv2Lvvg0UZbqDqF8Xhod_Ypa",
        name: "Rádio tatico",
        desc: "Permite comunicação em um raio de até 50 metros.",
        quantity: 1,
        usable: false,
        type: "item",
      },
      {
        url: "1FILArysVn2OjIDP-oWs-sioxtRdG5SP_",
        name: "Binoculos",
        desc: "Permite enxergar longas distâncias.",
        quantity: 1,
        usable: false,
        type: "item",
      }
    ],
    items: [
      {
        url: "1pRzEGjHc1jsCCY83n4Zt4XfCRLUL2OSN",
        name: "Granda de fragmentação",
        desc: "Causa dano explosivo em área, afeta personagens na área de impacto.",
        quantity: 1,
        usable: true,
        type: "grenade"
      },
      {
        url: "11lvAX4Cnm2Bx4nkGeNKjajy5E3T8aGhu",
        name: "Granada flashbang",
        desc: "Causa cegueira temporária e desorientação nos inimigos próximos.",
        quantity: 1,
        usable: true,
        type: "grenade",
      }
    ]
  },
  assault: {
    maxHp: 24,
    hp: 24,
    magazines: {
      primary: [
        { bullets: 24, type: "M", capacity: 24 },
        { bullets: 24, type: "M", capacity: 24 },
        { bullets: 24, type: "M", capacity: 24 },
        { bullets: 24, type: "M", capacity: 24 },
        { bullets: 24, type: "M", capacity: 24 },
        { bullets: 24, type: "M", capacity: 24 }
      ],
      secondary: [
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 }
      ]
    },
    armor: {
      name: "Colete Médio",
      type: "M",
      hp: 32,
      maxHp: 32,
      slots: 6,
      pocket: 2
    },
    gunSelected: 'primary',
    guns: {
      primary:
      {
        url: "1EgCC_-AghiS1erTqKAOO2J4qSsT2hGZW",
        name: "M4A1",
        capacity: 24,
        magazineSelected: 0,
        type: "M",
        mod: 0
      },
      secondary:
      {
        url: "1Zb1So3ADaAk6xThujwCHwuPClTkSIaLw",
        name: "Glock",
        capacity: 10,
        magazineSelected: 0,
        type: "L",
        mod: 0
      },
    },
    utilitaries: [
      {
        url: "1f_yxE1Pefv2Lvvg0UZbqDqF8Xhod_Ypa",
        name: "Rádio tatico",
        desc: "Permite comunicação em um raio de até 50 metros.",
        quantity: 1,
        usable: false,
        type: "item",
      },
      {
        url: "12wB4WS8910MK9f5LwWJr4lXcKZ3ZBYbF",
        name: "Caixa de munição",
        desc: "Recarrega até 6 cartuchos vazios fora de combate.",
        quantity: 5,
        usable: true,
        type: "item",
      }
    ],
    items: [
      {
        url: "1pRzEGjHc1jsCCY83n4Zt4XfCRLUL2OSN",
        name: "Granda de fragmentação",
        desc: "Causa dano explosivo em área, afeta personagens na área de impacto.",
        quantity: 1,
        usable: true,
        type: "grenade"
      },
      {
        url: "11lvAX4Cnm2Bx4nkGeNKjajy5E3T8aGhu",
        name: "Granada flashbang",
        desc: "Causa cegueira temporária e desorientação nos inimigos próximos.",
        quantity: 1,
        usable: true,
        type: "grenade",
      }
    ]
  },
  medic: {
    maxHp: 16,
    hp: 16,
    magazines: {
      primary: [
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 }
      ],
      secondary: [
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 }
      ]
    },
    armor: {
      name: "Colete Pesado",
      type: "H",
      hp: 42,
      maxHp: 42,
      slots: 7,
      pocket: 2
    },
    gunSelected: 'primary',
    guns: {
      primary:
      {
        url: "1vQcx-gOnVSGFCQJVruP41gDaZnbMfywH",
        name: "MP5",
        capacity: 30,
        magazineSelected: 0,
        type: "L",
        mod: 0
      },
      secondary:
      {
        url: "1Zb1So3ADaAk6xThujwCHwuPClTkSIaLw",
        name: "Glock",
        capacity: 10,
        magazineSelected: 0,
        type: "L",
        mod: 0
      }
    },
    utilitaries: [
      {
        url: "1f_yxE1Pefv2Lvvg0UZbqDqF8Xhod_Ypa",
        name: "Rádio tatico",
        desc: "Permite comunicação em um raio de até 50 metros.",
        quantity: 1,
        usable: false,
        type: "item",
      },
      {
        url: "1CE2k7-x61oEMYs7Wl2OwMyIjtXoJnVU3",
        name: "Kit Médico",
        desc: "Recupera 20 pontos de vida.",
        quantity: 1,
        usable: true,
        type: "item",
      },
      {
        url: "1Lbgcj8CWUprNWeo6rRlB7yFEa6pY7tqK",
        name: "Injeção de adrenalina",
        desc: "Aumenta +1 na rolagem de algum aliado por 2 turnos. 1 vez por combate",
        quantity: 1,
        usable: true,
        type: "item",
      }
    ],
    items: [
      {
        url: "11lvAX4Cnm2Bx4nkGeNKjajy5E3T8aGhu",
        name: "Granada flashbang",
        desc: "Causa cegueira temporária e desorientação nos inimigos próximos.",
        quantity: 1,
        usable: true,
        type: "grenade",
      },
      {
        url: "1cVDwZFEJuza3NHCB_LsQXR_GpOQ-upUl",
        name: "Granada de fumaça",
        desc: "Cria uma nuvem de fumaça que obscurece a visão, útil para coberturas rápidas.",
        quantity: 1,
        usable: true,
        type: "grenade",
      }
    ]
  },
  engeneer: {
    maxHp: 20,
    hp: 20,
    magazines: {
      primary: [
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 },
        { bullets: 30, type: "L", capacity: 30 }
      ],
      secondary: [
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 }
      ]
    },
    armor: {
      name: "Colete Médio",
      type: "M",
      hp: 32,
      maxHp: 32,
      slots: 6,
      pocket: 2
    },
    gunSelected: 'primary',
    guns: {
      primary:
      {
        url: "1I8Mw1K6pLLtSnFqRRfVBRsdFtjzFrlNR",
        name: "KRISS Vector",
        capacity: 25,
        magazineSelected: 0,
        type: "L",
        mod: 1
      },
      secondary:
      {
        url: "1Zb1So3ADaAk6xThujwCHwuPClTkSIaLw",
        name: "Glock",
        capacity: 10,
        magazineSelected: 0,
        type: "L",
        mod: 0
      }
    },
    utilitaries: [
      {
        url: "1f_yxE1Pefv2Lvvg0UZbqDqF8Xhod_Ypa",
        name: "Rádio tatico",
        desc: "Permite comunicação em um raio de até 50 metros.",
        quantity: 1,
        usable: false,
        type: "item",
      },
      {
        url: "1tc9j7OKeIkZA6SQvaasFgK6jjo4Yu_Fn",
        name: "Placa balística",
        desc: "Repara o colete até o nível médio, se possível.",
        quantity: 2,
        usable: true,
        type: "item",
      },
      {
        url: "1iVGNNvQPSijxlEs3fIWgEK38zq_jI70_",
        name: "Lança granada",
        desc: "Dispara granadas de maneira mais eficaz.",
        quantity: 2,
        usable: true,
        type: "item",
      }
    ],
    items: [
      {
        url: "1pRzEGjHc1jsCCY83n4Zt4XfCRLUL2OSN",
        name: "Granda de fragmentação",
        desc: "Causa dano explosivo em área, afeta personagens na área de impacto.",
        quantity: 1,
        usable: true,
        type: "grenade"
      },
      {
        url: "1cVDwZFEJuza3NHCB_LsQXR_GpOQ-upUl",
        name: "Granada de fumaça",
        desc: "Cria uma nuvem de fumaça que obscurece a visão, útil para coberturas rápidas.",
        quantity: 1,
        usable: true,
        type: "grenade",
      }
    ]
  },
  inteligence: {
    maxHp: 22,
    hp: 22,
    magazines: {
      primary: [
        { bullets: 8, type: "I", capacity: 8 },
        { bullets: 32, type: "I", capacity: 32 }
      ],
      secondary: [
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 },
        { bullets: 7, type: "L", capacity: 7 }
      ]
    },
    armor: {
      name: "Colete Leve",
      type: "L",
      hp: 18,
      maxHp: 18,
      slots: 5,
      pocket: 1
    },
    gunSelected: 'primary',
    guns: {
      primary:
      {
        url: "1u0ct9d0ko2LlW5Ih07xST_6n2PJ_JLvR",
        name: "12 Gauge",
        capacity: 8,
        magazineSelected: 0,
        type: "I",
        mod: 0
      },
      secondary:
      {
        url: "17iozdwNXNX6qhqBdsJfvU5ktEgWUBNEN",
        name: "USP-S",
        capacity: 10,
        magazineSelected: 0,
        type: "L",
        mod: 2
      }
    },
    utilitaries: [
      {
        url: "1f_yxE1Pefv2Lvvg0UZbqDqF8Xhod_Ypa",
        name: "Rádio tatico",
        desc: "Permite comunicação em um raio de até 50 metros.",
        quantity: 1,
        usable: false,
        type: "item",
      },
      {
        url: "1ybfJ2pTZKRDpY97lQzBP9Q6stskr6gZM",
        name: "Granada sonora",
        desc: "Causa distrações sonoras no ambiente",
        quantity: 3,
        usable: true,
        type: "item",
      },
      {
        url: "1Ut1kUFLkImNr6EHoZeL8Wso2MJuYYIbP",
        name: "Drone",
        desc: "Veículo aéreo controlado remotamente para vigilância e ataque.",
        quantity: 1,
        usable: true,
        type: "item",
        rechargeable: true,
        reloading: false
      },
      {
        url: "1ObOyBd6HpPhzYJmL1KrJQvpN27E325JI",
        name: "Laptop de Hacking",
        desc: "Equipamento usado para realizar ataques cibernéticos ou acessar sistemas seguros.",
        quantity: 1,
        usable: true,
        type: "item",
        rechargeable: true,
        reloading: false
      },
    ],
    items: [
      {
        url: "11lvAX4Cnm2Bx4nkGeNKjajy5E3T8aGhu",
        name: "Granada flashbang",
        desc: "Causa cegueira temporária e desorientação nos inimigos próximos.",
        quantity: 1,
        usable: true,
        type: "grenade",
      }
    ]
  },
};