module.exports = config => {
  const newConfig = { ...config };
  newConfig.api = {
    enabled: true,
    access: config.access,
  };
  return newConfig;
};
