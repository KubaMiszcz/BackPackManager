import { CargoItem as CargoItem, SimpleItem } from './item';
export interface AppData {
  cargos: CargoItem[];
  looseItems: SimpleItem[];
  longStorageItems: CargoItem[];
}

