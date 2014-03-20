var run = require('./run');

module.exports = test;

function test(build, stage, config) {
  run(stage, config.test_scripts);
}