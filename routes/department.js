var express = require("express");
var router = express.Router();
var connection = require("./utils/database");
router.use(express.json());

// add department
router.post("/Add/dept", (req, res) => {
  try {
    const { dept_name } = req.body;
    console.log(dept_name)
    if (!dept_name) {
      throw new Error("Department name cannot be null");
    }
    const response = connection.query(
      "INSERT INTO department (dept_name) VALUES(?)",
      [dept_name],
      (err, results) => {
        err
          ? console.log("Error executing query:", err)
          : console.log("Inserted successfully") ;
      }
    );
    // console.log(dept_name);
    res.status(200).send(`the department ${dept_name} is added to Database.`);
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong")
  }
});

// get all the departments
router.get("/get/dept", (req, res) => {
  try {
    const result = connection.query(
      "SELECT * FROM department",
      (err, result) => {
        if (err) {
          return res.status(400).send("something went wrong! ");
        }
        if (result && result.length > 0) {
           return res.status(200).send({msg:"results found",cod:"success",result});
        }
        res.status(400).send(" error finding the data ");
      
   } );
  } catch (err) {
    console.log("error:");
  }
});

router.get('/dept/count/', (req,res) => {
  // const id=parseInt(req.params.id);
const {dept_name}=req.body;
  try{
     const response=connection.query("Select count(*) as dept_count from department where dept_name= ?",[dept_name],(err,result)=>{
      if(err) return res.status(400).send("...")
      if(result && result.length > 0)  return res.status(200).send(result);
    return res.status(500).send("internal server error")
     })
  }catch(err){
    console.log(err);

  }
   
});
 router.put("/update/dept/:id",(req,res)=>{
  try {
    const {
      dept_name
    }=req.body;

    const _id = req.params.id;
   
  console.log(_id);

    const sql = `
    UPDATE department
    SET dept_name = ?  WHERE id = ?`;
    console.log(sql);
    const resonse = connection.query(
      sql,
      [
        dept_name,
        _id
      ],
      (err, result) => {
        if (err) return console.log(err, "error while fetching the data");
        if (result && result.length > 0) console.log("no errors");
        return res.status(200).send("updated");
        res.status(400).send("failed to update");
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
 })

module.exports = router;
