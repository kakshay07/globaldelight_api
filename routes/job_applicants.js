var express = require("express");
var router = express.Router();
var cors=require('cors')
var connection = require("./utils/database");
router.use(express.json());



// routes for adding applicant
router.post("/Add/applicant/", (req, res) => {
//  const job_id=1;
  try {
    // console.log(JSON.parse(req.body));
    const { name, email, phone, message, resume,job_id } = req.body;
    
    console.log(resume);
    console.log(req.body);
    const res_on = connection.query(
      "INSERT INTO applicants(name,email,phone,message,job_id,resume) VALUES(?,?,?,?,?,?)",
      [name, email, phone, message, job_id, resume],
      (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(500).send("internal server error");
        } else {
          res.status(200).send("applicant inserted successfully");
        }
      }
    );
  } catch (err) { 
    // console.log(err);
    res.status(400).send(" foreign key constraints failed. ");
  }
});

// routes for getting the applicants
router.get("/get/applicants", (req, res) => {
  try {
    const result = connection.query(
      "SELECT * FROM applicants",
      (err, result) => {
        if (err && err.length) return res.status(400).send("error retreving data");
        if (result && result.length > 0) console.log(result);return res.status(200).send({data : result , success : true});
        res.status(400).send("no applicants found");
      }
    );
  } catch (err) {
    console.error("error retriving the applicants");
  }
});

module.exports = router;
