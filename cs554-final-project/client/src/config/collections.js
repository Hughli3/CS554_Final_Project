import dbConnection from './connection' 

const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export default {
    user: getCollectionFn('user'),
    property: getCollectionFn('property')
};