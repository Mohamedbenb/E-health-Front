import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Navigation',
    group: true,
  },
  
  
  {
    title: 'Nouvelle Visite',
    icon: 'file-add-outline',
    link: '/pages/visite',
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
        title: 'Forms',
        icon: 'edit-2-outline',
        link: '/pages/forms/inputs',
      },


  

      {
        title: 'Statistiques',
        link: '/pages/charts/chartjs',
        icon: 'pie-chart-outline',
      },

    
  
  
  //{
  //  title: 'Historique',
  //  icon: 'archive-outline',
  //  link: '/pages/tables/tree-grid',
//
  //},

    
  {
    title: 'Paramétrage',
    icon: 'settings-outline',
    link: '/pages/tables/tree-grid',

  },  

  
  
];
