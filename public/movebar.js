

$(document).ready(

      
    function allcontroll() {
        CKEDITOR.replace('content');
        $("#sendnote").click(function(){
              // getting data
              var data = CKEDITOR.instances.content.getData();
              alert(data);
             })
        $('#banner').mousedown(
            function (event) {
                var isMove = true;
                var abs_x = event.pageX - $('#moveBar').offset().left;
                var abs_y = event.pageY - $('#moveBar').offset().top;
                $(document).mousemove(function (event) {
                  if (isMove) {
                    var obj = $('#moveBar');
                    obj.css({'left':event.pageX - abs_x, 'top':event.pageY - abs_y});
                  }
                }
                ).mouseup(
                function () {
                    isMove = false;
                }
                );
            }
        );
      }

      
     );