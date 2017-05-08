var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();
app.get('/',function(req,res,next){

    superagent.get('https://cnodejs.org/')
        .end(function(err,sres){
            if(err){
               return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function(i,elem){
                var $element = $(elem);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
            });

            $('#topic_list .user_avatar').each(function(i,elem){
                var $element = $(elem);
                var name = $element.attr('href');
                items[i].author = name.slice(6);
            });

            res.send(items);
        });

});

app.listen(process.env.PORT || 3000);