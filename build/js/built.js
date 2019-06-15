$(document).ready(function(){
  
    $('#gohire').click(function(){
   $.ajax({
     type:'post',
     url:"https://twshutech.github.io/demo.github.io/client.php",
     success:function(data){
       console.log('it went well'+data);
     },error:function(data){
       console.log(data);
     }
   });
   })
    // $('html').load('https://twshutech.github.io/demo.github.io/client.php');

    
    $('#skillbtn').click(function(){
      var body = document.body;
      $('.Progressbar').css('width','70%');
     $('#skillnew').hide();
     $('#portfolionew').show();
     $('#skillbtn').css('display','none');
     $('#contactpage').css('display','block');
     body.scrollTop = 10;
    });
    $('#portbtn').click(function(){
    //  $('#skillnew').show();
    //  $('#portfolionew').hide();
    //  $('#portbtn').css('display','none');
    //  $('#skillbtn').css('display','block');
      location.reload()
    });
    $('#contactpage').click(function(){
      var body = document.body;
      $('#contactpage').hide();
      $('.Progressbar').css('width','100%');
      $('#portfolionew').hide();
      $('#portbtn').css('display','block');
      $('#hire').show();
      $('#footer').css('position','fixed');
      body.scrollTop = 0;
    });
    $('.shutech').click(function(){
      $('.Progressbar').css('width','50%');

      $(this).remove();
      $('.Progressbar p').innerHTML=$('.Progressbar').width();
      $('#frontpage').remove();
      $('#skillnew,#skillbtn').css('display','block');
      if($(window).width()<=700){
        $('#footer').css('position','relative');
      }
      // $('#skillbtn').css('display','block');
    });
  var getwidth = $('.Progressbar').width();
  var getparentwidth= $('.barholder').width();
  var getpersentage = (getwidth/getparentwidth)*100;
    
  });
