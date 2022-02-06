module.exports = {
  onPostBuild: () => {
    console.log(`hi ${process.env.CONTEXT}`);
  }
};
