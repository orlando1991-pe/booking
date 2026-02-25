
import mongoose from 'mongoose';import axios from 'axios';import dotenv from 'dotenv';dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
const Booking=mongoose.model('Booking',new mongoose.Schema({businessId:String,phone:String,date:Date,status:String}));
setInterval(async()=>{
 const list=await Booking.find({status:'active'});
 for(const b of list){
  await axios.post('https://graph.facebook.com/v17.0/'+process.env.WHATSAPP_PHONE_ID+'/messages',
 {messaging_product:'whatsapp',to:b.phone,type:'text',text:{body:'Recordatorio de cita'}},
 {headers:{Authorization:'Bearer '+process.env.WHATSAPP_TOKEN}});
 }
},300000);
