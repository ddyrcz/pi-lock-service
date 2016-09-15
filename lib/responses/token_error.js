module.exports = function(res){
    res.statusCode = 401;
    res.json({valid:'False', message:"You are unauthorized!"});
}