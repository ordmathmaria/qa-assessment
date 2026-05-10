export const testData = {
  users: {
    standardUser: {
      username: process.env.STANDARD_USER as string,
      password: process.env.USER_PASSWORD as string,
    },
    lockedOutUser: {
      username: process.env.LOCKED_USER as string,
      password: process.env.USER_PASSWORD as string,
    },
    problemUser: {
      username: process.env.PROBLEM_USER as string,
      password: process.env.USER_PASSWORD as string,
    },
    invalidUser: {
      username: process.env.INVALID_USER as string,
      password: process.env.INVALID_PASSWORD as string,
    },
  },
  checkout: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    product: 'sauce-labs-backpack',
    specialChars: {
      firstName: 'Jøhn',
      lastName: 'Döe!',
      postalCode: '12-345@',
    },
  },
  security: {
    sqlInjection: {
      username: "' OR '1'='1",
      password: "' OR '1'='1",
    },
  },
};
