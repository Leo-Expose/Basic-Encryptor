class Random {
    constructor() {
        this._seed = Math.floor(Math.random() * 1000000000);
    }

    randint(a, b) {
        this._seed = (this._seed * 69420 + 123123123) % 420420420;
        return a + this._seed % (b - a + 1);
    }
}

function generateKey() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    const random = new Random();
    for (let i = 0; i < 7; i++) {
        key += chars[random.randint(0, chars.length - 1)];
    }
    return key;
}

function encryptMessage(message, key) {
    return Array.from(message).map((char, i) => String.fromCharCode(char.charCodeAt(0) + key.charCodeAt(i % key.length))).join('');
}

function decryptMessage(encryptedMessage, key) {
    return Array.from(encryptedMessage).map((char, i) => String.fromCharCode(char.charCodeAt(0) - key.charCodeAt(i % key.length))).join('');
}

const fixedKey = generateKey();

function encrypt() {
    const message = document.getElementById('message').value;
    if (!message) {
        alert('Please enter a message to encrypt.');
        return;
    }
    const encryptedMsg = encryptMessage(message, fixedKey);
    document.getElementById('encryptedMessage').value = encryptedMsg;
    document.getElementById('key').value = fixedKey;
    localStorage.setItem('lastEncryptedMessage', encryptedMsg);
    localStorage.setItem('lastKey', fixedKey);
}

function decrypt() {
    const encryptedMessage = document.getElementById('encryptedMessage').value;
    const key = document.getElementById('key').value;
    if (!encryptedMessage || !key) {
        alert('Please enter both the encrypted message and the key to decrypt.');
        return;
    }
    const decryptedMsg = decryptMessage(encryptedMessage, key);
    document.getElementById('decryptedMessage').value = decryptedMsg;
    localStorage.setItem('lastDecryptedMessage', decryptedMsg);
}

function copyDailyKey() {
    navigator.clipboard.writeText(fixedKey).then(() => {
        alert("Today's key has been copied to clipboard!");
    });
}

function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId).value;
    navigator.clipboard.writeText(copyText).then(() => {
        alert('Text copied to clipboard!');
    });
}

function clearField(elementId) {
    document.getElementById(elementId).value = '';
}

function toggleMode() {
    const mode = document.getElementById('mode').value;
    if (mode === 'encrypt') {
        document.getElementById('encrypt-section').style.display = 'block';
        document.getElementById('decrypt-section').style.display = 'none';
        document.getElementById('decrypted-message-section').style.display = 'none';
    } else {
        document.getElementById('encrypt-section').style.display = 'none';
        document.getElementById('decrypt-section').style.display = 'block';
        document.getElementById('decrypted-message-section').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    toggleMode();
    document.getElementById('encryptedMessage').value = localStorage.getItem('lastEncryptedMessage') || '';
    document.getElementById('key').value = localStorage.getItem('lastKey') || '';
    document.getElementById('decryptedMessage').value = localStorage.getItem('lastDecryptedMessage') || '';
});
