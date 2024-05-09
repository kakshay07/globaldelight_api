var express = require("express");
var router = express.Router();
var connection = require("./utils/database");
router.use(express.json());

// routes for adding the job to database

router.post("/Add/jobs", (req, res) => {
  try {
    const {
      department,
      position,
      experience,
      jobType,
      location,
      description,
      profileInformation,
    } = req.body;

    const profileInformation1 = JSON.stringify(profileInformation);
    console.log(profileInformation1, "thisss");
    const response = connection.query(
      "INSERT INTO job_openings(department, position, experience,jobType, location ,description,profileInformation) VALUES(?,?,?,?,?,?,?)",
      [
        department,
        position,
        experience,
        jobType,
        location,
        description,
        profileInformation1,
      ],
      (err, result) => {
        err
          ? console.log(err)
          : res.status(201).send("inserted to database successfully..");
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send("foreign key constraints failed || something went wrong");
  }
});

// routes for getting the All jobs
router.get("/get/jobs/", (req, res) => {
  try {
    connection.query("SELECT * FROM job_openings", (err, results) => {
      if (err) {
        console.error("Error fetching job openings:", err);
        return res.status(500).send("Internal server error");
      }

      // console.log(results,"-----------------------------------------------------------------------");

      if (results && results.length > 0) {
        let newResults = [];
        for (let data of results) {
          // console.log(data.profileInformation);
          if (data.profileInformation && data.profileInformation.length) {
            newResults.push({
              ...data,
              profileInformation: JSON.parse(data.profileInformation),
            });
          } else {
            newResults.push(data);
          }
        }
        return res.status(200).send({ data: newResults, success: true });
      }

      return res.status(400).send("No job openings found");
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).send("Internal server error");
  }
});

router.get("/getbyId/:id",(req,res)=>{
const Job_Id=req.params.id;
console.log(Job_Id);
  try{
    const response=connection.query('SELECT * FROM job_openings where id=?',[Job_Id],(err,result)=>{
      if(err) return res.status(400).send("error occured in sql query");
      if(result && result.length>0) {
         const newResults = [];
      for (let data of result) {
        // console.log(data.profileInformation);
        if (data.profileInformation && data.profileInformation.length) {
          newResults.push({
            ...data,
            profileInformation: JSON.parse(data.profileInformation),
          });
        } else {
          newResults.push(data);
        }
      }
      return res.status(200).send({ data:newResults});
    }
      return res.status(500).send("internal server error")
    })
  }
  catch(err)

{
  console.log(err);
}
})

router.put("/update/:id", (req, res) => {
  // const profileInformation=[];
  try {
    const {
      department,
      position,
      experience,
      jobType,
      location,
      description,
      profileInformation,
    } = req.body;
    const jobId = req.params.id;
    const profileInformation1 = JSON.stringify(profileInformation);
    console.log(profileInformation1);
    const sql = `
    UPDATE job_openings
    SET department = ?, position = ?,experience = ?,jobType = ?,location = ?, description = ?,profileInformation = ?  WHERE id = ?`;
    console.log(sql);
    const resonse = connection.query(
      sql,
      [
        department,
        position,
        experience,
        jobType,
        location,
        description,
        profileInformation1,
        jobId,
      ],
      (err, result) => {
        if (err) return console.log(err, "error while fetching the data");
        if (result && result.length > 0) console.log("no errors");
        return res.status(201).send(result);
        res.status(400).send("failed to update");
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
