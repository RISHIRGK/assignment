const express=require("express")
const {Employee,Contacts}=require('./models/models')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false})) 
app.get("/employees",async(req,res)=>{
    const employees=await Employee.findAll({include:{model:Contacts,as:"contacts",attributes:{exclude:["id","createdAt","updatedAt","employeeId"]}},attributes:{exclude:["createdAt","updatedAt"]}})
    res.status(200).send(employees)
})
app.get("/employee/:id",async(req,res)=>{
    const employee=await Employee.findByPk(req.params.id,{include:{model:Contacts,as:"contacts",attributes:{exclude:["id","createdAt","updatedAt","employeeId"]}},attributes:{exclude:["createdAt","updatedAt"]}})
    if (!employee) {
        return res.status(404).send("Employee not found")
    }
    res.status(200).send(employee) 
})

app.get("/employees/:page",async(req,res)=>{
    const {page}=req.params
    let limit=5

    let offset=((page>1?page:1)-1)*limit
    const employees=await Employee.findAll({include:{model:Contacts,as:"contacts",attributes:{exclude:["id","createdAt","updatedAt","employeeId"]}},limit,offset,attributes:{exclude:["createdAt","updatedAt"]}})
    res.status(200).send(employees)
    

})
app.post("/employee",async(req,res)=>{
    try{
    const {name,job_title,phone_number,email,address,city,state,primary_name,primary_phone_number,secondary_name,secondary_phone_number,primary_relationship,secondary_relationship}=req.body
    const employee=await Employee.create({name,job_title,phone_number,email,address,city,state})
    const contact=await Contacts.create({primary_name,primary_phone_number,primary_relationship,secondary_name,secondary_phone_number,secondary_relationship})
    await employee.setContacts(contact)

    res.status(201).send(employee)
    }
    catch(e){
        res.status(400).send(e)
    }
}
)

app.patch("/contact/:id",async(req,res)=>{
    const contact=await Contacts.findByPk(req.params.id)
    if (!contact) {
        return res.status(404).send("employee doesnot exist ")
    }
    const {primary_name,primary_phone_number,secondary_name,secondary_phone_number,primary_relationship,secondary_relationship}=req.body
    await contact.update({primary_name,primary_phone_number,secondary_name,secondary_phone_number,primary_relationship,secondary_relationship})
    res.status(200).send("Contact updated successfully")
})



app.patch("/employee/:id",async(req,res)=>{
    const employee=await Employee.findByPk(req.params.id)
    if (!employee) {
        return res.status(404).send("Employee not found")
    }
    const {name,job_title,phone_number,email,address,city,state}=req.body
    await employee.update({name,job_title,phone_number,email,address,city,state})
    res.status(200).send("employee updated successfully ")
})

app.delete("/employee/:id",async(req,res)=>{
    const employee=await Employee.findByPk(req.params.id)
    if (!employee) {
        return res.status(404).send("Employee not found")
    }
    await employee.destroy()
    res.status(204).send("Employee deleted successfully")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})