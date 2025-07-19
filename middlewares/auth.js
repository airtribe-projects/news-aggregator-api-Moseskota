const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');


//authenticating the jwt token 

const authenticateToken = (req, res,next) =>{
    const authHeader = req.headers['authorization']; //collecting the authorization information from the header
    
    const token = authHeader && authHeader.split(' ')[1]; //extracting the token from the header 
    console.log('Extracted Token:', token);
    if(!token){
        return res.status(401).json({error: "wrong token , access denied"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(403).json({error: 'Invalid or expired token'});
    }
};

module.exports = authenticateToken;

