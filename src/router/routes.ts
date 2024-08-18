export enum AppRoutes {
   HOME_ROUTE = '/',
   NATIVE_ROUTE = '/native',
   LIB_ROUTE = '/lib',
}

const AppRoutesTitles: Record<string, string> = {
   HOME_ROUTE: 'Главная',
   NATIVE_ROUTE: 'Нативная форма',
   LIB_ROUTE: 'React Hook Form',
};

const opt = {
   get(_t: Record<string, string>, p: string) {
      return p in AppRoutesTitles ? AppRoutesTitles[p] : 'Сюрприз';
   },
};

export const ROUTES_TRANSLATOR = new Proxy(AppRoutes, opt);
