var PQ = module.exports = require('bindings')('addon.node').PQ;

var EventEmitter = require('events').EventEmitter;
var assert = require('assert');

for(var key in EventEmitter.prototype) {
  PQ.prototype[key] = EventEmitter.prototype[key];
}

PQ.prototype.connectSync = function(paramString) {
  if(!paramString) {
    paramString = '';
  }
  var connected = this.$connectSync(paramString);
  if(!connected) {
    this.finish();
    throw new Error(this.errorMessage());
  }
};

PQ.prototype.connect = function(paramString, cb) {
  if(typeof paramString == 'function') {
    cb = paramString;
    paramString = '';
  }
  if(!paramString) {
    paramString = '';
  }
  assert(cb, 'Must provide a connection callback');
  this.$connect(paramString, cb);
};

PQ.prototype.errorMessage = function() {
  return this.$getLastErrorMessage();
};

PQ.prototype.socket = function() {
  return this.$socket();
};

PQ.prototype.finish = function() {
  this.$finish();
};

PQ.prototype.exec = function(commandText) {
  if(!commandText) {
    commandText = '';
  }
  this.$exec(commandText);
};

PQ.prototype.execParams = function(commandText, parameters) {
  if(!commandText) {
    commandText = '';
  }
  if(!parameters) {
    parameters = [];
  }
  this.$execParams(commandText, parameters);
};

PQ.prototype.prepare = function(statementName, commandText, nParams) {
  assert.equal(arguments.length, 3, 'Must supply 3 arguments');
  if(!statementName) {
    statementName = '';
  }
  if(!commandText) {
    commandText = '';
  }
  nParams = Number(nParams) || 0;
  this.$prepare(statementName, commandText, nParams);
};

PQ.prototype.execPrepared = function(statementName, parameters) {
  if(!statementName) {
    statementName = '';
  }
  if(!parameters) {
    parameters = [];
  }
  this.$execPrepared(statementName, parameters);
};

PQ.prototype.sendQuery = function(commandText) {
  if(!commandText) {
    commandText = '';
  }
  return this.$sendQuery(commandText);
};

PQ.prototype.sendQueryParams = function(commandText, parameters) {
  if(!commandText) {
    commandText = '';
  }
  if(!parameters) {
    parameters = [];
  }
  return this.$sendQueryParams(commandText, parameters);
};

PQ.prototype.sendPrepare = function(statementName, commandText, nParams) {
  assert.equal(arguments.length, 3, 'Must supply 3 arguments');
  if(!statementName) {
    statementName = '';
  }
  if(!commandText) {
    commandText = '';
  }
  nParams = Number(nParams) || 0;
  return this.$sendPrepare(statementName, commandText, nParams);
};

PQ.prototype.sendQueryPrepared = function(statementName, parameters) {
  if(!statementName) {
    statementName = '';
  }
  if(!parameters) {
    parameters = [];
  }
  return this.$sendQueryPrepared(statementName, parameters);
};

PQ.prototype.getResult = function() {
  return this.$getResult();
};

PQ.prototype.resultStatus = function() {
  return this.$resultStatus();
};

PQ.prototype.resultErrorMessage = function() {
  return this.$resultErrorMessage();
};

PQ.prototype.clear = function() {
  this.$clear();
};

PQ.prototype.ntuples = function() {
  return this.$ntuples();
};

PQ.prototype.nfields = function() {
  return this.$nfields();
};

PQ.prototype.fname = function() {
  return this.$fname();
};

PQ.prototype.ftype = function() {
  return this.$ftype();
};

PQ.prototype.getvalue = function(row, col) {
  return this.$getvalue(row, col);
};

PQ.prototype.getisnull = function(row, col) {
  return this.$getisnull(row, col);
};

//calls libuv's "select" on the connection's socket
//once the socket becomes readable, the callback is called
//once and only once.  After the connection becomes readable
//the socket is suspended again immediately so another PQ#read
//must be called to receive more data
PQ.prototype.readable = function(cb) {
  throw new Error('Not implemented')
  this.$startRead();
  return this.once('readable', cb);
};

PQ.prototype.startReader = function() {
  this.$startRead();
};

PQ.prototype.stopReader = function() {
  this.$stopRead();
};

PQ.prototype.writable = function(cb) {
  this.$startWrite();
  return this.once('writable', cb);
};

//returns boolean - false indicates an error condition
//e.g. a failure to consume input
PQ.prototype.consumeInput = function() {
  return this.$consumeInput();
};

//returns true if PQ#getResult would cause
//the process to block waiting on results
//false indicates PQ#getResult can be called
//with an assurance of not blocking
PQ.prototype.isBusy = function() {
  return this.$isBusy();
};

PQ.prototype.setNonBlocking = function(truthy) {
  return this.$setNonBlocking(truthy ? 1 : 0);
};

PQ.prototype.isNonBlocking = function() {
  return this.$isNonBlocking();
};

//returns 1 if socket is not write-ready
//returns 0 if all data flushed to socket
//returns -1 if there is an error
PQ.prototype.flush = function() {
  return this.$flush();
};

PQ.prototype.escapeLiteral = function(input) {
  if(!input) return input;
  return this.$escapeLiteral(input);
};

PQ.prototype.escapeIdentifier = function(input) {
  if(!input) return input;
  return this.$escapeIdentifier(input);
}
