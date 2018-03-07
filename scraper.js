var request = require('request');
var cheerio = require('cheerio');

var bio = [];
var bioData = [];
var terms = ["testosterone","food"];
var resultNumber = "20";
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
  var nonsite = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?retmode=XML&rettype=abstract&db=pubmed&id=';

  for(let y of bio){
    nonsite = nonsite+y+",";
  }
  request(nonsite, function (error, response, html) {

  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('PubmedArticle').each(function(i, element){
      var a = $(this);
      var pubdate = a.children('MedlineCitation').children('DateRevised').children('Year').text()+'-'+a.children('MedlineCitation').children('DateRevised').children('Month').text()+'-'+a.children('MedlineCitation').children('DateRevised').children('Day').text();
      var id = a.children('PubmedData').children('articleidlist').children('articleid[idtype="pubmed"]').html();
      var title = a.children('MedlineCitation').children('Article').children('ArticleTitle').text();
      var journal = a.children('MedlineCitation').children('Article').children('Journal').children('Title').text();
      var doi = a.children('PubmedData').children('articleidlist').children('articleid[idtype="doi"]').html();;
      var volume = a.children('MedlineCitation').children('Article').children('Journal').children('JournalIssue').children('Volume').text();;
      var pages = a.children('MedlineCitation').children('Article').children('Pagination').children().text();
      var abstract = a.children('MedlineCitation').children('Article').children('Abstract').text().split('                ').join(' ');
      var metadata = {
        id:id,
        pubdate:pubdate,
        title: title,
        journal: journal,
        doi: doi,
        volume:volume,
        pages:pages,
        abstract: abstract
      }
      bioData.push(metadata);
    });
    console.log(bioData);
  }


});
}

