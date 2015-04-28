var nbOptions = 8;
var angleStart = -360;
var birds = [];

var hit_list;
var isExploding=false;
// jquery rotate animation
function rotate(li,d) {
    $({d:angleStart}).animate({d:d}, {
        step: function(now) {
            $(li)
               .css({ transform: 'rotate('+now+'deg)' })
               .find('label')
                  .css({ transform: 'rotate('+(-now)+'deg)' });
        }, duration: 0
    });
}

// show / hide the options
function toggleOptions(s) {
    $(s).toggleClass('open');
    var li = $(s).find('li');
    var deg = $(s).hasClass('half') ? 180/(li.length-1) : 360/li.length;
    for(var i=0; i<li.length; i++) {
        var d = $(s).hasClass('half') ? (i*deg)-90 : i*deg;
        $(s).hasClass('open') ? rotate(li[i],d) : rotate(li[i],angleStart);
    }
}

$('.selector button').click(function(e) {
    toggleOptions($(this).parent());
});

setTimeout(function() { toggleOptions('.selector'); }, 100);
function addBird(birdClass,imageSRC){

    var bird = $('<img class="bird-type'+birdClass+' bird-food"  src="images/'+imageSRC+'"  alt="Smiley face" height="80" width="80">');
    var yP = Math.random() *  $(window).height();
    var xP = Math.random() *  $(window).width();
    
    // var bird={
    //     id
    //     yP:yP
    //     xP:xP
    // }   
    bird.css({top:yP, left: xP, position:'absolute'});
    $("body").append(bird);

    


}

$(document).ready(function(){
   animateBird();
   $("#c1").on("click",function(){
        addBird("1","bird.png");
   });

   $("#c2").on("click",function(){
        addBird("2","bird2.png");
   });
     $("#c3").on("click",function(){
        addBird("3","bird3.png");
   });
     $("#c4").on("click",function(){
        addBird("4","bird4.png");
   });
     $("#c5").on("click",function(){
        addBird("5","bird5.png");
   });
     $("#c6").on("click",function(){
        addBird("6","bird6.png");
   });
     $("#c7").on("click",function(){
        addBird("7","bird7.png");
   });
     $("#c8").on("click",function(){
        addBird("8","bird7.png");
    });
});


function checkIntersection(){

}

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 100;
    var w = $(window).width() - 100;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateBird(){
    var newq = makeNewPosition();
    var oldq = $('.bird').offset();
   
    checkCollision();
    $('.bird').animate({ top: newq[0], left: newq[1] }, function(){
      animateBird();        
    });
    
};


function checkCollision(){
    hit_list = $(".bird").collision(".bird-food");

    for(i=0;i<hit_list.size();i++){
        hit_list[i].parentNode.removeChild(hit_list[i]);
        if(!isExploding){ 
            growBird(hit_list[i].src); 
        } 
    }
}

function growBird(imageSRC){
    $('.bird').attr("src",imageSRC);
    var height = parseInt($('.bird').height()) +30;
    var width = parseInt($('.bird').width()) +30;
    $('.bird').height(height+"px");
    $('.bird').width(width+"px");

    if(height >650 || width > 650 && !isExploding){
        $('.bird').attr("src","images/explodingbird.gif");
        isExploding=true; 
        setTimeout(resetBird, 1000);

    }
}

function resetBird() { 

    isExploding=false;    

    $('.bird').height("200px"); 
    $('.bird').width("200px");
}