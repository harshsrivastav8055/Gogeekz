// backend/controllers/leadController.js
const Lead = require('../models/Lead');
const User = require("../models/userSchema.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

exports.Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // basic validation
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exist.",
                success: false
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorect email or password",
                success: false
            });
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
exports.logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "user logged out successfully.",
        success: true
    })
}
const checklistItems = {
  'Express Entry': ["CRS Score", "NOC Code", "Invitation Date"],
  'Study Permit': ['Institution Name', 'Program Duration', 'Tuition Fee (CAD)'],
  'Work Permit': ['Job Offer Details', 'LMIA Number', 'Employer Name'],
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLead = async (req, res) => {
  const { firstName, lastName, email, phone, category, customFields } = req.body;
  const checklist = checklistItems[category].map((item) => ({ item, completed: false }));

  const lead = new Lead({
    firstName,
    lastName,
    email,
    phone,
    category,
    customFields,
    checklist,
  });

  try {
    const newLead = await lead.save();
    res.status(201).json("user created successfull");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    lead.documents.push(req.file.path);
    await lead.save();
    res.json({ message: 'Document uploaded', path: req.file.path });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleChecklistItem = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    const index = parseInt(req.params.itemIndex);
    if (isNaN(index) || index < 0) {
      return res.status(400).json({ message: 'Invalid item index' });
    }

    // Extend checklist if index is out of bounds
    if (index >= lead.checklist.length) {
      const itemsToAdd = index - lead.checklist.length + 1;
      for (let i = 0; i < itemsToAdd; i++) {
        lead.checklist.push({ completed: false });
      }
    }

    // Ensure consistent object format
    if (typeof lead.checklist[index] === 'boolean') {
      lead.checklist[index] = { completed: lead.checklist[index] };
    }

    // Toggle completion status
    lead.checklist[index].completed = !lead.checklist[index].completed;
    
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getDashboardSummary = async (req, res) => {
  try {
    const leads = await Lead.find();

    const summary = {
      'Express Entry': { count: 0, totalCompletion: 0 },
      'Study Permit': { count: 0, totalCompletion: 0 },
      'Work Permit': { count: 0, totalCompletion: 0 },
    };

    leads.forEach(lead => {
      const category = lead.category;
      if (summary[category]) {
        summary[category].count++;

        const completedCount = lead.checklist.filter(item => item.completed).length;
        const totalItems = lead.checklist.length;
        const completionPercent = totalItems ? (completedCount / totalItems) * 100 : 0;

        summary[category].totalCompletion += completionPercent;
      }
    });

    for (const category in summary) {
      if (summary[category].count > 0) {
        summary[category].averageCompletion = (summary[category].totalCompletion / summary[category].count).toFixed(2);
      } else {
        summary[category].averageCompletion = '0.00';
      }
      delete summary[category].totalCompletion;
    }

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.isAuthenticated = async (req,res,next) => {
  try {
      const token = req.cookies.token; 
      if(!token){
          return res.status(401).json({
              message:"User not authenticated.",
              success:false
          })
      }
      const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decode.userId;
      next();
  } catch (error) {
      console.log(error);
  }
}
