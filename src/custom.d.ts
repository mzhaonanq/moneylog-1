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
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated";
  update: (id: string, name: string) => "success" | "duplicate" | "not found";
  remove: (id: string) => boolean;
  save: () => void;
};
interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: (
    id: string,
    name: string
  ) => "success" | "duplicate" | "not found";
  findTag: (id: string) => Tag;
  recordList: RecordItem[];
  createRecord: (record: RecordItem) => void;
}
