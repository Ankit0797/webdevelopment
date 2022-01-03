const express = require("express");
const path = require("path");
const app = express();
const multer = require('multer')
//  const uploadva = multer({ dest: './merbackend/uploads' })
const hbs = require("hbs")

require("./db/conn");
const Login = require("./models/Login");
const Employees = require("./models/emp");
const Payments = require("./models/paydet");
const Registers = require("./models/regis");
const Projects = require("./models/prodet");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
//  path.join(__dirname, "../templates/uploads");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
//  app.set("uploads", uploadva);
hbs.registerPartials(partials_path);

// const Storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         let ext = path.extname(file.originalname)
//         cb(null, Date.now() + ext)
//     }
// });

//multer storage ke liye 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../templates/uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

var upload = multer({ storage: storage });


//home page route 
app.get("/home", (req, res) => {
    res.render("home")
})

//client side route ke liye
app.get("/client", (req, res) => {
    res.render("client")
})

app.get("/projectlist", (req, res) => {
    res.render("projectlist")
})
//entry 
app.get("/entry", (req, res) => {
    res.render("entry")
})

//Login
app.get("/Login", (req, res) => {
    res.render("Login")
});

app.post("/Login", async (req, res) => {
    try {
        // const tr = req.body.Password
        // const registerEmployee = new Login({
        EmpID = req.body.EmpID;
        Password = req.body.Password;
        console.log(req.body);
        const user = await Registers.findOne({ EmpID: EmpID });
        console.log(user);
        if (user.EmpID === EmpID) {
            res.status(201).render("entry");
        } else {
            res.send("invall")
        }

        // })

        // const registered = await registerEmployee.save();
        // res.status(201).send(registered)
    } catch (error) {
        res.status(400).send(error)
    }
});

//register ke liye
app.get("/regis", (req, res) => {
    res.render("regis")
});

app.post("/regis", async (req, res) => {
    try {
        console.log(req.body);
        const obj = JSON.parse(JSON.stringify(req.body));
        console.log(obj)
        const jan = req.body.Password;
        const ban = req.body.CPassword;
        if (jan === ban) {
            const BhuEmployees = new Registers({
                EmpID: req.body.EmpID,
                Name: req.body.Name,
                Password: jan,
                Cpassword: ban,
            })
            const registered = await BhuEmployees.save();
            res.status(201).render("Login")
        } else {
            res.send("inval")
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

app.get("/emp", (req, res) => {
    res.render("emp")
});

//employee

app.post("/emp", async (req, res) => {
    try {
        console.log(req.body);
        const obj = JSON.parse(JSON.stringify(req.body));
        console.log(obj)
        const Employee = new Employees({
            EmpID: req.body.EmpID,

            Name: req.body.Name,
            Joining: req.body.Joining,
            Grade: req.body.Grade,
            Skill: req.body.Skill,

            //  mont: req.body.mont,
            mytext: req.body.mytext
        })

        const Emped = await Employee.save();
        console.log(Emped);
        // res.status(201).send("paydet");
        res.status(201).render("entry")



    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
});
//Project wala database asynchronous
app.get("/prodet", (req, res) => {
    res.render("prodet")
});

app.post("/prodet", async (req, res) => {
    try {
        console.log(req.body);
        const Project = new Projects({
            Pstart: req.body.Pstart,

            Estart: req.body.Estart,
            Ponum: req.body.Ponum,
            Podate: req.body.Podate,
            Sow: req.body.Sow,
            Poterms: req.body.Poterms,
            Compliance: req.body.Compliance,
            Paycycle: req.body.Paycycle,
            Rate: req.body.Rate,
            EmpID: req.body.EmpID,
            Duration: req.body.Duration,
        })

        const Proed = await Project.save();
        console.log(Proed);

        res.status(201).render("entry")

    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
});

// app.get("/prodet", (req, res, next) => {

//     Projects.find((err, docs) => {
//         if (!err) {
//             res.render('prodet', {
//                 doc: docs
//             });
//         }
//         else {
//             console.log("errroe uuu" + err)
//         }
//     })
// });


//Payment asynchronous 

     // Payments.find((err,docs)=>{
    //     if(!err){
    //         res.render('paydet',{
    //             doc:docs
    //         });

    //     }
    //     else{
    //         console.log("errroe uuu"+err)
    //     }

    // })
// });


// app.get("/john", (req, res, next) => {

//     Payments.find((err, docs) => {
//         if (!err) {
//             res.render('john', {

//                 doc: docs
//             });
//         }
//         else {
//             console.log("errroe uuu" + err)
//         }
//     })
// });

// app.get("/john", (req, res, next) => {

//     Projects.find((err, docs) => {
//         if (!err) {
//             res.render('john', {

//                 doc: docs
//             });
//         }
//         else {
//             console.log("errroe uuu" + err)
//         }
//     })
// });


app.get("/paydet", (req, res, next) => {

    Projects.find((err, docs) => {
        if (!err) {
            res.render('paydet', {

                doc: docs
            });
        }
        else {
            console.log("errroe uuu" + err)
        }
    })
});


// Step 8 - the POST handler for processing the uploaded file

app.post("/paydet", upload.single('Compliance'), async (req, res) => {
    try {
        console.log(req.body);

        const obj = JSON.parse(JSON.stringify(req.body));
        console.log(obj)
        const Payment = new Payments({
            ProDura: req.body.ProDura,
            PoDe: req.body.PoDe,
            ComplianceDocuments: {
                data: req.file.filename,
                contentType: 'image/png/pdf/excel'
            },
            choose: req.body.choose,
            RateCli: req.body.RateCli,
            ProSel: req.body.ProSel,
            BiDa: req.body.BiDa,
            BiCy: req.body.BiCy,
            PyCy: req.body.PyCy,
            PySt: req.body.PySt,
        })

        const Payed = await Payment.save();
        console.log(Payed);

        res.status(201).send("entry")

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
