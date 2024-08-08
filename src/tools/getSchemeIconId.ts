import { SchemeName } from '@typefiles/types';

export function getSchemeIconId(schemeName: SchemeName): SchemeName {
   return schemeName === 'light' ? 'dark' : 'light';
}
