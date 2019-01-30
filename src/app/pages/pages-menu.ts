import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Profile',
    icon: 'nb-home',
    link: '/pages/profile',
    home: true,
  },
  {
    title: 'Teachers',
    icon: 'nb-home',
    link: '/pages/teachers',
    home: true,
  },
  {
    title: 'Students',
    icon: 'nb-home',
    link: '/pages/students',
    home: true,
  },
  {
    title: 'Classes',
    icon: 'nb-home',
    link: '/pages/classes',
    home: true,
  },
  {
    title: 'Sections',
    icon: 'nb-home',
    link: '/pages/sections',
    home: true,
  },
  {
    title: 'Courses',
    icon: 'nb-home',
    link: '/pages/courses',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },

];
