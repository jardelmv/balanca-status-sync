// Provide a polyfill for the global object that PouchDB expects
if (typeof window !== 'undefined') {
  window.global = window;
}

import PouchDB from 'pouchdb';

// Initialize local PouchDB
const localDB = new PouchDB('jbt-balanca-local');

// Remote CouchDB URL
const remoteDB = new PouchDB('https://xxx:yyy@db.vpn.ind.br/jbt-balanca');

// Get weights document
export const getWeightsDoc = async () => {
  try {
    const doc = await localDB.get('pesos');
    return doc;
  } catch (err) {
    console.error('Error fetching weights:', err);
    return null;
  }
};

// Setup sync
export const setupSync = () => {
  return localDB.sync(remoteDB, {
    live: true,
    retry: true
  }).on('change', function (change) {
    console.log('Change detected:', change);
  }).on('error', function (err) {
    console.error('Sync error:', err);
  });
};

// Get status document
export const getStatusDoc = async () => {
  try {
    const doc = await localDB.get('status');
    return doc;
  } catch (err) {
    console.error('Error fetching status:', err);
    return null;
  }
};
