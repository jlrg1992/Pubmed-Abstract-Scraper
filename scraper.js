var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


var bio = [];
var bioData = [];
var terms = ["university","stress",];
var resultNumber = "100";
var maxDate = 23;
var minDate = "2014/01/01";
var titlesite = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
var site = titlesite+'?minDate='+minDate+'&db=pubmed&tool=personal+use+only&email=jlrg1992@gmail.com&retmax='+resultNumber+'&field=title&term=';
for(let x of terms){
  site = site+x+"+";
}




request(site, function (error, response, html) {

  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('Id').each(function(i, element){
      var a = $(this);
      var title = a.text();
      bio.push(title);
      });
  }
  getAbstracts(bio);
});



function getAbstracts(x){
  var nonsite = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?retmode=XML&rettype=abstract&db=pubmed&id='+bio[0];

  //for(let y of bio){
    //nonsite = nonsite+y+",";
  //}
  request(nonsite, function (error, response, html) {

  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('DocSum').each(function(i, element){
      var a = $(this);
      var pubdate
      metadata = {
        id:id,
        pubdate:pubdate,
        title: title,
        journal: journal,
        doi: doi,
        volume:volume,
        pages:pages
      }
    });
    console.log(html);
  }


});
}

