import ReactGA from 'react-ga';


export const ReactGAIninitialize = ReactGA.initialize('UA-152903441-1')

export const setCurrentPageView = ()=>ReactGA.pageview(window.location.pathname + window.location.search);

export const setPageView = ()=>ReactGA.set({page: window.location.pathname})