
export interface ISimpleItem {
  name: string;
  // description: string;
  // image: any;
//   weight: number;
//   size: SizeEnum;
  // location: StorageItem;
  // priority: PriorityEnum[];
  // orderNo: Number;
  //   isPinned:boolean;
}

export class SimpleItem implements ISimpleItem{
  name: string='';
}

export interface ICargoItem extends ISimpleItem {
  items: ISimpleItem[];
  //   capacity: SizeEnum;
  // locationWhenNotused: StorageItem;
}

export class CargoItem implements ICargoItem {
  name: string = '';
  items: ISimpleItem[] = [];
}


// export interface StorageItem extends SimpleItem {
//   items: SimpleItem[];
//   //   capacity: SizeEnum;
//   // locationWhenNotused: StorageItem;
// }

export interface IToDoItem {
  name: string;
}
  

