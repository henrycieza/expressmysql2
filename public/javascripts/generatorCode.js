function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const numGen = 10;
    for ( var i = 0; i < numGen; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.Length));
    }
    return result;
 }
 
 export default  makeid();