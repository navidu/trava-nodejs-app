/**
 * Created by navidu on 9/13/18.
 */

$('#portfolioBtnPanel button').click(
    function(portF){
        portF.preventDefault();
        var that = this,
            $that = $(that),
            id = that.id,
            gallery = $('#gallery');
        if (id == 'all') {
            gallery.find('div:hidden').fadeIn(1000);
        }
        else {
            gallery.find('div.' + id + ':hidden').fadeIn(900);
            gallery.find('div').not('.' + id).fadeOut(700);
        }
    });
