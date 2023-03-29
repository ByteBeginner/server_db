const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const router = express.Router();

router.post("/",async (req, res) => {
    const {email, password} = req.body;
    if (!email){
        return res.status(422).json({msg: " Email é obrigatorio!"})
    }  
    if (!password){
        return res.status(422).json({msg: " Password é obrigatorio!"})
    }    

    const user = await User.findOne({email: email});
    if (!user){
        return res.status(404).json({msg: "Usuário não encontrado!"})  
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword){
        return res.status(422).json({msg: "Senha inválida!"})  
    }
    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
        },
        secret,
        )
      res.status(200).json({msg: "Autenticação realizada com sucesso! ", token})  
    } catch (error) {
        res.status(500)
    }
});

router.get('/user/:id', async (req, res) => {
    const id = req.params.id 

    const user = await User.findById(id, "-password")
    if (!user)  {
        return res.status(404).json({msg: "Usuário não encontrado"})
    }

    res.status(200).json({ user });
  });

  

module.exports = router;