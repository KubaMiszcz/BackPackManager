import { Point } from '@angular/cdk/drag-drop';

export type Nullable<T> = T | undefined | null;

export interface ISimpleItem {
  name: string;
  isPinned?: boolean;
  parentCargo?: ISimpleItem;
  // parentCargo?: Nullable<ISimpleItem>;
  // description: string;
  // image: any;
  //   weight: number;
  //   size: SizeEnum;
  // location: StorageItem;
  // priority: PriorityEnum[];
  // orderNo: Number;
  //   isPinned:boolean;
}

export class SimpleItem implements ISimpleItem {
  name = '';
  // parentCargo?: ISimpleItem = null;
  // parentCargo: SimpleItem = undefined;
}




export interface ICargoItem extends ISimpleItem {
  items: ISimpleItem[];
  dragPosition?: PointXY;
  //   capacity: SizeEnum;
  // locationWhenNotused: StorageItem;
}

export class CargoItem implements ICargoItem {
  name: string = '';
  items: ISimpleItem[] = [];
  dragPosition?: PointXY = { x: 0, y: 0 };
}

// export interface StorageItem extends SimpleItem {
//   items: SimpleItem[];
//   //   capacity: SizeEnum;
//   // locationWhenNotused: StorageItem;
// }

export interface IToDoItem {
  name: string;
}

export class PointXY implements Point {
  x: number = 0;
  y: number = 0;
}
