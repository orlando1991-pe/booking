
import express from 'express';import dotenv from 'dotenv';dotenv.config();
import mongoose from 'mongoose';import Stripe from 'stripe';
import axios from 'axios';
await mongoose.connect(process.env.MONGO_URI);
const Booking=mongoose.model('Booking',new mongoose.Schema({businessId:String,phone:String,date:Date,status:String}));
const stripe=new Stripe(process.env.STRIPE_SECRET);
const app=express();app.use(express.json());app.use(express.urlencoded({extended:true}));
app.post('/booking',async(req,res)=>{
 await Booking.create({...req.body,status:'active'});
 await axios.post('https://graph.facebook.com/v17.0/'+process.env.WHATSAPP_PHONE_ID+'/messages',
 {messaging_product:'whatsapp',to:req.body.phone,type:'text',text:{body:'Reserva confirmada'}},
 {headers:{Authorization:'Bearer '+process.env.WHATSAPP_TOKEN}});
 res.json({ok:true});
});
app.listen(3000);
