import { ICargoItem as ICargoItem, ISimpleItem } from './item';
export interface AppData {
  cargos: ICargoItem[];
  looseItems: ICargoItem[];
  longStorageItems: ICargoItem[];
}

