const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
bitcoin.creatteNewBlock(4321, 'JFDK334JK254H23', 'HJ5K445JKL2JH45');
bitcoin.creatteNewBlock(63, 'HJ43LK26GH43BTL3', 'BFNM4LF34KNB3NM4');
bitcoin.creatteNewBlock(652754, '8TY76G5Y7VU45VB', 'C98VB7N67V8CVBN');

console.log(bitcoin);