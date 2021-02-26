const express = require ('express')
const People = require('../models/people')
const route=express.Router()

//I have checked all the Api's by using postman


//to get the form on client side
route.get('/api/people',(req,res,next)=>{
    return res.render('post',{title: 'list'})
})

//post request to fillup from
route.post('/api/people/',(req,res,next)=>{
    
    if(req.body.name && req.body.email && req.body.contact ){
        var userData={
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact

            
        }
        People.create(userData,(err,people)=>{
            if(err) return next(err)
            res.redirect('/')
        })

    }
    else{
        let err = new Error('Please enter all the details')
        err.status = 400
        return next(err)
    }    
    

    
})
route.get('/api/people/:id',(req,res)=>{
    People.findById(req.params.id, (err, doc)=>{
    
        if(!err){
            // res.send(doc)
            
        
        res.render("update", {
        
        viewTitle:"requested user",
        
        user:doc.toObject()
        
        }
        );
        
        }
        
        });
})
//to update the user
route.post('/api/people/:id',(req,res)=>{
    // console.log("this is before entering" + req.body._id)
    People.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err, doc)=>{
        
        if(!err){
      res.redirect('/')
            // res.render('post', {
        
            //     viewTitle:'Update user',
                
            //     user:doc.toObjec
                
            //     });
            // console.log(t)
        
        }
       
        

})
})



     
//get all the collection in database Peoples
route.get('/',(req,res,next)=>{
    People.find({}).lean().exec((err,user)=>{
        if(err) 
            return next(err);
        // res.send(user)
        res.render('index',{user})
    })

})

//to get the user with particular id
route.get('/api/people/get/:id', (req, res) => {
    // console.log(req.params.id)

    People.findById(req.params.id, (err, doc)=>{
    
    if(!err){
        // res.send(doc)
        
    
    res.render("specific", {
    
    viewTitle:"requested user",
    
    user:doc.toObject()
    
    }
    );
    
    }
    
    });
    
    });


    route.get('/api/people/delete/:id', (req, res)=>{

        People.findByIdAndRemove(req.params.id, (err, doc)=>{
        

        
        if(!err){
            res.redirect('/')
        
        }
        else{
        
         console.log('Error in employee delete:'+err);
        
         }
        
         });
        
        });


        


module.exports = route