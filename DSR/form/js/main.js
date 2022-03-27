$(document).ready(function () {
    $('.select2').select2();
    $('#research input[type=date]').prop('required',true);
    $('#journal .custom-select').prop('required',true);
    $('input[type=number]').addClass('ltr');
    $('input[type=number]').prop('min',0);
    $('.main').hide();
    $('.journal').show();
    var now =".journal";
    Main();
    var navList = $('.list-group a');
    $('textarea').keydown(function(e){
        if (e.keyCode == 13 )
            e.preventDefault();
    });
    navList.click(function(e){
        e.preventDefault();
        navList.removeClass("font-weight-bold");
        $(this).addClass("font-weight-bold");
        $('.main').hide();
        $($(this).attr('href')).show();
        now = $(this).attr('href');
        now = now.replace(/#/g,'.');
        Main();  
    });

    //notification
    // (function notify(){
        var temp;
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            
            data: {
                key: 'notification'
            },
            success: function(data){
                $('#notifydata').html(data.res);
                if(data.count == '0')
                    $('#notification_count').hide();
                $('#notification_count').html(data.count);
            },dataType : 'JSON'
        });
    // })();
    
    $("#notificationLink").click(function(){
		$("#notificationContainer").fadeToggle(300);
		$("#notification_count").fadeOut("slow");
		return false;
	});
	//Document Click hiding the popup 
	$(document).click(function(){
		$("#notificationContainer").hide();
	});
	//Popup on click
	$("#notificationContainer").click(function(){
		return false;
    });
	$("#all").click(function(e){
        var group = [];
        e.preventDefault();
        localStorage.setItem('name','notify');  
        $('#notifydata').find('a').each(function(){
            group.push($(this).attr('id'));
        });
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            data: {
                key: 'seenAll',
                group: JSON.stringify(group)
            }
        });
        window.location.replace('report.php');
    });
    $('#notifydata').hover(function () {
        $('#notifydata').find('a').click(function(){
            localStorage.setItem('name','notify');
          
            var id = $(this).attr('id');
            $.ajax({
                url : 'form/includes/research.inc.php',
                method : 'POST',
                data: {
                    key: 'seenOne',
                    id: $(this).attr('id')
                },
                dataType : 'text'
            });
            window.location.replace('report.php');
        });
    });
    //if the teacher is TA he has not discharge
    $('#dis-degree').change(function(){
        if($(this).val() == 3){
            $('#dis-1-btn').prop('disabled','disabled'); 
            $('#dis-save').prop('disabled','disabled'); 
        }else{
            $('#dis-1-btn').removeAttr('disabled');
            $('#dis-save').removeAttr('disabled');
        }
    });

    
    function Main(){
        
        var navListItems = $(now+' div .setup-panel div a'),
            allWells = $('.setup-content'),
            allPrevBtn = $('.prevBtn'),
            allNextBtn = $('.nextBtn');
        allWells.hide();
        
    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);
        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
     
    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='date'],input[type='tel'],input[type='text'],input[type='email'],input[type='number'],select,textarea"),
            isValid = true;
  
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
            }
            $(curInputs[i]).closest(".form-group").addClass("was-validated");
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
      
    });

    allPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
            nextStepWizard.removeAttr('disabled').trigger('click');
      
    });
  
    $('div.setup-panel div a.btn-primary').trigger('click');
    if(now==".journal"){
        $('div.setup-panel div a.one').trigger('click');
    }
    
    };

    $('#department-confirm').change(function(){
        if($('#department-confirm').val()==1)
        $('#confirm-coverage').removeAttr('disabled');
        else
        $('#confirm-coverage').prop('disabled','disabled');   
    });

    // parse a date in yyyy-mm-dd format
    function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }

  function newDate (date) {
    if (!date) return '';
    var day = date.getDate() + '';
    if (day.length < 2) {
        day = '0' + day;
    }
    var month = (date.getMonth() + 1) + '';
    if (month.length < 2) {
        month = '0' + month;
    }
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
}
    $('.request').change(function(){
        var date1 = $('#request-vacation-date-from');
        var date2 = $('#request-vacation-date-to');
        var date11 = date1.val();
        var max = new Date(new Date(date11).setMonth(new Date(date11).getMonth()+12));
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("max",newDate(max));
        date2.attr("min",newDate(min));
        if(!date1.val() || !date2.val()){

        }else{
            var firstDate = parseDate($('#request-vacation-date-from').val());
            var secondDate = parseDate($('#request-vacation-date-to').val());
            if(firstDate <= secondDate){
                var diff;
                var oneDay = 24*60*60*1000;
                var days = (secondDate.getTime() - firstDate.getTime())/oneDay;
                var months = Math.floor(days/30);
                var remaind = days % 30 ;
                var diff = months + remaind/100;
                $('#request-vacation-num').prop('value',diff.toFixed(2));
            }else{
            
            }
        }
    });

    $('.loan').change(function(){
        var date1 = $('#loan-date-from');
        var date2 = $('#loan-date-to');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });

    $('.vacation').change(function(){
        var date1 = $('#vacation-date-from');
        var date2 = $('#vacation-date-to');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });

    $('.grant1').change(function(){
        var date1 = $('#grant-date-from-1');
        var date2 = $('#grant-date-to-1');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });
    $('.grant2').change(function(){
        var date1 = $('#grant-date-from-2');
        var date2 = $('#grant-date-to-2');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });

    $('.date-r').change(function(){
      
        var date1 = $('#start-date');
        var date2 = $('#end-date');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });

    $('.fore_date').change(function(){
        
        var date1 = $('#foreign-start-date');
        var date2 = $('#foreign-end-date');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });

    $('.ex_date').change(function(){
       
        var date1 = $('#e-start-date');
        var date2 = $('#e-end-date');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });

    $('.tr_date').change(function(){
     
        var date1 = $('#t-start-date');
        var date2 = $('#t-end-date');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });

    $('.wo_date').change(function(){
   
        var date1 = $('#workshop-start-date');
        var date2 = $('#workshop-end-date');
        var date11 = date1.val();
        var min = new Date(new Date(date11).setMonth(new Date(date11).getMonth()));

        date2.attr("min",newDate(min));
    });

    $(".add-more").click(function(){
        var current = $(this)[0].id;
        var html = $('.'+current+".copy").html();
        $('.'+current+" .after-add-more").after(html);
     
    });
    $("body").on("click",".remove",function(){ 
        var current = $(this)[0].id;
        $('#'+current).parents(".control-group").remove();

    });


    //full screen

    $('.full').click(function(){
        if($('.del').hasClass('col-xl-10')){
            $('.del').removeClass('col-xl-10');
            $('.del').removeClass('col-md-9');
            $('.color').hide();
            $('.side').hide();
        }else{
            $('.del').addClass('col-xl-10');
            $('.del').addClass('col-md-9');
            $('.color').show();
            $('.side').show();
        }

    });

    //Grap teatchers names
    $.ajax({
        url: 'form/includes/research.inc.php',
        method:'POST',
        data: {
            key : 'teachers'
        },
        success: function(data){
            $('.teacher').html(data);
        }
    });

    //Grap countries name's
    $.ajax({
        url: 'form/includes/research.inc.php',
        method:'POST',
        data: {
            key : 'country'
        },
        success: function(data){
            $('.country').html(data);
        }
    });

    //Grap collages name's
    $.ajax({
        url: 'form/includes/research.inc.php',
        method:'POST',
        data: {
            key : 'collage'
        },
        success: function(data){
            $('.collage').html(data);
        }
    });

    //grap and fill teacher data 
    $('#dis-name').change(function(){
       
        var id = this.value;
        $.ajax({
            url: 'form/includes/research.inc.php',
            method:'POST',
            data: {
                key : 'teacherData',
                id: id
            },
            success: function(data){
                
                $('#dis-collage').html(data.collage_name);
                $('#dis-phone').val(data.phone);
                $('#dis-degree').val(data.degree);
                $('#dis-dept').html(data.dept_name);
            },
            dataType: 'JSON'
        });
    });

    //grap and fill teacher data 
    $('#researcher-name').change(function(){
        
        var id = this.value;
        $.ajax({
            url: 'form/includes/research.inc.php',
            method:'POST',
            data: {
                key : 'teacherData',
                id: id
            },
            success: function(data){
               
                $('#collage').html(data.collage_name);
                //$('#phone').val(data.phone);
                $('#degree').val(data.degree);
                $('#department').html(data.dept_name);
            },
            dataType: 'JSON'
        });
    });
    //grap and fill teacher data 
    $('#a_researcher').change(function(){
        
        var id = this.value;
        $.ajax({
            url: 'form/includes/research.inc.php',
            method:'POST',
            data: {
                key : 'teacherData',
                id: id
            },
            success: function(data){
               
                $('#a_collage').html(data.collage_name);
                //$('#phone').val(data.phone);
                $('#a_degree').val(data.degree);
                $('#a_department').html(data.dept_name);
            },
            dataType: 'JSON'
        });
    });

    
    //make currency required
    $('#amount').keyup(function(){
        if($(this).val()){
            $('select[name = "currency"]').prop('required',true);
            $('#donor').prop('required',true);
        }
        else{
            $('select[name = "currency"]').prop('required',false);
            $('#donor').prop('required',false);
        }
    });

    //make user to insert one name
    $('#name-ar').keyup(function(){
        if($(this).val())
            $('#name-en').prop('required',false);
        else
            $('#name-en').prop('required',true);
    });
    $('#name-en').keyup(function(){
        if($(this).val())
            $('#name-ar').prop('required',false);
        else
            $('#name-ar').prop('required',true);
    });
    //make promotion date required if ...
    $('#dis-degree').change(function(){
        if($(this).val() == 1)
            $('#promotion-date').prop('required',true);
        else
            $('#promotion-date').prop('required',false);
    });


    //end of ready function
  });
 
   (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = $('.needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {  
            event.preventDefault();
          if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
          }else{     
            manageData(form.id);
            form.classList.remove('was-validated');
          }        
        }, false);
      });
    }, false);
  })();
  //ajax request
  //send data
  function manageData(key){
      console.log(key);
    if(key == 'researches'){
        var name = $('#research-name');
        var researcher = $('#researcher-name');
        var startDate = $('#start-date');
        var endDate = $('#end-date');
        var donor = $('#donor');
        var amount = $('#amount');
        var currency = $('#currency');
        var degree = $('#degree');
        var collage = $('#collage');
        var department = $('#department');
        var rate = $('#rate');
        var abstract = $('#abstract');
        var device = new Array();
        $('input[name="device[]"]').each(function(){
            if($(this).val())
                device.push($(this).val());
            else
                return device;
        }).get();
       
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            dataType : 'text',
            data: {
                key: key,
                name: name.val().toLowerCase(),
                researcher: researcher.val().toLowerCase(),
                startDate: startDate.val(),
                endDate: endDate.val(),
                donor: donor.val().toLowerCase(),
                amount: amount.val(),
                currency: currency.val(),
                degree: degree.val(),
                collage: collage.val().toLowerCase(),
                department: department.val().toLowerCase(),
                rate: rate.val(),
                abstract: abstract.val(),
                device: device 
            },success: function (response) {
                if(response == "added successfully"){
                    successReset(key , response,0);
                    $('#researcher-name').val('').change();
                }
                else
                    successReset(key , response,1);
            }
        });
        //end researches
    }else if(key == 'allowances'){
        var researcher = $('#a_researcher');
        var journal = $('#a_journal');
        var title = $('#a_title');
        var year = $('#year');
        var pages = $('#pages');
        var paper = $('#paper');
       
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            dataType : 'text',
            data: {
                key: key,
                researcher: researcher.val(),
                journal: journal.val(),
                title: title.val(),
                year: year.val(),
                pages: pages.val(),
                paper: paper.val(),
            },success: function (response) {
                if(response == "added successfully"){
                    successReset(key , response,0);
                    $('#a_researcher').val('').change();
                }
                else
                    successReset(key , response,1);
            }
        });
        //end researches
    }else if(key == 'journals'){
        var nameAr = $('#name-ar');
        var nameEn = $('#name-en');
        var editor = $('#editor-name');
        var publishPaper = $('#publish-paper');
        var publishElec = $('#publish-electronic');
        var publishAr = $('#publish-ar');
        var publishEn = $('#publish-en');
        var spreadPaper = $('#spread-paper');
        var spreadElec = $('#spread-electronic');
        var firstPublishDate = $('#first-publish-date');
        var currentPublishPaper = $('#current-publish-paper');
        var numPaperInPublish = $('#num-paper-in-publish');
        var numPaperInYear = $('#num-paper-in-year');
        var internalArbitration = $('#internal-arbitration');
        var externalArbitration = $('#external-arbitration');
        var numArbitrator = $('#num-arbitrator');
        var paidArbitration = $('#paid-arbitration');
        var freeArbitration = $('#free-arbitration');
        var stopReason = $('#stop-reason');
        var incomeResource = $('#income-resource');
        var publishArea = $('#publish-area');
        var journalAssets = $('#journal-assets');
        var journalHr = $('#journal-hr');
        var journalProblem = $('#journal-problem');
        var journalSolution = $('#journal-solution');
        var impactFactor = $('#impact-factor');
        var email = $('#journal-email');
        var phone = $('#journal-phone');
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            dataType : 'text',
            data: {
                key: key,
                nameAr: nameAr.val().toLowerCase(),
                nameEn: nameEn.val().toLowerCase(),
                editor: editor.val().toLowerCase(),
                publishPaper: publishPaper.val(),
                publishElec: publishElec.val(),
                publishAr: publishAr.val(),
                publishEn: publishEn.val(),
                spreadPaper: spreadPaper.val(),
                spreadElec: spreadElec.val(),
                firstPublishDate: firstPublishDate.val(),
                currentPublishPaper: currentPublishPaper.val(),
                numPaperInPublish: numPaperInPublish.val(),
                numPaperInYear: numPaperInYear.val(),
                internalArbitration: internalArbitration.val(),
                externalArbitration: externalArbitration.val(),
                numArbitrator: numArbitrator.val(),
                paidArbitration: paidArbitration.val(),
                freeArbitration: freeArbitration.val(),
                stopReason: stopReason.val(),
                incomeResource: incomeResource.val(),
                publishArea: publishArea.val(),
                journalAssets: journalAssets.val(),
                journalHr: journalHr.val(),
                journalProblem: journalProblem.val(),
                journalSolution: journalSolution.val(),
                impactFactor: impactFactor.val(),
                email: email.val(),
                phone: phone.val(),
            },success: function (response) {
                if(response == 'added successfully')
                    successReset(key,response,0);
                else
                    successReset(key,response,1);
            }
        });
    } //end journals
    else if(key == 'discharges'){
        var disName = $('#dis-name');
        var disPhone = $('#dis-phone');
        var disDegree = $('#dis-degree');
        var disCollage = $('#dis-collage');
        var disDept = $('#dis-dept');
        var designationDate = $('#designation-date');
        var promotionDate = $('#promotion-date');
        var loanType = $('#loan-type');
        var loanDateFrom = $('#loan-date-from');
        var loanDateTo = $('#loan-date-to');
        var loanPlace = $('#loan-place');
        var vacationDateFrom = $('#vacation-date-from');
        var vacationDateTo = $('#vacation-date-to');
        var vacationPlace = $('#vacation-place');
        var grantDateFrom1 = $('#grant-date-from-1');
        var grantDateTo1 = $('#grant-date-to-1');
        var grantPlace1 = $('#grant-place-1');
        var grantDateFrom2 = $('#grant-date-from-2');
        var grantDateTo2 = $('#grant-date-to-2');
        var grantPlace2 = $('#grant-place-2');
        var requestVacationDateFrom = $('#request-vacation-date-from');
        var requestVacationDateTo = $('#request-vacation-date-to');
        var requestVacationNum = $('#request-vacation-num');
        var eduName = $('#edu-name');
        var eduCountry = $('#edu-country');
        var eduConfirm = $('#edu-confirm');
        var activity = $('#activity');
        var supportEdu = $('#support-edu');
        var requestSupport = $('#request-support');
        var deptConfirm = $('#department-confirm');
        var confirmCoverage = $('#confirm-coverage');
        var collageConfirm = $('#collage-confirm');
        var boardConfirm = $('#board-confirm');
        
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            dataType : 'text',
            data: {
                key: key,
                disName: disName.val(),
                disPhone: disPhone.val(),
                disDegree: disDegree.val(),
                disCollage: disCollage.val(),
                disDept: disDept.val(),
                designationDate: designationDate.val(),
                promotionDate: promotionDate.val(),
                loanType: loanType.val(),
                loanDateFrom: loanDateFrom.val(),
                loanDateTo: loanDateTo.val(),
                loanPlace: loanPlace.val(),
                vacationDateFrom: vacationDateFrom.val(),
                vacationDateTo: vacationDateTo.val(),
                vacationPlace: vacationPlace.val(),
                grantDateFrom1: grantDateFrom1.val(),
                grantDateTo1: grantDateTo1.val(),
                grantPlace1: grantPlace1.val(),
                grantDateFrom2: grantDateFrom2.val(),
                grantDateTo2: grantDateTo2.val(),
                grantPlace2: grantPlace2.val(),
                requestVacationDateFrom: requestVacationDateFrom.val(),
                requestVacationDateTo: requestVacationDateTo.val(),
                requestVacationNum: requestVacationNum.val(),
                eduName: eduName.val(),
                eduCountry: eduCountry.val(),
                eduConfirm: eduConfirm.val(),
                activity: activity.val(),
                supportEdu: supportEdu.val(),
                requestSupport: requestSupport.val(),
                deptConfirm: deptConfirm.val(),
                confirmCoverage: confirmCoverage.val(),
                collageConfirm: collageConfirm.val(),
                boardConfirm: boardConfirm.val(),
            },success: function (response) {
                if(response == 'added successfully'){
                    successReset(key,response,0);
                    $('#dis-name').val('').change();
                }
                else{
                    successReset(key,response,1);
                }
            }
        });
    } //end discharge
    else if(key == 'foreigns'){
        var name = $('#foreign-name');
        var foreignEdu = $('#foreign-edu');
        var foreignCollage = $('#foreign-collage');
        var receiveCollage = $('#foreign-receive');
        var startDate = $('#foreign-start-date');
        var endDate = $('#foreign-end-date');
        var foreignReason = $('#foreign-reason');
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            dataType : 'text',
            data: {
                key: key,
                name: name.val().toLowerCase(),
                foreignEdu: foreignEdu.val().toLowerCase(),
                foreignCollage: foreignCollage.val().toLowerCase(),
                receiveCollage: receiveCollage.val(),
                startDate: startDate.val(),
                endDate: endDate.val(),
                foreignReason: foreignReason.val()
            },success: function (response) {
                if(response == 'added successfully'){
                    successReset(key,response,0);
                    $('#foreign-receive').val('').change();
                }
                else{
                    successReset(key,response,1);
                }
            }
        });
    } //end foreign
    else if(key == 'workshops'){
        var name = $('#workshop-name');
        var place = $('#workshop-place');
        var participantNum = $('#participant-num');
        var presenter = $('#presenter');
        var presenterDegree = $('#presenter-degree');
        var startDate = $('#workshop-start-date');
        var endDate = $('#workshop-end-date');
        var participant = new Array();
        $('input[name="participant[]"]').each(function(){
            if($(this).val())
                participant.push($(this).val());
            else
                return participant;
        }).get();
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            dataType : 'text',
            data: {
                key: key,
                name: name.val().toLowerCase(),
                place: place.val().toLowerCase(),
                participantNum: participantNum.val(),
                presenter: presenter.val().toLowerCase(),
                presenterDegree: presenterDegree.val(),
                startDate: startDate.val(),
                endDate: endDate.val(),
                participant: participant
            },success: function (response) {
                if(response == 'added successfully')
                    successReset(key,response,0);
                else
                    successReset(key,response,1);
            }
        });
    } //end workshop
    else if(key == 'exhibitions'){
        var name = $('#e-name');
        var place = $('#e-place');
        var participantNum = $('#e-participant-num');
        var presenter = $('#e-presenter');
        var presenterDegree = $('#e-presenter-degree');
        var startDate = $('#e-start-date');
        var endDate = $('#e-end-date');
        var participant = new Array();
        $('input[name="eparticipant[]"]').each(function(){
            if($(this).val())
                participant.push($(this).val());
            else
                return participant;
        });
       
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            dataType : 'text',
            data: {
                key: key,
                name: name.val().toLowerCase(),
                place: place.val().toLowerCase(),
                participantNum: participantNum.val(),
                presenter: presenter.val().toLowerCase(),
                presenterDegree: presenterDegree.val(),
                startDate: startDate.val(),
                endDate: endDate.val(),
                participant: participant
            },success: function (response) {
                if(response == 'added successfully')
                    successReset(key,response,0);
                else
                    successReset(key,response,1);
            }
        });
    } //end exhibition
    else if(key == 'trainings'){
        var name = $('#t-name');
        var place = $('#t-place');
        var participantNum = $('#t-participant-num');
        var presenter = $('#t-presenter');
        var presenterDegree = $('#t-presenter-degree');
        var startDate = $('#t-start-date');
        var endDate = $('#t-end-date');
        var participant = new Array();
        $('input[name="t-participant[]"]').each(function(){
            if($(this).val())
                participant.push($(this).val());
            else
                return participant;
        }).get();
        $.ajax({
            url : 'form/includes/research.inc.php',
            method : 'POST',
            dataType : 'text',
            data: {
                key: key,
                name: name.val().toLowerCase(),
                place: place.val().toLowerCase(),
                participantNum: participantNum.val(),
                presenter: presenter.val().toLowerCase(),
                presenterDegree: presenterDegree.val(),
                startDate: startDate.val(),
                endDate: endDate.val(),
                participant: participant
            },success: function (response) {
                if(response == 'added successfully')
                    successReset(key,response,0);
                else
                    successReset(key,response,1);
            }
        });
    } //end training
    //end of manageData
}
    //added successfully and reset function
    function successReset(key, result ,status){
        $('.'+key+'-add').fadeIn().addClass('alert alert-danger popup').html(result);
        setTimeout(function(){
            $('.'+key+'-add').fadeOut("slow");
            if(status == 0)
                $('#'+key).trigger('reset');
                },1500);
            if(key == 'journals'){
                if(status == 0)
                    $('div.setup-panel div a.one').trigger('click');
            }
            if(key == 'discharges'){
                if(status == 0)
                    $('div.setup-panel div a.two').trigger('click');
            }
   }