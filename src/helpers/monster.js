exports.limitFromArgs = args => {
  if (args.limit <= 0) {
    throw new Error('Invalid limit. Must be positive');
  }
  if (args.limit > 100) {
    throw new Error('Invalid limit. Maximum is 100');
  }
  return args.limit || 100;
};

exports.offsetFromArgs = args => {
  if (args.offset <= 0) {
    throw new Error('Invalid offset. Must be positive');
  }
  return args.offset || 0;
};
