'use strict';

function exec(){
  var serval = new Serval();
  var bf = new Brainfuck();

  var source = document.getElementById('source');
  var output = document.getElementById('output');

  serval.execLexer(source.value);
  var bfsource = serval.execParser();

  output.value = bf.exec(bfsource)
}
