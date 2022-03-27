$(document).ready(function () {
    if(localStorage.getItem('current') == 'dept'){
        $('.main').hide();
        $('.collage').show();
        $('.list-group a').removeClass("font-weight-bold");
        $('.cole').addClass("font-weight-bold");
        var now = '.collage';
        localStorage.setItem('current','');
    }else{
        $('.main').hide();
        $('.page1').show();
        var now = '.page1';
    }
    Main(now);
    var navList = $('.list-group a');
    navList.click(function(e){
        e.preventDefault();
        navList.removeClass("font-weight-bold");
        $(this).addClass("font-weight-bold");
        $('.main').hide();
        $($(this).attr('href')).show();
        now = $(this).attr('href');
        now = now.replace(/#/g,'.');
        Main(now);  
    });
    function Main(now){
        if(now == '.collage'){
            $('#collage_data').DataTable().destroy();
            var dataCollage = $('#collage_data').DataTable({
                "processing" : true,
                "serverSide" : true,
                "autoWidth":false,
                "order":[],
                dom: "<'mx-auto'"+
                "<'row mb-2'"+
                "<' col-6 mr-2  ltr'l>"+
                "<' col-3 ltr'f >"+
                ">"+
                "<'row '"+
                    "<'col-12't>"+
                ">"+
                "<'row mt-2'"+
                    "<'col-10 text-center'i>"+
                    "<'col-2 ltr'p>"+
                ">"+">", 
                columnDefs: [
                    { "orderable": false, "targets": [0,1,2,3] },
                
                 ],"lengthMenu": [[-1, 50, 25, 10,5], ["All", 50, 25, 10,5]],
                "ajax" : {
                url:"dash/user/fetch.php",
                type:"POST",
                    data:{
                        key:'collage'
                    },
                }
            });
            
            $('#add_collage').click(function(){
                var options = {
                ajaxPrefix:''
                };
                new Dialogify('dash/user/form/add_collage_form.php', options)
                .title('Add New Collage')
                .buttons([{
                    text:'Cancle',
                    click:function(e){
                    this.close();
                    }
                },
                {
                    text:'Insert',
                    type:Dialogify.BUTTON_PRIMARY,
                    click:function(e){
                        var form_data = new FormData();
                        form_data.append('cname', $('#cname').val());
                        $.ajax({
                            method:"POST",
                            url:'dash/user/insert/insert_collage.php',
                            data:form_data,
                            dataType:'json',
                            contentType:false,
                            cache:false,
                            processData:false,
                            success:function(data){
                                if(data.success != ''){
                                    $('#collage_res').html('<div class="alert alert-danger">'+data.success+'</div>');
                                    dataCollage.ajax.reload();
                                    window.setTimeout(function(){
                                        $('#collage_res').html('');
                                    },2000);
                                    }
                                }
                            });
                        }
                    }
                ]).showModal();
            });
        
            $(document).on('click', '.updateCollage', function(){
                var id = $(this).attr('id');
                var x = $(this).parent().parent();
                var xdata = Array();
                    x.find('td').each(function(){
                        var curr = ($(this).text());
                        xdata.push(curr);
                    });
                var cname = xdata[0];
                    var options = {
                        ajaxPrefix:''
                    };

                    new Dialogify('dash/user/form/add_collage_form.php?cid='+cname, options)
                        .title('Edit Collage Name')
                            .buttons([{
                                text:'Cancle',
                                    click:function(e){
                                        this.close();
                                    }
                                },{
                                    text:'Edit',
                                    type:Dialogify.BUTTON_PRIMARY,
                                    click:function(e){
                                        var form_data = new FormData();
                                        
                                        form_data.append('cname', $('#cname').val());
                                    
                                        form_data.append('collageId', id);
                                        $.ajax({
                                            method:"POST",
                                            url:'dash/user/update/update_collage.php',
                                            data:form_data,
                                            dataType:'json',
                                            contentType:false,
                                            cache:false,
                                            processData:false,
                                            success:function(data){
                                                if(data.success != ''){
                                                    $('#collage_res').html('<div class="alert alert-danger">'+data.success+'</div>');
                                                    dataCollage.ajax.reload();
                                                    window.setTimeout(function(){
                                                    $('#collage_res').html('');
                                                },2000);
                                            }
                                        }
                                        });
                                    }
                                }
                            ]).showModal();
            });
        
            $(document).on('click', '.deleteCollage', function(){
                var id = $(this).attr('id');
                Dialogify.confirm("<h5 class='text-danger'><b>?Are you sure you want to remove</b></h5>", {
                ok:function(){
                    $.ajax({
                        url:"dash/user/delete/delete_collage.php",
                        method:"POST",
                        data:{collageId:id},
                        success:function(data){
                            dataCollage.ajax.reload();
                        }
                    })
                },
                cancel:function(){
                    this.close();
                }
                });
            });
        
        }else if(now == '.teacher'){
            $('#teacher_data').DataTable().destroy();
            var dataTeacher = $('#teacher_data').DataTable({
                "processing" : true,
                "serverSide" : true,
                "autoWidth":false,
                "order":[],
                dom: "<'mx-auto'"+
                "<'row mb-2'"+
                "<' col-8 mr-5 ltr'l>"+
                "<' col-2 ltr'f >"+
                ">"+
                "<'row '"+
                    "<'col-12't>"+
                ">"+
                "<'row'"+
                    "<'col-10 text-center'i>"+
                    "<'col-2 ltr'p>"+
                ">"+">", 
                columnDefs: [
                    { "orderable": false, "targets": [0,1,2,3,4,5,6] },
                
                 ],"lengthMenu": [[-1, 50, 25, 10,5], ["All", 50, 25, 10,5]],
                "ajax" : {
                url:"dash/user/fetch.php",
                type:"POST",
                    data:{
                        key:'teacher'
                    }
                }
            });
            
            $('#add_teacher').click(function(){
                var options = {
                ajaxPrefix:''
                };
                new Dialogify('dash/user/form/add_teacher_form.php', options)
                .title('Add New Teacher')
                .buttons([{
                    text:'Cancle',
                    click:function(e){
                    this.close();
                    }
                },
                {
                    text:'Insert',
                    type:Dialogify.BUTTON_PRIMARY,
                    click:function(e){
                        var form_data = new FormData();
                        form_data.append('tname', $('#tname').val());
                        form_data.append('dname', $('#dname').val());
                        form_data.append('dename', $('#dename').val());
                        form_data.append('tphone', $('#tphone').val());
                        $.ajax({
                            method:"POST",
                            url:'dash/user/insert/insert_teacher.php',
                            data:form_data,
                            dataType:'json',
                            contentType:false,
                            cache:false,
                            processData:false,
                            success:function(data){
                                if(data.success != '')
                                    $('#teacher_res').html('<div class="alert alert-danger">'+data.success+'</div>');
                                    dataTeacher.ajax.reload();
                                    window.setTimeout(function(){
                                        $('#teacher_res').html('');
                                    },2000);
                                }
                            });
                        }
                    }
                ]).showModal();
            });
        
            $(document).on('click', '.updateTeacher', function(){
                var id = $(this).attr('id');
                var x = $(this).parent().parent();
                var tdata = Array();
                    x.find('td').each(function(){
                        var curr = ($(this).text());
                        tdata.push(curr);
                    });
         
                var t_name = tdata[0];
                var t_collage = tdata[1];
                var t_dept = tdata[2];
                var t_degree = tdata[3];
                var t_phone = tdata[4];
               
                    var options = {
                        ajaxPrefix:''
                    };
                    new Dialogify('dash/user/form/add_teacher_form.php?t_name='+t_name+'&t_phone='+t_phone+'&t_degree='+t_degree, options)
                        .title('Edit Teacher ')
                            .buttons([{
                                text:'Cancle',
                                    click:function(e){
                                        this.close();
                                    }
                                },{
                                    text:'Edit',
                                    type:Dialogify.BUTTON_PRIMARY,
                                    click:function(e){
                                        var form_data = new FormData();
                                        form_data.append('tname', $('#tname').val());
                                        form_data.append('dname', $('#dname').val());
                                        form_data.append('dename', $('#dename').val());
                                        form_data.append('tphone', $('#tphone').val());
                                        form_data.append('id', id);
                                        $.ajax({
                                            method:"POST",
                                            url:'dash/user/update/update_teacher.php',
                                            data:form_data,
                                            dataType:'json',
                                            contentType:false,
                                            cache:false,
                                            processData:false,
                                            success:function(data){
                                                if(data.success != '')
                                                    $('#teacher_res').html('<div class="alert alert-danger">'+data.success+'</div>');
                                                    dataTeacher.ajax.reload();
                                                    window.setTimeout(function(){
                                                    $('#teacher_res').html('');
                                                },2000);
                                            }
                                        });
                                    }
                                }
                            ]).showModal();
                    });
        
            $(document).on('click', '.deleteTeacher', function(){
                var id = $(this).attr('id');
                Dialogify.confirm("<h5 class='text-danger'><b>?Are you sure you want to remove</b></h5>", {
                ok:function(){
                    $.ajax({
                        url:"dash/user/delete/delete_teacher.php",
                        method:"POST",
                        data:{id:id},
                        success:function(data){
                            dataTeacher.ajax.reload();
                        }
                    })
                },
                cancel:function(){
                    this.close();
                }
                });
            });
        }else if(now == '.users'){
            $('#user_data').DataTable().destroy();
            var dataTable = $('#user_data').DataTable({
                "processing":true,
                "serverSide":true,
                "autoWidth":false,
                "order":[],
                dom: "<'mx-auto'"+
                "<'row '"+
                ">"+
                "<'row '"+
                    "<'col-12 mx-auto't>"+
                ">"+
                "<'row mt-2'"+
                    "<'col-10 text-center'i>"+
                ">"+">", 
                "ajax":{
                    url:"dash/user/fetch.php",
                    type:"POST",
                    data:{
                        key:'user'
                    }
                    },
                    "columnDefs":[
                        {
                            "targets": [0,1,2,3],"orderable":false
                       },{
                            
                        }
                    ],
            });
        
            $('#add_user').click(function(){
                var options = {
                ajaxPrefix:''
                };
                new Dialogify('dash/user/form/add_data_form.php', options)
                .title('Add New User')
                .buttons([{
                    text:'Cancle',
                    click:function(e){
                    this.close();
                    }
                },
                {
                    text:'Insert',
                    type:Dialogify.BUTTON_PRIMARY,
                    click:function(e){
                        var form_data = new FormData();
                        form_data.append('name', $('#name').val());
                        form_data.append('gender', $('#gender').val());
                        form_data.append('designation', $('#designation').val());
                        $.ajax({
                            method:"POST",
                            url:'dash/user/insert/insert_user.php',
                            data:form_data,
                            dataType:'json',
                            contentType:false,
                            cache:false,
                            processData:false,
                            success:function(data){
                                if(data.success != ''){
                                    $('#user_res').html('<div class="alert alert-danger">'+data.success+'</div>');
                                    dataTable.ajax.reload();
                                    window.setTimeout(function(){
                                        $('#user_res').html('');
                                    },2000);
                                    }
                                }
                            });
                        }
                    }
                ]).showModal();
            });
        
            $(document).on('click', '.update', function(){
                var id = $(this).attr('id');
                var x = $(this).parent().parent();
                var udata = Array();
                    x.find('td').each(function(){
                        var curr = ($(this).text());
                        udata.push(curr);
                    });
                var user_name = udata[0];
                var pass = udata[1];
                var role = udata[2];
                    var options = {
                        ajaxPrefix:''
                    };
                    new Dialogify('dash/user/form/add_data_form.php?user_name='+user_name+'&pass='+pass+'&role='+role, options)
                        .title('Edit User Data')
                            .buttons([{
                                text:'Cancle',
                                    click:function(e){
                                        this.close();
                                    }
                                },{
                                    text:'Edit',
                                    type:Dialogify.BUTTON_PRIMARY,
                                    click:function(e){
                                        //var image_data = $('#images').prop("files")[0];
                                        var form_data = new FormData();
                                        
                                        form_data.append('name', $('#name').val());
                                        form_data.append('password', $('#designation').val());
                                        
                                        form_data.append('role', $('#gender').val());
                                        
                                        form_data.append('id', id);
                                        $.ajax({
                                            method:"POST",
                                            url:'dash/user/update/update_user.php',
                                            data:form_data,
                                            dataType:'json',
                                            contentType:false,
                                            cache:false,
                                            processData:false,
                                            success:function(data){
                                                if(data.success != ''){
                                                    $('#user_res').html('<div class="alert alert-success">'+data.success+'</div>');
                                                    dataTable.ajax.reload();
                                                    window.setTimeout(function(){
                                                        $('#user_res').html('');
                                                    },2000);
                                                }
                                            }
                                        });
                                    }
                                }
                            ]).showModal();
                    });
        
            $(document).on('click', '.delete', function(){
                var id = $(this).attr('id');
                Dialogify.confirm("<h5 class='text-danger'><b>?Are you sure you want to remove this User</b></h5>", {
                ok:function(){
                    $.ajax({
                        url:"dash/user/delete/delete_user.php",
                        method:"POST",
                        data:{id:id},
                        success:function(data){
                            dataTable.ajax.reload();
                        }
                    })
                },
                cancel:function(){
                    this.close();
                }
            });
            });
        }
    }
    showGraph();
});
function showGraph(){
    {
        $.post("dash/user/chart/data.php",
        function (data){
            var name = [];
            var marks = [];             
            for (var i in data) {
                name.push(data[i].cname);
                marks.push(data[i].num);
            }
            var Len = name.length;
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        label: 'Student Marks',
                        backgroundColor: "rgba(12, 161, 166, 0.3)",
                        borderColor: "rgba(12, 161, 166, 0.3)",
                        hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                        hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                        data: marks,
                        backgroundColor: setColor(Len)
                    }
                ]
            };

            var graphTarget = document.getElementById("myChart").getContext("2d");
            var barGraph = new Chart(graphTarget, {
                type: 'pie',
                data: chartdata
            });
        });
    }
    
    {
        $.post("dash/user/chart/chart8.php",
        function (data){
            var name = [];
            var marks = [];             
            for (var i in data) {
                name.push(data[i].added);
                marks.push(data[i].num);
            }
            var Len = name.length;
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        label: 'Student Marks',
                        backgroundColor: "rgba(12, 161, 166, 0.3)",
                        borderColor: "rgba(12, 161, 166, 0.3)",
                        hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                        hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                        data: marks,
                        backgroundColor: setColor(Len)
                    }
                ]
            };

            var graphTarget = document.getElementById("myChart8").getContext("2d");
            var barGraph = new Chart(graphTarget, {
                type: 'pie',
                data: chartdata
            });
        });
    }
    //discharge vs collage
    {
        $.post("dash/user/chart/dis_collage.php",
        function (data){
            var name = [];
            var marks = [];             
            for (var i in data) {
                name.push(data[i].cname);
                marks.push(data[i].num);
            }
            var Len = name.length;
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        label: 'Student Marks',
                        backgroundColor: "rgba(12, 161, 166, 0.3)",
                        borderColor: "rgba(12, 161, 166, 0.3)",
                        hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                        hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                        data: marks,
                        backgroundColor: setColor(Len)
                    }
                ]
            };

            var graphTarget = document.getElementById("disCollage").getContext("2d");
            var barGraph = new Chart(graphTarget, {
                type: 'pie',
                data: chartdata
            });
        });
    } 
    
    //discharge vs degree
    {
        $.post("dash/user/chart/dis_degree.php",
        function (data){
            var name = [];
            var marks = [];             
            for (var i in data) {
                name.push(data[i].dename);
                marks.push(data[i].num);
            }
            var Len = name.length;
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        label: 'Student Marks',
                        backgroundColor: "rgba(12, 161, 166, 0.3)",
                        borderColor: "rgba(12, 161, 166, 0.3)",
                        hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                        hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                        data: marks,
                        backgroundColor: setColor(Len)
                    }
                ]
            };

            var graphTarget = document.getElementById("disDegree").getContext("2d");
            var barGraph = new Chart(graphTarget, {
                type: 'pie',
                data: chartdata
            });
        });
    }

    
    {
    $.post("dash/user/chart/data1.php",
    function (data1){
        var mark = [];
            mark.push(data1['currentResearch']);
            mark.push(data1['finishedResearch']);
            var num_of_rows1= data1['all'];
            $("#num").html('عدد كل الأبحاث :  '+num_of_rows1);
        var name =['الجارية','المنتهية'];
        var Len = mark.length;
        var chartdata1 = {
            labels: name,
            datasets: [
                {
                    label: 'Student Marks',
                    backgroundColor: "rgba(12, 161, 166, 0.3)",
                    borderColor: "rgba(12, 161, 166, 0.3)",
                    hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                    hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                    data: mark,
                    backgroundColor: setColor(Len)
                }
            ]
        };
  
        var graphTarget1 = $("#myChart1");
        var barGraph1 = new Chart(graphTarget1, {
            type: 'doughnut',
            data: chartdata1
            });
        });
    }
          

   {
        $.post("dash/user/chart/chart.php",
        function (data)
        {   
            var name = [];
            var marks = []; 
            for (var i in data) {
                name.push(data[i].donor);
                marks.push(data[i].num);
        
            }
            var Len = name.length;
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        label: 'number of research per donor',
                        backgroundColor: "transparent",
                        borderColor: "rgba(200,0,0,0.0001)",
                        hoverBackgroundColor: 'rgba(199,22,222,0.3)',
                        fill: false,
                        radius: 6,
                        pointRadius: 6,
                        pointBorderWidth: 3,
                        pointBackgroundColor: "orange",
                        pointBorderColor: "rgba(200,33,200,0.6)",
                        pointHoverRadius: 10,
                        hoverBorderColor: 'rgba(199,222,222,0.1)',
                        data: marks,
                        backgroundColor: setColor3(Len)
                    }
                ]
            };

            var graphTarget3 = document.getElementById("myChart3");

            var barGraph3 = new Chart(graphTarget3, {
                type: 'polarArea',
                data: chartdata
            });
        });
    }

