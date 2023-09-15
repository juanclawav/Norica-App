export const evaluateLenght = (range1:number, range2:number, value:string) => {
  let regExpression:RegExp;
  
  if(range1 === 2 && range2 === 100){
    regExpression = /^.{2,100}$/;
  }else if(range1 === 1 && range2 === 100){
    regExpression = /^.{1,100}$/;
  }else if(range1 === 1 && range2 === 1000){
    regExpression = /^.{2,1000}$/;
  }else{
    regExpression = /^.{2,500}$/;
  }
  return regExpression.test(value);
};

export const evaluateSpell = (value:string) => {
  const regExpression:RegExp = /^(?!.*\s$)/;
  return regExpression.test(value);
};

export const evaluateJustLetters = (value:string) => {
  const regExpression:RegExp = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
  return regExpression.test(value);
};

export const descriptionValidator = (value:string) => {
  const regExpression:RegExp = /^(?!.*\s$)[^\s]+(?: [^\s]+)*$/;
  return regExpression.test(value);
};