import clone from "@/lib/clone";

const localStorageKeyName = "recordList";
let data: RecordItem[] | undefined = undefined;

const recordStore = {
  fetchRecords() {
    data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
    return data;
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  recordList:data,
  createRecord: (record: RecordItem)=>{
      const record2: RecordItem=clone(record);
      record2.recordTime = new Date();
      data&&data.push(record2)
      recordStore.saveRecords();
  } 
};
recordStore.fetchRecords

export default recordStore