var arrayOfColor3=[];

var d3= ['rgba(0,0,0,0.2)', "rgba(255, 87, 34, 0.3)","rgba(3, 169, 244, 0.3)","rgba(233, 30, 99, 0.3)","rgba(255, 193, 7, 0.3)","rgba(156, 39, 176, 0.3)",
"rgba(13, 71, 161, 0.3)","rgba(12, 161, 166, 0.3)",'#00008B','#000000','#8B0000','#008000','#FFD700','#FF69B4','#8B008B','#778899','#FF4500','#A0522D','#000080','#556B2F','#FF1493','#00FFFF','#7FFF00','#DDA0DD','#708090'];
function setColor3(num){
    for (var i=0;i<num;i++)
      
        arrayOfColor3.push(d3[i]);
      
    return arrayOfColor3;
}

// number of foreign teacher per collage 

{
    $.post("dash/user/chart/chart1.php",
    function (data){   
        var name = [];
        var marks = [];
        for (var i in data) {
            name.push(data[i].cname);
            marks.push(data[i].num);
        }
        var Len = name.length;
        var chartdata = {
            labels: name,
            datasets: [
                {
                    label: 'number of foreign teacher per collage ',
                    backgroundColor: "rgba(12, 161, 166, 0.3)",
                    borderColor: "rgba(12, 161, 166, 0.3)",
                    hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                    hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                    data: marks,
                    backgroundColor: setColor(Len)
                       //data: [2478,5267,734,784,433]
                    }
                ]
            };

            var graphTarget4 = document.getElementById("myChart4");

            var barGraph4 = new Chart(graphTarget4, {
                type: 'bar',
                data: chartdata,
                options: {
                    scales: {
                        xAxes: [{
                            stacked: false
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }   
               
            });
        });
}

var arrayOfColor4=[];



//number foreign teacher per edu

   {
        $.post("dash/user/chart/chart2.php",
        function (data){   
            var name = [];
            var marks = [];
             
            for (var i in data) {
                name.push(data[i].edu);
                marks.push(data[i].num);
           
            }
            var Len = name.length;
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        label: 'number of foreign teacher by edu  ',
                        backgroundColor: "rgba(12, 161, 166, 0.3)",
                        borderColor: "rgba(12, 161, 166, 0.3)",
                        hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                        hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                        data: marks,
                        backgroundColor: setColor(Len)
                    }
                ]
            };

            var graphTarget5 = document.getElementById("myChart5");

            var barGraph5 = new Chart(graphTarget5, {
                type: 'bar',
                data: chartdata,
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
                
               
            });
        });
    }


