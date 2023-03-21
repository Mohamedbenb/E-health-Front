import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Navigation',
    group: true,
  },
  
  
  
  

  {
    title: 'Gestion des Collaborateurs',
    link: '/pages/forms/layouts',
    icon:'grid-outline',
  },

      {
        title: 'Calendrier',
        link: '/pages/cal',
        icon:'calendar-outline'
      },
      


  

      {
        title: 'Statistiques',
        link: '/pages/charts/chartjs',
        icon: 'pie-chart-outline',
      },

    
  
  
  {
    title: 'Historique',
    icon: 'archive-outline',
    link: '/pages/tables/tree-grid',

  },
  
];
