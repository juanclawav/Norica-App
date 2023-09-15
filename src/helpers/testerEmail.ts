export const testEmail = (email:string) => {
  const emailTester = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailTester.test(email);
};
