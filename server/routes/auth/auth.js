const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const models = require('../../models');
const bcrypt = require('bcryptjs')

router.post('/signin', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.status(500).send(err);
        if(!user) return res.status(400).json({ message: info });
            const token = jwt.sign({ user }, 'no_shoes_allowed');
        return res.json({ user, token, message: info})
    }) (req, res)
})

router.post('/signup', function(req, res, next) {
    let post = {
        lastname: req.body.nume,
        firstname: req.body.prenume,
        phonenumber: req.body.numarTelefon,
        password: bcrypt.hashSync(req.body.parola, 5),
        email: req.body.email,
        volunteering_county: req.body.judetul,
        volunteering_center: req.body.centrul,
        contract_number: req.body.contractului,
        signing_date: req.body.dataSemnarii,
        date_joined: 1,
        access_level: 0,
        status: 1
    };
    models
        .Users
        .create(post)
        .then(user =>
            res.status(200).json({ flash: "User signed up"})
        )
        .catch(err => res.status(500).json({ flash: err.message }))
})


// router.put('/access/:id', (req,res) => {
//     const userId = req.params.id;
//     models  
//        .Users
//        .findByPk(userId)
//        .then(user => res.json(user))
//        .update(
//          user.access_level === 0 ? {access_level: 1} :
//         {access_level: 0}
//        )
//        .then(() => console.log("LAsagna"));

// })


router.put('/access/:level/:id', async function (req, res) {
    let updatedUser = await models.Users.update(
            { access_level: req.params.level }
            ,{
                where: {
                  id: req.params.id
                }
              }
           )
            res.send(updatedUser)
})

router.put('/status/:level/:id', async function (req, res) {
     let updatedStatus = await models.Users.update(
         { status: req.params.level} 
         ,{
             where: {
                 id: req.params.id
             }
         }
     )
           res.send(updatedStatus)
})

router.get('/users', (req,res) => 
   models
   .Users
   .findAll()
   .then(users => res.json(users))
)

router.get('/users/:id', (req,res) =>
    models
    .Users
    .findByPk(req.params.id)
    .then(usersid => res.json(usersid))
 )

 router.get('/completedCourses/:id', (req,res) =>
    models
    .completedCourses
    .findByPk(req.params.id)
    .then(completedCoursesid => res.json(completedCoursesid))
 )

router.post('/completedCourses/:id', (req,res) => {
    let completedCourse = {
        course_id: req.body.id_curs,
        user_id: req.body.id_utilizator
    };
    models
        .completedCourses
        .create(completedCourse)
        .then(cc =>
            res.status(200).json({ flash: `Course of id ${req.body.id_curs} was completed by userId ${req.body.id_utilizator}`})
        )
        .catch(err => res.status(500).json({ flash: err.message }))
} )

    




module.exports = router