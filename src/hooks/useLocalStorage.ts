const stringToValue = (key:string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

const getDataLS = (key:string) => {
  const DATA_PAGE = stringToValue(key);
  return DATA_PAGE;
};

const saveDataLS = (keyValue:string,value:any) => {
  if(!localStorage.getItem(keyValue)){
    localStorage.setItem(keyValue,JSON.stringify({}));
  }

  const STORAGE_VALUE = stringToValue(keyValue);
  localStorage.setItem(keyValue, JSON.stringify({...STORAGE_VALUE,...value}));
};

interface actionsLocalStorage{
  saveDataLS:(keyValue: string, value: any) => void;
  getDataLS:(key: string) => any;
};

export const useLocalStorage = ():actionsLocalStorage => {
  return {
    saveDataLS,
    getDataLS
  };
};
