const crypto = require('crypto');

class Encryption {

    secretKey = process.env.ENCRYPTION_SECRET_KEY;

    encrypt(data, secret=false) {
        if (!data) throw new Error('No data available to encrypt');
        if (!secret && !this.secretKey) throw new Error('Secret key not available')
        if (!secret) secret = this.secretKey;
        
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv);
        
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    decrypt(hash, secret=false){
        if (!hash) throw new Error('No data available to decrypt');
        if (!secret && !this.secretKey) throw new Error('Secret key not available')
        if(!secret) secret = this.secretKey;
        let textParts = hash.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret), iv);
        let decrypted = decipher.update(encryptedText);
    
        decrypted = Buffer.concat([decrypted, decipher.final()]);
    
        return decrypted.toString();;
    }

    createHash(text){
        if(!text) throw new Error('No text available to hash');
        return crypto.createHash('sha1').update(text).digest('hex');  
    }

}



module.exports = new Encryption();