// discharge

   {
        $.post("dash/user/chart/chart3.php",
        function (data)
        {   
         
             var name = [];
            var marks = [];
            
             
            for (var i in data) {
                name.push(data[i].edu);
                marks.push(data[i].num);
                
            }
            var Len = name.length;
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        label: 'number of dicharge per edu  ',
                        backgroundColor: "rgba(12, 161, 166, 0.3)",
                        borderColor: "rgba(12, 161, 166, 0.3)",
                        hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                        hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                        data: marks,
                        backgroundColor: setColor(Len)
                       //data: [2478,5267,734,784,433]
                    }
                ]
            };

            var graphTarget6 = document.getElementById("myChart6");

            var barGraph6 = new Chart(graphTarget6, {
                type: 'bar',
                data: chartdata,
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
                
               
            });
        });
    }



// journal

  
   {
        $.post("dash/user/chart/chart4.php",
        function (data)
        {   
            
             var name = [];
            var marks = [];
            
             
            for (var i in data) {
                name.push(data[i].name);
                marks.push(data[i].cur);
                
            }
            var Len = name.length;
            var chartdata = {
                labels: name,
                datasets: [
                    {
                        label: 'journal  ',
                        backgroundColor: "rgba(12, 161, 166, 0.3)",
                        borderColor: "rgba(12, 161, 166, 0.3)",
                        hoverBackgroundColor: "rgba(12, 161, 166, 0.3)",
                        hoverBorderColor: "rgba(12, 161, 166, 0.3)",
                        data: marks,
                        backgroundColor: setColor(Len)
                       //data: [2478,5267,734,784,433]
                    }
                ]
            };

            var graphTarget7 = document.getElementById("myChart7");

            var barGraph6 = new Chart(graphTarget7, {
                type: 'doughnut',
                data: chartdata,
                options: {
                   /* scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }*/
                }
                
               
            });
        });
    }

    function dynamicColors() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ", 0.9)";
    }
    function setColor(a) {
        var pool = [];
        for(i = 0; i < a; i++) {
            pool.push(dynamicColors());
        }
        return pool;
    }


}


