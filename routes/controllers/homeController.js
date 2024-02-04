const homeController={
    renderHomePage: async(req,res)=>{
        try{
            res.render('canteen')
        }
        catch{
            res.error();
        }
    }
};

module.exports=homeController;