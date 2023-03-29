const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    if (!name){
        return res.status(422).json({msg: " Nome é obrigatorio!"})
    }  
    if (!email){
        return res.status(422).json({msg: " Email é obrigatorio!"})
    }  
    if (!password){
        return res.status(422).json({msg: " Password é obrigatorio!"})
    }  
    if (password !== confirmpassword){
        return res.status(422).json({msg: " As senhas não conferem"})
    }  
    
    const userExists = await User.findOne({email: email});
    if (userExists){
        return res.status(422).json({msg: "Este email já está em uso"})  
    }
    // create password encryptedd
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)
    // create User
    const user = new User({
        name,
        email,
        password: passwordHash
    })
    try {
        await user.save()
        res.status(201).json({msg: 'Usuário criado com sucesso!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor, volte mais tarde!"}) 
    }


  });

  
module.exports = router;