import { Point } from '@angular/cdk/drag-drop';

export type Nullable<T> = T | undefined | null;

export interface ISimpleItem {
  name: string;
  // parentCargo: Nullable<ISimpleItem>;
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
  name: string = '';
  // parentCargo = null;
  // parentCargo: SimpleItem = undefined;
}

export interface ICargoItem extends ISimpleItem {
  items: ISimpleItem[];
  dragPosition?: Point;
  //   capacity: SizeEnum;
  // locationWhenNotused: StorageItem;
}

export class CargoItem implements ICargoItem {
  name: string = '';
  items: ISimpleItem[] = [];
  dragPosition: Point = { x: 0, y: 0 };
}

// export interface StorageItem extends SimpleItem {
//   items: SimpleItem[];
//   //   capacity: SizeEnum;
//   // locationWhenNotused: StorageItem;
// }

export interface IToDoItem {
  name: string;
}
