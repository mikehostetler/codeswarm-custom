var async = require('async');
var util  = require('./util');

module.exports = Run;

function Run(stage, commands) {
  console.log('RUN', arguments);
  if (! commands) commands = '';
  commands = commands.split('\n').map(util.trim).filter(util.notEmpty);

  async.eachSeries(commands, run, done);

  function run(command, cb) {
    var child = stage.command('bash', ['-c', command]);
    child.once('close', childClosed);

    function childClosed(code) {
      var err;
      if (code != 0) err = new Error('exit code was ' + code);
      cb(err);
    }
  }

  function done() {
    stage.end();
  }
}