
import mongoose from 'mongoose';
await mongoose.connect(process.env.MONGO_URI);
const Biz = mongoose.model('Business', new mongoose.Schema({name:String,phone:String}));
await Biz.create({name:'Demo Peluquería',phone:'+34111111111'});
console.log('Seed done');process.exit();
