var fs = require('fs');

function doFileStuff(inFile, outFile){
fs.readFile(inFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

    var matches = data.match(/<table width='100%' cellpadding='10' border='1'>[\s\S]+?<\/table>/g);
    var theMostLikelyContent = matches.sort(function (a, b) { return b.length - a.length; })[0];
    
    theMostLikelyContent = theMostLikelyContent.replace(/<br>/g, "");
    theMostLikelyContent = theMostLikelyContent.replace(/&lt;/g, "<");
    theMostLikelyContent = theMostLikelyContent.replace(/&gt;/g, ">");
    theMostLikelyContent = theMostLikelyContent.replace(/border='1'/g, "border='0");
    theMostLikelyContent = theMostLikelyContent.replace(/<(?:a[\s]?href=["'])(.*?)["']>\1/g, "link"); 
    console.log(theMostLikelyContent);

    fs.writeFile(outFile, '<html><head><title>Stuff</title></head><body>'+theMostLikelyContent+'</body></html>', function (err) {
    if (err) return console.log(err);
    });
    
});
}

doFileStuff('deal1.txt', 'me.html');
doFileStuff('deal2.txt', 'me2.html');
doFileStuff('deal3.txt', 'me3.html');