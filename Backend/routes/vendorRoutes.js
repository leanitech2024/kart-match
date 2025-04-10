import express from "express";
import { insertVendors } from '../controllers/vendorController.js'

const router = express.Router();

router.post("/vendors", insertVendors);

export default router;
