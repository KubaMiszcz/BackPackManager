import { ICargoItem as ICargoItem, ISimpleItem } from './item';
export interface AppData {
  cargos: ICargoItem[];
  items: ISimpleItem[];
  // looseItems: ICargoItem[];
  // longStorageItems: ICargoItem[];
}

