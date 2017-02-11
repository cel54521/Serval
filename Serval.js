/**
 * @fileoverview サーバルの実行クラス
 */
'use strict';

/*
わーい！すごーい！たのしー！

わーい！     token_id = 1
すごーい！   token_id = 2
たのしー！   token_id = 3

わーい！すごーい！     ： ポインタをインクリメントする。ポインタをptrとすると、C言語の「ptr++;」に相当する。
わーい！たのしー！     ：ポインタをデクリメントする。C言語の「ptr--;」に相当。
すごーい！たのしー！    ：+ ポインタが指す値をインクリメントする。C言語の「(*ptr)++;」に相当。
すごーい！わーい！     ：- ポインタが指す値をデクリメントする。C言語の「(*ptr)--;」に相当。
たのしー！たのしー！    ：. ポインタが指す値を出力に書き出す。C言語の「putchar(*ptr);」に相当。
たのしー！すごーい！    [ ポインタが指す値が0なら、対応する ] の直後にジャンプする。C言語の「while(*ptr){」に相当。
たのしー！わーい！    ] ポインタが指す値が0でないなら、対応する [ （の直後[1]）にジャンプする。C言語の「}」に相当[2]。
*/
/**
 * Servalクラス
 * @param {string} source ソースコード
 * @constructor
 */
var Serval = function(){
  /** token配列
   * @type {Array.<number>}
   */
  var tokens_ = new Array();

  Object.defineProperties(this, {
    tokens: {
      get: function() {
        return tokens_;
      },
      set: function(tokens) {
        tokens_ = tokens;
      }
    }
  });
};

/**
 * 字句解析の実行
 * @param {string} source ソースコード
 */
Serval.prototype = {
  execLexer: function(source){
    /** 読み込み位置
     * @type {number}
     */
    var readPosition = 0;

    /** 読み込み文字
     * @type {char}
     */
    var readChar = "";

    /** トークン文字列
     * @type {string}
     */
    var tokenStr = "";

    while ((readChar = source.charAt(readPosition)) != ""){
      readPosition++;
      switch (readChar){
        case "！":
          tokenStr += readChar;
          if (tokenStr == "わーい！"){
            this.tokens.push(1);
          }else if (tokenStr == "すごーい！"){
            this.tokens.push(2);
          }else if (tokenStr == "たのしー！"){
            this.tokens.push(3);
          }else{
            this.tokens.push(4);
          }
          tokenStr = "";
          break;

        case "わ":
        case "ー":
        case "い":
        case "す":
        case "ご":
        case "た":
        case "の":
        case "し":
          tokenStr += readChar;
          break;

      }
    }
  },

  /**
   * 構文解析の実行
   * @return {string} Brainfuckソースコード
   */
  execParser: function(){
    /** トークンid
     * @type {number}
     */
    var tokenId;

    /** 出力
     * @type {string}
     */
     var output = "";

    while(this.tokens.length != 0){
      tokenId = this.tokens[0];
      this.tokens.shift();

      switch (tokenId){
        case 1: /* わーい！ */
          if(this.tokens.length != 0){
            tokenId = this.tokens[0];
            this.tokens.shift();

            switch (tokenId){
              case 2: /* すごーい！ */
                output += ">";
                break;
              case 3: /* たのしー！ */
                output += "<";
                break;
              default:
                /* なんのフレンズなの？ */
                break;
            }
          }
          break;
        case 2: /* すごーい！ */
          if(this.tokens.length != 0){
            tokenId = this.tokens[0];
            this.tokens.shift();

            switch (tokenId){
              case 1: /* わーい！ */
                output += "-";
                break;
              case 3: /* たのしー！ */
                output += "+";
                break;
              default:
                /* なんのフレンズなの？ */
                break;
            }
          }
          break;
        case 3: /* たのしー！ */
          if(this.tokens.length != 0){
            tokenId = this.tokens[0];
            this.tokens.shift();

            switch (tokenId){
              case 1: /* わーい！ */
                output += "]";
                break;
              case 2: /* すごーい！ */
                output += "[";
                break;
              case 3: /* たのしー！ */
                output += ".";
                break;
              default:
                /* なんのフレンズなの？ */
                break;
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
