jQuery(document).ready(function($){
    $("#scrollTop").click(function(e){
        e.preventDefault()
        $('html, body').animate({scrollTop:(0)}, 500);
    })

    /* -- form -- */
    function GetFileName(elem) {
        let fi = jQuery(elem);
        fname = fi[0].files[0].name;
        return fname;
    }

    jQuery('#cvFile').on('change', function () {
        let fname = GetFileName('#cvFile')
        let myfile= $( this ).val()
        var ext = myfile.split('.').pop().toLowerCase()
        if(ext == "pdf" || ext == "docx" || ext == "doc" || ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "jpg") {
            jQuery('.file-title').text(fname);
            if($(".file-title").hasClass('error')) {
                $(".file-title").removeClass('error')
            }
            $(".file-title").addClass('success')
        } else {
            $( this ).val('')
            jQuery('.file-title').text('Unknown extension file');
            $(".file-title").addClass('error')
            return false;
        }
    })

    $("#cv input").keyup(function (e) {
        if($(this).hasClass('error')) {
            if($(this).val().length > 0) {
                $(this).removeClass('error')
            } else {
                $(this).addClass('error')
            }
        }
    })

    function checkUrl(url) {
        var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
        if(pattern.test(url)){
            return true;
        } else {
            return false;
        }
    }

    $("#cv").on("submit", function(e) {
        e.preventDefault()
        let err = [],
            thiss = $(this),
            name = thiss.find('#name'),
            cvFile = thiss.find('#cvFile'),
            email = thiss.find('#email'),
            portfolio = thiss.find('#portfolio'),
            emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            emptyReg = /^[\s\d]*$/;
        if ($('body').hasClass('loading')) return false;
        if (!emailReg.test(String(email.val()).toLowerCase())) {
            err.push(email);
        }
        if(name.val() == "") {
            err.push(name)
        }
        if(cvFile.val() == "") {
            err.push(cvFile)
        }
        if(portfolio.val() != "") {
            if(!checkUrl(portfolio.val())) {
                err.push(portfolio)
            }
        }
        if (err.length != 0) {
            for (var i = 0; i < err.length; i++) {
                if(err[i][0].id == "cvFile") {
                    err[i].prev().addClass('error');
                } else {
                    err[i].addClass('error');
                }
            }
        } else {
            var fd = new FormData(this);
            fd.append('action', "sendCV");
            $.ajax({
                url: ajax_params.ajax_url,
                type: "POST",
                contentType: false,
                processData: false,
                data: fd,
                beforeSend: function () {

                    //$('.loading').show();
                },
                success: function (data) {
                    thiss.find('button').attr('disabled', true)
                    $("#cv").hide()
                    $(".position-right").addClass('success')
                    $(".position-right h4").html("thank you! <br>your application has been successfully submitted.")
                },
                error: function (err) {

                }
            });
        }
    })

    /* -- END form -- */
})