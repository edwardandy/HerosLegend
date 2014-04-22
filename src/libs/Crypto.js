'use strict';

/**
 * CS_compatible.
 */

/**
 * Copy from ngCore Lib
 */
var Base64 = (function() {
    /** @lends Core.Base64.prototype */
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function(bin){
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) {
            t[bin.charAt(i)] = i;
        }
        return t;
    }(b64chars);

    var fromCharCode = String.fromCharCode;

    var sub_toBase64 = function(m){
        var n = (m.charCodeAt(0) << 16)
            | (m.charCodeAt(1) <<  8)
            | (m.charCodeAt(2)      );
        return b64chars.charAt( n >>> 18)
            + b64chars.charAt((n >>> 12) & 63)
            + b64chars.charAt((n >>>  6) & 63)
            + b64chars.charAt( n         & 63);
    };

    var toBase64 = function(bin){
        if (bin.match(/[^\x00-\xFF]/)) {
            throw 'unsupported character found';
        }
        var padlen = 0;
        while(bin.length % 3) {
            bin += '\x00';
            padlen++;
        }
        var b64 = bin.replace(/[\x00-\xFF]{3}/g, sub_toBase64);
        if (!padlen) return b64;
        b64 = b64.substr(0, b64.length - padlen);
        while(padlen--) b64 += '=';
        return b64;
    };

    // use native btoa() if it exists
    var _btoa = typeof(btoa) !== "undefined" ? btoa : toBase64;

    var sub_fromBase64 = function(m){
        var n = (b64tab[ m.charAt(0) ] << 18)
            |   (b64tab[ m.charAt(1) ] << 12)
            |   (b64tab[ m.charAt(2) ] <<  6)
            |   (b64tab[ m.charAt(3) ]);
        return fromCharCode(  n >> 16 )
            +  fromCharCode( (n >>  8) & 0xff )
            +  fromCharCode(  n        & 0xff );
    };

    var fromBase64 = function(b64){
        b64 = b64.replace(/[^A-Za-z0-9\+\/]/g, '');
        var padlen = b64.length % 4;
        while(b64.length % 4){
            b64 += 'A';
        }
        var bin = b64.replace(/[A-Za-z0-9\+\/]{4}/g, sub_fromBase64);
        if (padlen >= 2)
            bin = bin.substring(0, bin.length - [0,0,2,1][padlen]);
        return bin;
    };

    // use native atob() if it exists
    var _atob = typeof(atob) !== "undefined" ? atob : fromBase64;

    var re_char_nonascii = /[^\x00-\x7F]/g;

    var sub_char_nonascii = function(m){
        var n = m.charCodeAt(0);
        return n < 0x800 ? fromCharCode(0xc0 | (n >>>  6))
            + fromCharCode(0x80 | (n & 0x3f))
            :              fromCharCode(0xe0 | ((n >>> 12) & 0x0f))
            + fromCharCode(0x80 | ((n >>>  6) & 0x3f))
            + fromCharCode(0x80 |  (n         & 0x3f))
            ;
    };

    var utob = function(uni){
        return unescape(encodeURIComponent(uni));
    };

    var re_bytes_nonascii
        = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;

    var sub_bytes_nonascii = function(m){
        var c0 = m.charCodeAt(0);
        var c1 = m.charCodeAt(1);
        if(c0 < 0xe0){
            return fromCharCode(((c0 & 0x1f) << 6) | (c1 & 0x3f));
        }else{
            var c2 = m.charCodeAt(2);
            return fromCharCode(
                ((c0 & 0x0f) << 12) | ((c1 & 0x3f) <<  6) | (c2 & 0x3f)
            );
        }
    };

    var btou = function(bin){
        return decodeURIComponent(escape(bin));
    };
    return {
        fromBase64:fromBase64,
        toBase64:toBase64,
        atob:_atob,
        btoa:_btoa,
        utob:utob,
        btou:btou,

        /**
         * Encode a string in Base64 format.
         * @name encode
         * @function
         * @memberOf Core.Base64
         * @example
         * var str = "Test string";
         * var encoded = Core.Base64.encode(str);  // returns "VGVzdCBzdHJpbmc="
         * @param {String} u The string to encode.
         * @returns {String} A Base64-encoded version of the string.
         * @since 1.3.1b
         */
        encode:function(u){
            if(!u) {
                return "";
            }
            return _btoa(utob(new String(u)));
        },

        /**
         * Encode binary data in Base64 format.
         * @name encodeBinary
         * @function
         * @memberOf Core.Base64
         * @example
         * var fileSys = Storage.FileSystem;
         * fileSys.readFileIn(Storage.FileSystem.Store.Local, "file.bin", { },
         *   function(err, data) {
		 *     if (err) {
		 *         console.log("An error occurred while reading " + fileName + ": " + err);
		 *     } else {
		 *         var encoded = Core.Base64.encodeBinary(data);
		 *     }
		 * });
         * @param {String} u The binary data to encode.
         * @returns {String} A Base64-encoded version of the data.
         */
        // do not process unicode coversion for binary data.
        encodeBinary: function(u) {
            if(!u) {
                return "";
            }
            return _btoa(new String(u));
        },

        /**
         * Decode a Base64-encoded string.
         * @name decode
         * @function
         * @example
         * var encoded = "VGVzdCBzdHJpbmc=";
         * var str = Core.Base64.decode(encoded);  // returns "Test string"
         * @memberOf Core.Base64
         * @param {String} a A Base64-encoded string.
         * @returns {String} The decoded string.
         * @since 1.4.1
         */
        decode:function(a){
            if(!a) {
                return "";
            }

            if(a.length % 4 == 1)
            {
                throw new Error("Invalid Base64 string: " + a);
            }

            return btou(_atob(a.replace(/[\-_]/g, function(m0){
                return m0 == '-' ? '+' : '/';
            })));
        },

        /**
         * Decode Base64-encoded binary data.
         * @name decodeBinary
         * @function
         * @example
         * var fileSys = Storage.FileSystem;
         * fileSys.readFileIn(Storage.FileSystem.Store.Local, "file.bin.b64", { },
         *   function(err, data) {
		 *     if (err) {
		 *         console.log("An error occurred while reading " + fileName + ": " + err);
		 *     } else {
		 *         var decoded = Core.Base64.decodeBinary(data);
		 *     }
		 * });
         * @memberOf Core.Base64
         * @param {String} a Base64-encoded binary data.
         * @returns {String} The decoded data.
         */
        // do not process unicode conversion for binary data.
        decodeBinary: function(a) {
            if(!a) {
                return "";
            }
            return _atob(a.replace(/[\-_]/g, function(m0){
                return m0 == '-' ? '+' : '/';
            }));
        }
    };
})();

