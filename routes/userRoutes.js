const express = require("express");
const userData = require("../modules/userSchema");
const Otp = require('../modules/otpSchema');  
const client = require('../config/twilio');
const router = express.Router();

module.exports = (io) => {

    router.get("/getUserById", async (req, res) => {
        try {
            const Id = req.query.Id;
            const result = await userData.findOne({ _id: Id });
            res.status(200).json({ user: result, success: true });
        } catch (error) {
            res.status(500).json({ success: false });
        }
    });

    router.get("/getUserByNumber", async (req, res) => {
        try {
            let mobileNumber = req.query.mobileNumber;
            // console.log("Received Mobile Number:", mobileNumber);
            
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
            if (!mobileNumber.startsWith("+")) {
                mobileNumber = "+91" + mobileNumber; 
            }
    
            // Delete any existing OTP for the same mobile number
            const existingOtps = await Otp.find({ phone: mobileNumber });
            if (existingOtps.length > 0) {
                // console.log(`Deleting ${existingOtps.length} existing OTP(s) for phone number:`, mobileNumber);
                await Otp.deleteMany({ phone: mobileNumber }); 
            }
    
            // Send OTP using Twilio
            await client.messages.create({
                body: `Your OTP is ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: mobileNumber
            });
    
            const newOtp = new Otp({
                phone: mobileNumber,
                otp: otp,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000) // OTP expires in 5 minutes
            });
            await newOtp.save();
    
            // Set mobile number in cookie
            res.cookie('mobileNumber', mobileNumber, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 5 * 60 * 1000 // Cookie expires in 5 minutes
            });
    
            io.emit('otpSent', { mobileNumber, otp });
    
            return res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    });
    
    router.get("/verifyOtp", async (req, res) => {
        try {
            const otp = req.query.otp;
    
            const mobileNumber = req.cookies.mobileNumber;  // cookie se mobile number retrive kar raha hai...
            console.log("Mobile Number:", mobileNumber);
    
            if (!mobileNumber) {
                return res.status(400).json({ success: false, message: 'Mobile number not found' });
            }
    
            // Find OTP for the given mobile number
            const existingOtp = await Otp.findOne({ phone: mobileNumber });
            console.log("Existing OTP:", existingOtp);
    
            if (!existingOtp) {
                return res.status(400).json({ success: false, message: 'OTP not found' });
            }
    
            console.log("Current Time:", new Date());
            console.log("Expires At:", existingOtp.expiresAt);
            
            if (existingOtp.expiresAt < Date.now()) {
                return res.status(400).json({ success: false, message: 'OTP has expired' });
            }
    
            if (existingOtp.otp !== otp) {
                return res.status(400).json({ success: false, message: 'Invalid OTP' });
            }
    
            await Otp.findByIdAndDelete(existingOtp._id);
            // res.clearCookie('mobileNumber');
    
            return res.status(200).json({ success: true, message: 'OTP verified successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    });
           

    router.get('/getAllUser', async (req, res) => {
        try {
            const result = await userData.find({});
            res.status(200).json({ user: result, success: true });
        } catch (error) {
            res.status(500).json({ message: error.message, success: false });
        }
    });

    router.post("/addUser", async (req, res) => {
        try {
            const user = await userData.create({
                name: req.body.name,
                mobileNumber: req.body.mobileNumber,
                address: req.body.address,
                nearByLocation: req.body.nearByLocation,
                city: req.body.city,
                walletAmount: req.body.walletAmount,
                referralCode: req.body.referralCode,
                pincode: req.body.pincode,
            });
            res.status(200).json({ user: user, success: true });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    });

    router.put("/updateUser", async (req, res) => {
        const id = req.query.id;
        try {
            await userData.updateOne({ _id: id }, {
                name: req.body.name,
                mobileNumber: req.body.mobileNumber,
                address: req.body.address,
                nearByLocation: req.body.nearByLocation,
                city: req.body.city,
                pincode: req.body.pincode,
            });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    router.delete("/deleteUser", async (req, res) => {
        try {
            const userId = req.query.userId;
            await userData.deleteOne({ _id: userId });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    return router;
};
