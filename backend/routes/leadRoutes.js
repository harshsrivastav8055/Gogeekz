// backend/routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check } = require('express-validator');
const {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  uploadDocument,
  toggleChecklistItem,
  getDashboardSummary,
  Register,
  Login,
  isAuthenticated,
  logout,
  forgotPassword
} = require('../controllers/leadController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/summary', getDashboardSummary);
router.get('/' ,getLeads);
router.get('/:id', getLead);
router.post('/',createLead);
router.put('/:id',updateLead);
router.delete('/:id' ,deleteLead);
router.post('/:id/upload', upload.single('document'), uploadDocument);
router.put('/:id/checklist/:itemIndex',toggleChecklistItem);
router.post("/register" , Register)
router.post("/login" , Login)
router.post('/logout', logout)


module.exports = router;
