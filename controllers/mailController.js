const express = require('express')
const app = express()
const port = 3000


const nodemailer = require("nodemailer");
const randomstring = require("randomstring")
const sendingMail = async (req, res, email, name, phone, message) => {
    console.log("----Email----", email, name, phone, message)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: 'ashusomu69@gmail.com',
            pass: 'qwso hqby uzsa inuq',
        },
        
    });
    console.log("----auth------",transporter)
    const mailOption = {
        from: "master",
        to: "ashutoshpattanayak444@gmail.com",
        subject: "Contact Form Submission",
        html: `<h2>You have a new contact form submission:</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>`,

    };
    console.log("Mailoptions", mailOption)
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log("-------------- error-------------", error)
            res.status(400).json({ message: error.message })
        } else {
            console.log("Email sent", info.response)
        }
    })
}
const sendMail = async(req,res) =>{
    try {
        const {name, email, phone, message} = req.body
        console.log("--------body---------", req.body)
        if(!name || !email || !phone ){
            console.log("----inside if----")
            return res.status(400).json({message: "All fields are required"})
        }
        await sendingMail(req, res, email, name, phone, message)
        return res.status(200).json({message: "Email sent successfully"})
        
    } catch (error) {
        console.log(error)   
        return res.status(500).json({ message: error.message });
    }

}


module.exports = {sendMail}