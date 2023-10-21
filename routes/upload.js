const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const CsvData = require('../models/csvData')
const router = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('csv'), (req, res) => {
    const validData = [];
    const validationErrors = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => {
            if (!row.Series_reference) {
                validationErrors.push({ row, error: 'Series reference missing' });
            } else if (!row.Period) {
                validationErrors.push({ row, error: 'Period missing' });
            } else {
                validData.push(row);
            }
        })
        .on('end', () => {
            if (validationErrors.length > 0) {
                res.status(400).json({ errors: validationErrors });
            } else {
                CsvData.insertMany(validData)
                    .then(() => {
                        res.status(201).json({ message: 'Data uploaded successfully' });
                    })
                    .catch((err) => {
                        //res.status(500).json({ error: err.writeErrors[0].err.errmsg });
                        res.status(500).json({ error: err.message });
                    });

            }
        });
});

module.exports = router