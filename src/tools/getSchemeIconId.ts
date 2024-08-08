import { SchemeName } from '@typesfolder/types';

export function getSchemeIconId(schemeName: SchemeName): SchemeName {
   return schemeName === 'light' ? 'dark' : 'light';
}
