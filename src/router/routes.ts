export enum AppRoutes {
   HOME_ROUTE = '/',
   SEARCH_ROUTE = '/search',
   PAGE_ROUTE = '/pages',
   INFO_ROUTE = '/movie',
}

const AppRoutesTitles: Record<string, string> = {
   HOME_ROUTE: 'Главная',
};

const opt = {
   get(_t: Record<string, string>, p: string) {
      return p in AppRoutesTitles ? AppRoutesTitles[p] : 'Сюрприз';
   },
};

export const ROUTES_TRANSLATOR = new Proxy(AppRoutes, opt);
