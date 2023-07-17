import React, { useEffect, useState } from 'react'
import TableSumarize from '@/components/TableSumarize'
import AddItemDialog from '@/components/AddItemDialog'
import {
  getMenu,
  getOrders,
  passioMembers,
  addItem,
  updatePaidStatus,
} from "./utils/api";

function App2() {
  const [members, setMembers] = useState(null);
  const [menu, setMenu] = useState([]);
  const [grOrder, setGrOrder] = useState({});
  const [orderInArr, setOrderInArr] = useState([]);

  const fetchData = async () => {
    // const [members, menu] = await Promise.all([passioMembers(), getMenu()]);
    const members = [
      {
          "name": "An"
      },
      {
          "name": "Bảo"
      },
      {
          "name": "Hải"
      },
      {
          "name": "Hồng"
      },
      {
          "name": "Huyrun"
      },
      {
          "name": "Khải"
      },
      {
          "name": "Luân"
      },
      {
          "name": "Nghĩa Tr"
      },
      {
          "name": "Nhựt"
      },
      {
          "name": "Quân Huỳnh"
      },
      {
          "name": "Quang"
      },
      {
          "name": "Sơn"
      },
      {
          "name": "Thảo Phạm"
      },
      {
          "name": "Thư"
      },
      {
          "name": "Toàn"
      },
      {
          "name": "Triết"
      },
      {
          "name": "Trung D"
      },
      {
          "name": "Trung Ng"
      }
  ];
  const menu = [
    {
        "price": 35000,
        "name": "Americano"
    },
    {
        "price": 25000,
        "name": "bạc xỉu"
    },
    {
        "name": "cafe đen",
        "price": 25000
    },
    {
        "name": "cafe sữa",
        "price": 25000
    },
    {
        "price": 25000,
        "name": "cf sữa nóng"
    },
    {
        "price": 35000,
        "name": "chanh tuyết"
    },
    {
        "price": 45000,
        "name": "Orange Cold brew"
    },
    {
        "name": "nước suối",
        "price": 5000
    },
    {
        "price": 39000,
        "name": "teatox"
    }
];
    // console.log(members, menu);
    setMembers(members);
    setMenu(menu);
  };

  const fetchOrders = async () => {
    // const { orders, grOrder } = await getOrders();
    const orders = [
      {
          "belong": "Thư",
          "price": 25000,
          "name": "bạc xỉu",
          "status": false
      },
      {
          "belong": "An",
          "status": false,
          "price": 25000,
          "name": "cafe sữa (it duong)"
      },
      {
          "belong": "Hải",
          "price": 35000,
          "name": "chanh tuyết",
          "status": false
      },
      {
          "belong": "Hồng",
          "price": 25000,
          "name": "cafe sữa",
          "status": false
      },
      {
          "belong": "Huyrun",
          "price": 39000,
          "name": "teatox",
          "status": false
      },
      {
          "belong": "Nghĩa Tr",
          "price": 25000,
          "name": "cafe đen (Ko đường)",
          "status": false
      },
      {
          "belong": "Trung Ng",
          "price": 25000,
          "status": false,
          "name": "bạc xỉu"
      },
      {
          "belong": "Quang",
          "price": 25000,
          "name": "cafe đen",
          "status": false
      },
      {
          "belong": "Bảo",
          "status": false,
          "price": 39000,
          "name": "teatox"
      }
  ];
  const grOrder = {
    "bạc xỉu": [
        {
            "belong": "Thư",
            "price": 25000,
            "name": "bạc xỉu",
            "status": false
        },
        {
            "belong": "Trung Ng",
            "price": 25000,
            "status": false,
            "name": "bạc xỉu"
        }
    ],
    "cafe sữa (it duong)": [
        {
            "belong": "An",
            "status": false,
            "price": 25000,
            "name": "cafe sữa (it duong)"
        }
    ],
    "chanh tuyết": [
        {
            "belong": "Hải",
            "price": 35000,
            "name": "chanh tuyết",
            "status": false
        }
    ],
    "cafe sữa": [
        {
            "belong": "Hồng",
            "price": 25000,
            "name": "cafe sữa",
            "status": false
        }
    ],
    "teatox": [
        {
            "belong": "Huyrun",
            "price": 39000,
            "name": "teatox",
            "status": false
        },
        {
            "belong": "Bảo",
            "status": false,
            "price": 39000,
            "name": "teatox"
        }
    ],
    "cafe đen (Ko đường)": [
        {
            "belong": "Nghĩa Tr",
            "price": 25000,
            "name": "cafe đen (Ko đường)",
            "status": false
        }
    ],
    "cafe đen": [
        {
            "belong": "Quang",
            "price": 25000,
            "name": "cafe đen",
            "status": false
        }
    ]
};
  const grOrder2 = [];
    // console.log(orders, grOrder);
    setOrderInArr(orders);
    setGrOrder(grOrder);
  };
  useEffect(() => {
    fetchData();
    fetchOrders();
  }, []);

  const sum = orderInArr.reduce((rs, cur) => (rs += cur.price), 0);
  const sumToShow = sum ? (sum - sum * 0.1) / 1000 : 0;

  return (
    <>
    <div className='mx-auto max-w-2xl px-4'>
      <TableSumarize sumToShow={sumToShow} grOrder={grOrder}  />
      <AddItemDialog menu={menu} members={members} />
    </div>
    
    </>
  )
}

export default App2