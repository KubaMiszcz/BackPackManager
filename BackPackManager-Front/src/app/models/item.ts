interface Item {
  name: string;
  description: string;
  image: any;
  weight: number;
  size: SizeEnum;
  location: Item;
  items: Item[];
  priority: PriorityEnum[];
}