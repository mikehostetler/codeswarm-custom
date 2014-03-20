var async  = require('async');
var Parser = require('tap-parser');
var util   = require('./util');

module.exports = Run;

function Run(stage, commands, parseResults) {
  if (! commands) commands = '';
  commands = commands.split('\n').map(util.trim).filter(util.notEmpty);

  async.mapSeries(commands, run, done);

  function run(command, cb) {
    var child = stage.command('bash', ['-c', command]);
    child.once('close', childClosed);

    var out;

    if (parseResults) {
      out = '';
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', onChildData);
    }

    function onChildData(d) {
      out += d;
    }

    function childClosed(code) {
      var err;
      if (code != 0) err = new Error('exit code was ' + code);
      cb(err, out);
    }
  }

  function done(err, results) {
    var result;
    if (parseResults && results) {
      result = results[results.length - 1];
      result = parse(result, gotResults);
    } else gotResults();

    function gotResults(results) {
      stage.end({ custom: results });
    }
  }
}

function parse(result, cb) {
  var parser = Parser(cb);
  parser.end(result);
}