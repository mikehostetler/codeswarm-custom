var run  = require('./run');

module.exports = prepare;

function prepare(build, stage, config) {
  run(stage, config.prepare_scripts);
}