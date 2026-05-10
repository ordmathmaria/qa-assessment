export const testData = {
  users: {
    standardUser: {
      username: process.env.STANDARD_USER || 'standard_user',
      password: process.env.USER_PASSWORD || 'secret_sauce',
    },
    lockedOutUser: {
      username: process.env.LOCKED_USER || 'locked_out_user',
      password: process.env.USER_PASSWORD || 'secret_sauce',
    },
    problemUser: {
      username: process.env.PROBLEM_USER || 'problem_user',
      password: process.env.USER_PASSWORD || 'secret_sauce',
    },
    invalidUser: {
      username: process.env.INVALID_USER || 'invalid_user',
      password: process.env.INVALID_PASSWORD || 'wrong_password',
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
