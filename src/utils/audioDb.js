/**
 * IndexedDB Utility for storing audio blobs locally.
 * IndexedDB is used because localStorage has a 5MB limit, 
 * which is insufficient for multiple audio recordings.
 */

const DB_NAME = 'InterQ_Audio_DB';
const STORE_NAME = 'recordings';
const DB_VERSION = 1;

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveRecording = async (blob, question, roleTitle, sessionTimestamp) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const entry = {
      blob,
      question,
      roleTitle,
      sessionTimestamp,
      timestamp: Date.now(),
      type: blob.type
    };

    const request = store.add(entry);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getSessionRecordings = async (sessionTimestamp) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const all = request.result;
      // Filter by session and sort by time
      const filtered = all
        .filter(item => item.sessionTimestamp === sessionTimestamp)
        .sort((a, b) => a.timestamp - b.timestamp);
      resolve(filtered);
    };
    request.onerror = () => reject(request.error);
  });
};

export const clearOldRecordings = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  transaction.objectStore(STORE_NAME).clear();
};