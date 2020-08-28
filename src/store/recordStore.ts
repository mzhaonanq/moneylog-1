import clone from "@/lib/clone";


const recordStore = {
  recordList: [] as RecordItem[],

  fetchRecords() {
    console.log("来取数据了");
    this.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.recordTime = new Date();
    this.recordList?.push(record2);
    recordStore.saveRecords();
  },
};
recordStore.fetchRecords()

export default recordStore

