import { IoBarChartSharp } from 'react-icons/io5';
import { MdLocalShipping } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { AiOutlineShop, AiOutlineShopping } from 'react-icons/ai';

const links = [
  {
    id: 1,
    text: 'The Market',
    path: '/shop',
    icon: <AiOutlineShopping />,
  },
  {
    id: 2,
    text: 'stats',
    path: '/stats',
    icon: <IoBarChartSharp />,
  },
  {
    id: 3,
    text: 'my shop',
    path: '/my-shop',
    icon: <AiOutlineShop />,
  },
  {
    id: 4,
    text: 'add product',
    path: '/add-product',
    icon: <FaWpforms />,
  },
  {
    id: 5,
    text: 'order',
    path: '/order',
    icon: <MdLocalShipping />,
  },
];

export default links;
