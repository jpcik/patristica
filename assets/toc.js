// https://github.com/ghiculescu/jekyll-table-of-contents

function romanize (num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function chap(innerText,cnt,level){

 //console.log(level);
    if (innerText == "&nbsp;") 
      innerText=" "+romanize(cnt)+".";
    else if (level !=2.5 && level!=1) innerText=romanize(cnt)+". "+innerText;
   return innerText;
}


      


$(document).ready(function() {


  var no_back_to_top_links = true

  var headers = $('h1,h2, h3, h4, h5, h6,.hh').filter(function() {return this.id}), // get all headers with an ID
      output = $('.toc');
  if (!headers.length || headers.length < 3 || !output.length)
    return;

  var get_level = function(ele) { console.log(ele.nodeName);
if (ele.nodeName=="P") return 2.5;
else return parseInt(ele.nodeName.replace("H", ""), 10) }
  var highest_level = headers.map(function(_, ele) { return get_level(ele) }).get().sort()[0]
  var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>'

  var level = get_level(headers[0]), this_level, html = "<dl>";
  var cnts=[1,1,1,1,1,1];
  

  headers.on('click', function() {
    if (!no_back_to_top_links) window.location.hash = this.id
  }).addClass('calickable-header').each(function(_, header) {
    this_level = get_level(header);
    //console.log(this_level);
    if (!no_back_to_top_links && this_level === highest_level) {
      $(header).addClass('top-level-header').after(return_to_top)
    }
    var dl="<dl";
    if (this_level === level) // same level as before; same indenting
      html += "<dd><a class='links' href='#" + header.id + "'>" + chap(header.innerHTML,cnts[this_level],this_level) + "</a>";
    else if (this_level < level) // higher level than before; end parent ol
      html += "</dd></dl></dd><dd><a class='links' href='#" + header.id + "'>" + chap(header.innerHTML,cnts[this_level],this_level) + "</a>";
    else if (this_level > level) {// lower level than before; expand the previous to contain a ol
    
      if (level!=2.5)
        cnts[this_level]=1;
      if (this_level==3) dl=dl+" class='columnList' "
      html += dl+"><dd><a class='links' href='#" + header.id + "'>" + chap(header.innerHTML,cnts[this_level],this_level) + "</a>";
    }
    level = this_level; // update for the next one
    cnts[level]++;
  });
  html += "</dl>";
  if (!no_back_to_top_links) {
    $(document).on('click', '.back-to-top', function() {
      $(window).scrollTop(0)
      window.location.hash = ''
    })
  }
  output.hide().html(html).show('slow');
$('article.group').prepend("<div class='mini'>-</div>");
$('.toc').addClass("maximize");
  $('.part').addClass("hidd");

        $('.links').click(function() {    
        
            var $this = $(this);
            var id=$(this).attr('href')
console.log(id.startsWith("#nbsp"))
if (!id.startsWith("#nbsp")){
  $('.part:not('+id+')').removeClass("viss").addClass("hidd");

            var pip=$(id)

            if (pip.hasClass("hidd")) {
                pip.removeClass("hidd").addClass("viss");

            } else {
                pip.removeClass("viss").addClass("hidd");
            }
}

        });


      $('.mini').click(function() {
          var $this=$('.toc');
          if ($this.hasClass("minimize")){
  $this.removeClass("minimize").addClass("maximize");

            } else {
                $this.removeClass("maximize").addClass("minimize");
            }

      });

});