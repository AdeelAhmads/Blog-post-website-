const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/myBlogDB", {useNewUrlParser: true});
app.use(express.static('public'));
app.set("view engine", "ejs");

const postSchema= {
    title:{
        type:String,
        require:[true,"Plese enter String"]
    },
    paragraph:{
        type:String,
        require:[true,"Plese enter String"]
    }
}
const title="You can’t get much done in life if you only work on the days when you feel good."
const Post = mongoose.model("Post", postSchema);
app.get('/',function(req,res){
    
    Post.find({}, function(err, posts){
        res.render('Home',{Title:title,Paragraph:posts});
      });
       
      
})
app.get("/About",function(req,res){
    res.render('About')
})
app.get("/contact",function(req,res){
    res.render('contact')
})
app.get("/compose",function(req,res){
    res.render('compose')
})
app.post("/compose",function(req,res){
    const post=new Post({
        title:req.body.title,
        paragraph:req.body.paragraph,
    })
      post.save(function(err){
        if(!err){
            res.redirect('/')
        }
      })
    res.redirect('/')
})
app.get('/post/:postId',function(req,res){
    const postId=req.params.postId;
    Post.findOne({_id:postId},function(err,post){
        res.render('post')
    })

})
app.listen(5000,function(){
    console.log('App is running on 5000')
})