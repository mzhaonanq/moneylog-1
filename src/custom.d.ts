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
  createRecordError: Error|null;
};

type Tag = {
  id: string;
  name: string;
};




