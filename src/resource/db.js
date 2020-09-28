"use strict";

class IndexDBStored {
  constructor(db) {
    this.db = db;
  }

  async init() {
    let request = window.indexedDB.open("quizs", 3);
    if (!window.indexedDB) {
      alert("Browser anda tidak mendukung IndexDB");
    }
    request.onerror = e => {
      console.log("Error opening DB", e);
    };
    request.onsuccess = e => {
      console.log("Success Open DB " + e);
    };
    request.onupgradeneeded = e => {
      console.log("onupgradeneeded");
      let db = e.target.result;
      if (!db.objectStoreNames.contains("quizs")) {
        let store = db.createObjectStore("quizs", { autoIncrement: true, keyPath: "id" });
        store.createIndex("soal_id", "soal_id", { unique: true });
      }
    };
  }

  async _getDataStoredDB() {
    let transaction = await this.db.transaction("quizs", "readwrite").objectStore("quizs");
    transaction.onerror = e => {
      console.log("Error Add", e);
    };
    transaction.oncomplete = e => {
      console.log(e);
    };

    transaction.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        console.log("Name for SSN " + cursor.key + " is " + JSON.stringify(cursor.value));
        cursor.continue();
        return cursor;
      } else {
        console.log("No more entries!");
      }
    };
  }
}

module.exports = new IndexDBStored();
