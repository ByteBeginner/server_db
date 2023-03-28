const mongoose = require('mongoose');

async function main() {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect('mongodb://127.0.0.1:27017/app_db', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
        .catch(err => console.error('Erro ao conectar com o MongoDB:', err));
    } catch (error) {
        console.log('Erro: ${error}');
    }
}
module.exports = main;