exports.limitFromArgs = args => {
  if (args.limit <= 0) {
    throw new Error('Invalid limit. Must be positive');
  }
  if (args.limit > 100) {
    throw new Error('Invalid limit. Maximum is 100');
  }
  return args.limit || 100;
};
