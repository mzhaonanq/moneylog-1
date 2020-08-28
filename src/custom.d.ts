type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  recordTime?: Date;
};

type Tag = {
  id: string;
  name: string;
};


//待删：
// type TagListModel = {
//   data: Tag[];
//   fetch: () => Tag[];
//   create: (name: string) => "success" | "duplicated";
//   update: (id: string, name: string) => "success" | "duplicate" | "not found";
//   remove: (id: string) => boolean;
//   save: () => void;
// };



