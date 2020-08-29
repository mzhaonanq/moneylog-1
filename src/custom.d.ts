type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  recordTime?: string;
};

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
};

type Tag = {
  id: string;
  name: string;
};




