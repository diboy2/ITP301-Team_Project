var nbOptions = 8;
var angleStart = -360;
var birds = [];

var hit_list;
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

    var bird = $('<img class="bird-food'+birdClass+'"  src="images/'+imageSRC+'"  alt="Smiley face" height="80" width="80">');
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

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}

function checkCollision(){
    hit_list = $(".bird").collision(".bird-food1");

    for(i=0;i<hit_list.size();i++){
        hit_list[i].parentNode.removeChild(hit_list[i]); 
        growBird(hit_list[i].src);  
    }
}

function growBird(){
    var height = parseInt($('.bird').height()) +30;
    var width = parseInt($('.bird').width()) +30;
    $('.bird').height(height+"px");
    $('.bird').width(width+"px");
}