var Cryption = {
    classname: 'Cryption',

    //TODO use option to add other type of encrypt, and add prefix to show what encrypt methods used for decrypt part.
    encrypt: function(data, option) {
        var result = (typeof data == 'string')? data: JSON.stringify(data);

        try {
            // binary to ascii
            result = Base64.toBase64(result);
        } catch(e) {
            return data;
        }

        return result;
    },

    //TODO use prefix to understand what encrypt used and do decrypt relatively.
    decrypt: function(data) {
        data = (typeof data == 'string')? data: JSON.stringify(data);
        var result = data;

        // ascii to binary
        var dustChar = String.fromCharCode(0x00);
        result = Base64.fromBase64(result);
        while(result.charAt(result.length-1) == dustChar) {
            result = result.substr(0, result.length-1);
        }


        return result;
    },

    _bitEncrypt: function(data) {
        var result = data.replace(/./mig, function(e) {
            var filter = 0xFF;
            if (e.charCodeAt(0) > 0xFF) {
                filter = 0xFFFF;
            }
            return String.fromCharCode((~(e.charCodeAt(0)) >>> 0) & filter);
        });
        return result;
    },

    _bitDecrypt: function(data) {
        // bit reverse.
        var result = '';
        for (var i = 0; i < data.length; i++) {
            var e = data.charAt(i);
            var filter = 0xFF;
            if (e.charCodeAt(0) > 0xFF) {
                filter = 0xFFFF;
                result += String.fromCharCode((~(e.charCodeAt(0) & 0xFF) >>> 0) & 0xFF);
                result += String.fromCharCode((~((e.charCodeAt(0) >>> 8) & 0xFF) >>> 8) & 0xFF);
            } else {
                result += String.fromCharCode((~(e.charCodeAt(0)) >>> 0) & filter);
            }
        }

        if (2 <= version) {
            result = Base64.btou(result);
        }
        return result;
    },

    _HASH: {
        1: [[10, 20], [100, 20]], // change char index [position, length] ,[position, length]...
        2: [[10, 20], [100, 20]]  // change char index [position, length] ,[position, length]...
    },

    _messUpEncrypt: function(data, version) {
        var result;
        var hash = this._HASH[version];
        if (!version || !hash) {
            return data;
        }

        if (2 <= version) {
            result = Base64.utob(result);
        }
        // change data
        for (var i = 0; i < hash.length; i++) {
            var h = hash[i];
            if (result.length - (h[0] + h[0] + h[1] + h[1]) <= 0) {
                continue;
            }
            var tmp = result;
            result = tmp.substr(0, h[0]);
            result += tmp.substr(tmp.length - (h[0] + h[1]), h[1]);
            result += tmp.substr(h[0] + h[1], tmp.length - (h[0] + h[1])*2);
            result += tmp.substr(h[0], h[1]);
            result += tmp.substr(tmp.length - (h[0]));
        }
        return "==" + version + "==" + result;
    },

    _messUpDecrypt: function(data, version) {
        if (data.match(/^==(\d+)==/)) {
            // parse data
            version = RegExp.$1;
            data = data.replace(/^==\d+==/m, '');
        }
        var hash = this._HASH[version];
        if (!version || !hash) {
            return data;
        }


        // change data
        for (var i = 0; i < hash.length; i++) {
            var h = hash[i];
            if (result.length - (h[0] + h[0] + h[1] + h[1]) <= 0) {
                continue;
            }
            var tmp = result;
            result = tmp.substr(0, h[0]);
            result += tmp.substr(tmp.length - (h[0] + h[1]), h[1]);
            result += tmp.substr(h[0] + h[1], tmp.length - (h[0] + h[1])*2);
            result += tmp.substr(h[0], h[1]);
            result += tmp.substr(tmp.length - (h[0]));
        }
    },

    _CRYPTO_WORD: 'transformers, more than meets the eye',

    makeHashByCardId: function(cardId) {
        var string = cardId + ".png";
        var str = sha1.hex_sha1(string + this._CRYPTO_WORD);
        return str.substring(0, 10);
    }
};

//if (module) module.exports = Cryption;