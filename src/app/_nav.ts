import { INavData } from '@coreui/angular';

const isActive: any = localStorage.getItem('active_status');
console.log(isActive)
export let navItems: INavData[] = [];

  navItems = [
     {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-file-text-o',
      //attributes: { disabled: isActive == 1 ? false : true }
    },
    {
      name: 'Upload Document',
      url: '/upload-document',
      icon: 'fa fa-file-text-o',
    },
    {
      name: 'Albums',
      url: '/album',
      icon: 'fa fa-file-text-o',
      //attributes: { disabled: isActive == 1 ? false : true },
    },
    {
      name: 'Albums Category',
      url: '/albums-category',
      icon: 'fa fa-file-text-o',
      //attributes: { disabled: isActive == 1 ? false : true },
    },
    {
      name: 'Songs',
      url: '/song',
      icon: 'fa fa-file-text-o',
      //attributes: { disabled: isActive == 1 ? false : true },
    },
    {
      name: 'Songs Category',
      url: '/songs-category',
      icon: 'fa fa-file-text-o',
      //attributes: { disabled: isActive == 1 ? false : true },
    },
    {
      name: 'Podcast',
      url: '/podcast',
      icon: 'fa fa-podcast',
      //attributes: { disabled: isActive == 1 ? false : true },

    },
    {
      name: 'Podcast Category',
      url: '/podcast-category',
      icon: 'fa fa-podcast',
      //attributes: { disabled: isActive == 1 ? false : true },
    },
    {
      name: 'Artist',
      url: '/artist',
      icon: 'fa fa-file-text-o',
      //attributes: { disabled: isActive == 1 ? false : true },
    } ,
    {
      name: 'Country',
      url: '/country',
      icon: 'fa fa-file-text-o',
      //attributes: { disabled: isActive == 1 ? false : true },
    } ,
    {
      name: 'Genre',
      url: '/genre',
      icon: 'fa fa-file-text-o',
      //attributes: { disabled: isActive == 1 ? false : true },
    } ,
    {
      name: 'Playlist',
      url: '/playlist',
      icon: 'fa fa-podcast',
      //attributes: { disabled: isActive == 1 ? false : true },
    }

  ];
