import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Home',
    isActive:true,
    icon:'menu-icon tf-icons ti ti-smart-home',
    link: '/feed/list',
    roles:['ROLE_ADMIN','ROLE_EDITOR','ROLE_FACTCHECKER']
  },
  {
    id: 2,
    label: 'Create',
    link: '/feed/create',
    icon:"menu-icon tf-icons ti ti-pencil",
    roles:['ROLE_ADMIN','ROLE_EDITOR','ROLE_FACTCHECKER']
  },
  {
    id: 3,
    label: 'Draft',
    icon:"menu-icon tf-icons ti ti-notes",
    roles:['ROLE_ADMIN','ROLE_EDITOR','ROLE_FACTCHECKER']

  },
  {
    id: 2,
    label: 'Setting',
    roles:['ROLE_ADMIN'],
    icon: 'menu-icon tf-icons ti ti-settings',
    subItems: [
      {
        id: 3,
        label: 'Users',
        link: '/users',
        parentId: 2
      },
      {
        id: 4,
        label: 'Ratings',
        link: '/ratings/list',
        parentId: 2
      },
      {
        id: 5,
        label: 'Templates',
        link: 'templates',
        parentId: 2,
        subItems: [
          {
            id: 7,
            label: 'Video / Audio',
            link: 'templates/videos-audio',
            parentId: 5
          },
          {
            id: 8,
            label: 'Image',
            link: '/templates/images',
            parentId: 5
          }
          
        ]
      },
      {
        id: 6,
        label: 'Languages',
        link: 'languages',
        parentId: 2
      }
      
    ]
  
  
    
  }

];
