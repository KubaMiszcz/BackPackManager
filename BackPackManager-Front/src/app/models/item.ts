interface SimpleItem {
  name: string;
  description: string;
  image: any;
//   weight: number;
//   size: SizeEnum;
  location: StorageItem;
  priority: PriorityEnum[];
  orderNo: Number;
  //   isPinned:boolean;
}

interface StorageItem extends SimpleItem {
  items: SimpleItem[];
  //   capacity: SizeEnum;
  locationWhenNotused: StorageItem;
}

interface ToDoItem {
  name: string;
}
  

//generate tree
//generate checklist