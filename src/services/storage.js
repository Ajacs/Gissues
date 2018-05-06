const hasLocalStorage = (function() {
    try {
        localStorage.setItem('foo', 'bar');
        localStorage.removeItem('foo');
        return true;
    } catch(e) {
        return false;
    }
}());

export const Storage = {
  localStorage: {
    set: (key, value) => {
      value = JSON.stringify(value);
      if(hasLocalStorage) {
        localStorage.setItem(key, value);
      }
    },
    get: key => {
      if(hasLocalStorage) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : value;
      }
    },
    remove: key => {
      if(hasLocalStorage) {
        localStorage.removeItem(key);
      }
    }
  }
};
