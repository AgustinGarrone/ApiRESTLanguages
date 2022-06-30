import { getConnection } from "../database/database.js"
import { validationResult } from "express-validator/src/validation-result.js";


export const getLanguages=async (req,res)=>{
    try {
        const connection=await getConnection();
        const result= await connection.query("SELECT * FROM language");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getLanguage=async (req,res)=>{
    try {
        const {id}=req.params;
        const connection=await getConnection();
        const result= await connection.query("SELECT * FROM language WHERE id=?",id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


export const addLanguages= async(req,res)=> {
    try {
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()});
        }
        const {name,programmers} =req.body;
        if (name===undefined || programmers===undefined) {
            res.status(400).json({message:"Bad request"});
        }
        const language={name,programmers};
        const connection=await getConnection();
        const result=await connection.query("INSERT INTO language SET ?",language);
        res.json("language added");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const deleteLanguage=async (req,res)=>{
    try {
        const {id}=req.params;
        const connection=await getConnection();
        const result= await connection.query("DELETE FROM language WHERE id=?",id);
        if(result.affectedRows==0) {
            throw new Error("Language not exist");
        }
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const updateLanguage =async (req,res)=>{
    try {
        const {id}=req.params;
        const {name,programmers}=req.body;
        if (id===undefined|| name===undefined || programmers===undefined) {
            res.status(400).json({message:"Bad request.Please fill all fields."});
        }
        const language={id,name,programmers};
        const connection=await getConnection();
        const result= await connection.query("UPDATE language SET ? WHERE id=?",[language,id]);
        res.json("Language edited.");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}