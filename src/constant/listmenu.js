import Home from '~/assets/image/menu/home.png';
import School from '~/assets/image/menu/school.png';
import Learning from '~/assets/image/menu/learning.png';
import Process from '~/assets/image/menu/process.png';
import Contact from '~/assets/image/menu/contact.png';
import Account from '~/assets/image/menu/account.png';
import config from '~/config';

const listMenu = [
  { icon: Home, title: 'menu1', navlink: config.routes.homepage },
  { icon: School, title: 'menu2', navlink: config.routes.homepage, opacity: 'opacity' },
  { icon: Learning, title: 'menu3', navlink: '/a', opacity: 'opacity' },
  { icon: Process, title: 'menu4', navlink: config.routes.process },
  { icon: Contact, title: 'menu5', navlink: config.routes.homepage },
  { icon: Account, title: 'menu6', navlink: config.routes.account },
];

export default listMenu;
