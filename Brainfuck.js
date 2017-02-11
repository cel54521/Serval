/**
 * @fileoverview Brainfuckの実行クラス
 */
'use strict';

/**
 * Brainfuckクラス
 * @param {string} source ソースコード
 * @constructor
 */
var Brainfuck = function(){
  /** メモリ配列
   * @type {Array.<number>}
   */
  var memoryArray_ = new Array(30000);
  for (var i=0; i<30000; i++) {
    memoryArray_[i] = 0;
  }
  /** インストラクションポインタ
   * @type {number}
   */
  var instructionPointer_ = 0;

  Object.defineProperties(this, {
    memoryArray: {
      get: function() {
        return memoryArray_;
      },
      set: function(memoryArray) {
        memoryArray_ = memoryArray;
      }
    },
    instructionPointer: {
      get: function() {
        return instructionPointer_;
      },
      set: function(instructionPointer) {
        instructionPointer_ = instructionPointer;
      }
    }
  });
};

Brainfuck.prototype = {
  /**
   * ソースコードの実行
   * @param {string} source ソースコード
   * @return {string} 出力文字列
   */
  exec: function(source){
    /** 読み込み位置
     * @type {number}
     */
    var readPosition = 0;

    /** 読み込み文字
     * @type {char}
     */
    var readChar = "";

    /** カッコカウント
     * @type {number}
     */
    var bracketCount = 0;

    /** 出力文字
     * @type {string}
     */
    var output = "";

    while ((readChar = source.charAt(readPosition)) != ""){
      readPosition++

      switch(readChar){
        case ">":
          if (this.instructionPointer != 30000){
            this.instructionPointer++;
          }else{
            this.instructionPointer = 0;
          }
          break;
        case "<":
          if (this.instructionPointer != 0){
            this.instructionPointer--;
          }else{
            this.instructionPointer = 30000;
          }
          break;
        case "+":
          this.memoryArray[this.instructionPointer]++;
          break;
        case "-":
          this.memoryArray[this.instructionPointer]--;
          break;
        case ".":
          output = output + String.fromCharCode(this.memoryArray[this.instructionPointer]);
          break;
        case "[":
          // インストラクションポインタが指す値が0なら対応する"]"の直後へジャンプ
          if (this.memoryArray[this.instructionPointer] == 0){
            while((readChar = source.charAt(readPosition))){
              readPosition++;
              if (readChar == "["){
                bracketCount++;
              }else if (readChar == "]" && bracketCount != 0){
                bracketCount--;
              }else if (readChar == "]" && bracketCount == 0){
                break;
              }
            }
          }
          break;
        case "]":
        // インストラクションポインタが指す値が0なら対応する"]"の直後へジャンプ
        if (this.memoryArray[this.instructionPointer] != 0){
          readPosition -= 2;
          while((readChar = source.charAt(readPosition))){
            readPosition--;
            if (readChar == "]"){
              bracketCount++;
            }else if (readChar == "[" && bracketCount != 0){
              bracketCount--;
            }else if (readChar == "[" && bracketCount == 0){
              readPosition++;
              break;
            }
          }
        }
          break;
        default:

          break;
      }
    }
    return output;
  }
};
