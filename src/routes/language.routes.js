import { Router } from "express";
import { addLanguages, deleteLanguage, getLanguage, getLanguages, updateLanguage } from "../controllers/language.controller.js";
import { body } from "express-validator";


const router=Router();

router.get("/",getLanguages);

router.get("/:id",getLanguage);

router.post("/",[
    body("name","wrong name format").trim().isLength({min:3})
],addLanguages);

router.delete("/:id",deleteLanguage);

router.put("/:id",[
    body("name","wrong name format").trim().isLength({min:3})
],updateLanguage);

export default router;