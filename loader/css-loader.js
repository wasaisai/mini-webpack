module.exports = function (source) {
    const escaped = JSON.stringify(source);

    return `
      export default ${escaped};
    `;
}