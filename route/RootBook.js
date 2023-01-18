const router=require('express').Router()
const bcrypt=require('bcryptjs')
const Book=require('../entity/Book')
const jwt=require('jsonwebtoken')
router.get('/list',async(req,res)=>{
    const books=await Book.find()
    res.json(books)
    
})
router.get('/list/:id',async(req,res)=>{
    const book=await Book.find({_id:req.params.id})
    res.json(book)
})


router.post('/add-book',async(req,res)=>{
const existBook=await Book.findOne({title:req.body.title})
if(existBook){
    res.status(501).end(`Book ${existBook.title} has Already registered`);
}

const salt=await bcrypt.genSaltSync(10)
const hashedISBN=await bcrypt.hashSync(req.body.ISBN,salt)
    const book=await Book({
        title:req.body.title,
        publish_yr:req.body.publish_yr,
        publisher:req.body.publisher,
        ISBN:hashedISBN

    })
    const saved=await book.save()
    res.send({title:book.title})

   

})

router.post('/list/isbn/',async(req,res)=>{
    const book=await Book.findOne({publish_yr:req.body.publish_yr})
        const validBook=await bcrypt.compare(req.body.ISBN,book.ISBN)
    if(validBook)  return res.status(404).send("Invalid book research")
    const token=jwt.sign({_id:book._id},'secrtfdf')
    res.header('auth-token',token).send(token)
    res.send("Book found yet")

})



router.get('/edit/publisher/:id',async(req,res)=>{
    const publisher=await Book.findById({_id:req.params.id}).populate('publisher', 'name -_id')
    .select('title publisher')
    res.json(publisher)
})


router.put('/edit/:id',async(req,res)=>{
    const book=await Book.findByIdAndUpdate({_id:req.params.id},{$set:{
        title:req.body.title,
        publish_yr:req.body.publish_yr,
        ISBN:req.body.ISBN

    }})
    res.json(book)
})

module.exports=router