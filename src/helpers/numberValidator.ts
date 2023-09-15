export const validateNumber = (phoneNumber:string,numberLenght:number) => {
  let expression:RegExp;
  if(numberLenght === 7){
    expression = /^[0-9]{7}$/;
  }else{
    expression = /^[0-9]{8}$/;
  }
  return expression.test(phoneNumber);
};
