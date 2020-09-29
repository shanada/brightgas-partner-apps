const CryptoJS = require("crypto-js")

/**
 * @let integer Return encrypt method or Cipher method number. (128, 192, 256)
 */
function encryptMethodLengthJS() {
    let encryptMethod = encryptMethodJS();
    // get only number from string.
    // @link https://stackoverflow.com/a/10003709/128761 Reference.
    let aesNumber = encryptMethod.match(/\d+/)[0];
    return parseInt(aesNumber);
}// encryptMethodLength


/**
 * @let integer Return cipher method divide by 8. example: AES number 256 will be 256/8 = 32.
 */
function encryptKeySizeJS() {
    let aesNumber = encryptMethodLengthJS();
    return parseInt(aesNumber / 8);
}// encryptKeySize


/**
 * @link http://php.net/manual/en/function.openssl-get-cipher-methods.php Refer to available methods in PHP if we are working between JS & PHP encryption.
 * @let string Cipher method. 
 *              Recommended AES-128-CBC, AES-192-CBC, AES-256-CBC 
 *              due to there is no `openssl_cipher_iv_length()` function in JavaScript 
 *              and all of these methods are known as 16 in iv_length.
 */
function encryptMethodJS() {
    return 'AES-256-CBC';
}// encryptMethod

async function decrypt(encryptedString, key) {
    let json = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString)));
    let salt = CryptoJS.enc.Hex.parse(json.salt);
    let iv = CryptoJS.enc.Hex.parse(json.iv);
    let encrypted = json.ciphertext;// no need to base64 decode.
    let iterations = parseInt(json.iterations);
    if (iterations <= 0) {
        iterations = 999;
    }
    let encryptMethodLength = await (encryptMethodLengthJS() / 4);// example: AES number is 256 / 4 = 64
    let hashKey = CryptoJS.PBKDF2(key, salt, { 'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength / 8), 'iterations': iterations });
    let decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, { 'mode': CryptoJS.mode.CBC, 'iv': iv });
    let result = decrypted.toString(CryptoJS.enc.Utf8)
    return result
}// decrypt


/**
 * Encrypt string.
 * 
 * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
 * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs Crypto JS base64 encode/decode reference.
 * @param string string The original string to be encrypt.
 * @param string key The key.
 * @return string Return encrypted string.
 */

async function encrypt(string, key) {
    let iv = CryptoJS.lib.WordArray.random(16);// the reason to be 16, please read on `encryptMethod` property.
    let salt = CryptoJS.lib.WordArray.random(256);
    let iterations = 999;
    let encryptMethodLength = (encryptMethodLengthJS() / 4);// example: AES number is 256 / 4 = 64
    let hashKey = CryptoJS.PBKDF2(key, salt, { 'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength / 8), 'iterations': iterations });
    let encrypted = CryptoJS.AES.encrypt(string, hashKey, { 'mode': CryptoJS.mode.CBC, 'iv': iv });
    let encryptedString = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    let output = {
        'ciphertext': encryptedString,
        'iv': CryptoJS.enc.Hex.stringify(iv),
        'salt': CryptoJS.enc.Hex.stringify(salt),
        'iterations': iterations
    };
    let result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(output)));
    return result
}

export { decrypt, encrypt }

