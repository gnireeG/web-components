import '@gnireeg/scroll-navbar';
import '@gnireeg/fly-out';
import '@gnireeg/theme-toggle';
import '@gnireeg/router';

import { RouterOutlet } from '@gnireeg/router'

import HomePage from './pages/home';
import Flyout from './pages/Flyout';

const router = document.querySelector('router-outlet') as RouterOutlet;

router.routes = [
    {
        name: 'home',
        path: '/',
        component: HomePage
    },
    {
        name: 'flyout',
        path: '/fly-out',
        component: Flyout
    }
];