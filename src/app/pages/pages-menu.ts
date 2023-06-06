import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [


  
  {
    title: 'Nouvel Examen',
    icon: 'file-add-outline',
    link: '/pages/visite',
    badge: {
      text: '',
      status: '',
    },
  },
  {
    title: 'Déclaration',
    icon: 'edit-2-outline',
    link: '/pages/declaration',
  },
  
  {  
    title: 'Gestion des Collaborateurs',
    link: '/pages/employees',
    icon:'grid-outline',
  },
    
  {
    title: 'Calendrier',
    link: '/pages/cal',
    icon:'calendar-outline'
  },
  {
    title: 'Statistiques',
    link: '/pages/statistics',
    icon: 'pie-chart-outline',
  },

  {
    title: 'Historique',
    link: '/pages/historique',
    icon: 'file-text-outline',
  },

  {
    title: 'Paramétrage',
    icon: 'settings-outline',
    link: '/pages/parametrage',
  },
  // {
  //   title: 'Chat',
  //   icon: 'message-circle-outline',
  //   link: '/pages/chat',
  // },  

];


