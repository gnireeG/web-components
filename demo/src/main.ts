import '@gnireeg/float-bar';
import '@gnireeg/fly-out';
import '@gnireeg/theme-toggle';
import '@gnireeg/router';
import '@gnireeg/accordion';

import { RouterOutlet } from '@gnireeg/router'

import HomePage from './pages/home';
import Flyout from './pages/flyout';
import RouterPage from './pages/router';
import FloatBar from './pages/floatbar';
import ThemeToggle from './pages/themetoggle';
import Accordion from './pages/accordion';

const router = document.querySelector('router-outlet') as RouterOutlet;

const notFoundpage = document.createElement('div')

notFoundpage.innerHTML = `
<div class="flex justify-center mt-16">
    <div class="flex flex-col gap-2">
        <h2>404</h2>
        <p>Page not found. (This is a custom 404 component)</p>
        <router-link to="home">Go to startpage</router-link>
    </div>
</div>`

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
    },
    {
        name: 'floatbar',
        path: '/float-bar',
        component: FloatBar
    },
    {
        name: 'router',
        path: '/router',
        component: RouterPage
    },
    {
        name: 'dynamic',
        path: '/router/{slug}',
        component: RouterPage
    },
    {
        name: 'themetoggle',
        path: '/theme-toggle',
        component: ThemeToggle
    },
    {
        name: 'accordion',
        path: '/accordion',
        component: Accordion
    },
    /* {
        name: '*',
        path: '*',
        component: () => notFoundpage
    } */
];