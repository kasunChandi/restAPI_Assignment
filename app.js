const express = require('express');
const dateType  = require('get-date')

const app =express();
const port = 3000;

app.use(express.json());

let logDatails =[];
app.use((req,res, next) =>{


logDatails.push("log mag " +dateType()+ "Request Type "+req.method);
console.log(logDatails);
    next();
    });





let studentDetails =[
    {id:1 ,name:'kasun', subject:'maths'},
    {id:2 ,name:'Dasun', subject:'comm'},
    {id:3 ,name:'Sadun', subject:'bio'}
];

app.get('/', (req,res)=> {

    res.send("Student Detals...")

});

app.get('/api/students',(req,res)=>{  

    res.send(studentDetails);

});

app.get('/api/students/:stuId',(req,res)=>{
    let stuId = req.params.stuId;
    let student = studentDetails.find(h=> h.id == stuId);
  
    if(!student){
  
      res.status(404).send("This student id is invalide!");
    }
  
  res.send(student);

});


app.post('/api/students', (req , res) =>{
    if(!req.body.student)
{   
 return res.status(400).send("Error of Student name ");

}
if(!req.body.sSubject)
{   
 return res.status(400).send("Error of Student subject ");

}

let newStudent = {
    id:studentDetails.length+1,
    name: req.body.student,
    subject: req.body.sSubject
}
studentDetails.push(newStudent);
console.log(studentDetails);
res.send(newStudent);



});

app.put('/api/students/:stuId',(req,res)=>{

    let stuId = req.params.stuId;
    let studentId = studentDetails.find(h=> h.id == stuId);

    if(!studentId){
  
        res.status(404).send("This student id is invalide!");
      }

    if(!req.body.student)
    {   
     return res.status(400).send("Error of Student name ");
    
    }
    if(!req.body.sSubject)
    {   
     return res.status(400).send("Error of Student subject ");
    
    }
    studentId.name = parseInt(req.body.student);
    studentId.subject =req.body.sSubject;
    console.log(studentDetails);
    res.send(studentId);
});


app.delete('/api/students/:stuId',(req,res)=>{ 

    let stuId = req.params.stuId;
      let studentId = studentDetails.find(h=> h.id == stuId);
      if(!studentId){
  
        return res.status(404).send("his student id is invalide! ");
        }
  
  let studentIndex = studentDetails.indexOf(studentId);
  
  studentDetails.splice(studentIndex, 1);
  console.log(studentDetails);
  res.send(studentId);

});



app.listen(port, function(){

    console.log("lissing on port " +port);
});