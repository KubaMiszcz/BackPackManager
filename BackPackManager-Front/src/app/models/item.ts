export interface SimpleItem {
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

export interface CargoItem extends SimpleItem {
  items: SimpleItem[];
  //   capacity: SizeEnum;
  // locationWhenNotused: StorageItem;
}

// export interface StorageItem extends SimpleItem {
//   items: SimpleItem[];
//   //   capacity: SizeEnum;
//   // locationWhenNotused: StorageItem;
// }

export interface ToDoItem {
  name: string;
}
  

