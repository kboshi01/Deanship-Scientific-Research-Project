$(document).ready(function(){
    if(localStorage.getItem('name') == 'notify'){
        var now = "disEnd";
        $('.main').addClass('collapse');
        $('input.green').addClass('collapse');
        $('input.orange').addClass('collapse');
        $('#t_disEnd').removeClass('collapse');
        $('#search-disEnd').removeClass('collapse');
        $('#reset-disEnd').removeClass('collapse');
        $('#grap').html('انتهاء الإجازة العلمية');
        $('title').html('انتهاء الإجازة العلمية');
        localStorage.setItem('name'," ");
    }else{
        var now = "research";
    }
    var navList = $('.labeled a');
    navList.click(function(){
        if($(this)[0].name != now){
            $('.main').addClass('collapse');
            $('input.green').addClass('collapse');
            $('input.orange').addClass('collapse');
            $('.vertical a.item').removeClass('bold');
            $(this).addClass('bold');
            now = $(this)[0].name;
            $('#t_'+now+'').removeClass('collapse');
            $('#search-'+now+'').removeClass('collapse');
            $('#reset-'+now+'').removeClass('collapse');
            var grap = $(this)[0].text;
            $('#grap').html(grap);
            $('title').html(grap);
            $('.set').val("");
            if(now == 'journal' || now == 'don' || now == 'allowance'){
                $('#rangestart').addClass('hide');
                $('#rangeend').addClass('hide');
            }else{
                $('#rangestart').removeClass('hide');
                $('#rangeend').removeClass('hide');
            }
            Main(now);
        }
    });
    Main(now);
    
    //MAIN FUNCTION 
    function Main(now){
        //formatter functions
        var deleted = function(cell, formatterParams){ //plain text value
            return "<i class='ui icon trash teal'></i>";
        };

        //date formatter
        var date = function(cell, formatterParams){
            p= {
                inputFormat:"YYYY-MM-DD",
                outputFormat:"DD/MM/YY",
                invalidPlaceholder:"",
            }
            return p;
        }

        var startValidator = function(cell, value,parameters){
            var end = cell.getRow().getData().end;
            if(!Date.parse(end))
                return true;                
            else
                return (value <= end);
        }
        var endValidator = function(cell, value,parameters){
            var start = cell.getRow().getData().start;
            if(!value)
                return true;
            else
                return (value >= start);
        }
        var rvdfValidator = function(cell, value,parameters){
            var end = cell.getRow().getData().RVDT;
            return (value <= end);
        }
        var rvdtValidator = function(cell, value,parameters){
            var start = cell.getRow().getData().RVDF;
            return (value >= start);
        }
       

        //number validator
        var numericValidator  = ["min:0", "numeric"];

        //degree options
        var degree = {
            0:"",
            1:"أستاذ",
            2:"أستاذ مشارك",
            3:"أستاذ مساعد",
            4:"محاضر",
            5:"مساعد تدريس"
        };

        if(now == 'research'){
            var x = function(cell, formatterParams){
                var currency = cell.getRow().getData().currency;
                if(currency == 2){
                    t= {
                            decimal:".",
                            thousand:",",
                            symbol:"$",
                            symbolAfter:false,
                            precision:false,
                        }
                }else{
                    t= {
                        decimal:".",
                        thousand:",",
                        symbolAfter:false,
                        precision:false,
                    }
                }
                return t;
            }

            var research = new Tabulator("#research", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"research" },
                ajaxConfig:"POST",
                columnMinWidth:10,
                printAsHtml:true,
                printCopyStyle:true,
                tooltips: true, //Tool tip value
                tooltipsHeader: true, //Tool tip for headers
                tooltipGenerationMode: "load", //when to generate tooltips
                printHeader:"<h5>الأبحاث العلمية</h5>",
                printFooter:"<h5></h5>",
                printFormatter:function(tableHolderElement, tableElement){
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                resizableRows:true,
                layout:"fitColumns",
                placeholder:"No Data",
                columns:[
                    {title:'حذف',formatter:deleted, align:"center",print:false,width:32,minWidth:32,headerSort:false,resizable:false, cellClick:function(e, cell){
                        var id = cell.getRow().getData().tid;
                        if(confirm('Are you sure '+cell.getRow().getData().ren+'?')){
                            $.ajax({
                                url:"report/includes/fetch.php",
                                method:"POST",
                                data:{
                                    now: 'delete',
                                    table:'research',
                                    id:id
                                },
                                success:function(data){
                               
                                    research.setData();
                                }
                            })
                        }
                    }},
                    {title:"added by ", field:"added_by", align:"center", sorter:"string",visible:false},
                    {title:" الأجهزة", field:"device", align:"right", sorter:"string",editor:'textarea',headerSort:false,minWidth:160,widthGrow:3/10},
                    {title:"المستخلص ", field:"abstract", align:"right", sorter:"string",headerSort:false,minWidth:190,widthGrow:5/10,editor:'textarea',/*formatter:""*/},
                    {title:" التقييم", field:"rate", align:"center", sorter:"number",resizable:false,width:45,minWidth:41,editor:"number",formatter:'money',formatterParams:{
                        symbol:"%",
                        symbolAfter:true,
                        precision:false,},  validator:["min:0", "max:100", "numeric"]},
                    {title:"المبلغ", field:"amount", align:"center", sorter:"number",width:80,minWidth:80,formatter:'money',formatterParams:x,editor:"number"},
                    {title:"الجهة المانحة", field:"donor", align:"", sorter:"string",minWidth:158,widthGrow:2/10,editor:"autocomplete",editorParams:{values:true,freetext:true}},
                    {title:"تاريخ الإنتهاء", field:"end",resizable:false, align:"center", sorter:"string",width:77,minWidth:77,editor:'dateEditor',validator:[endValidator, "required"],formatter:"datetime", formatterParams:date},
                    {title:"تاريخ البداية", field:"start",resizable:false, align:"center", sorter:"string",width:70,minWidth:70,editor:'dateEditor',validator:[startValidator,"required"],formatter:"datetime", formatterParams:date},
                    {title:"رقم الهاتف", field:"phone",resizable:false, sorter:"number", align:"",visible:false,editor:true},
                    {title:"الدرجة العلمية", field:"dename",resizable:false, sorter:"string",visible:false,width:90,minWidth:90},
                    {title:" القسم", field:"dname",sorter:"string",width:98,minWidth:98},
                    {title:"الكلية", field:"cname", sorter:"string",width:119,minWidth:119},
                    {title:"أسم الباحث", field:"ren", sorter:"string",width:128,minWidth:128},
                    {title:"أسم البحث", field:"research-name",sorter:"string",editor:'input',validator:"required",width:145,minWidth:145},
                    {title:"#", field:"id",sorter:"number",resizable:false, headerSort:false,width:41,minWidth:41},
                    ],
            });   

            function customFilter(data){
                endDate = $('#end_date').val();
                startDate = $('#start_date').val();
                if(startDate && endDate)
                    return data.end <= endDate && data.end >= startDate;
            }
            
            $('#search-research').click(function(){
                
                if($('#end_date').val() && $('#start_date').val())
                        research.setFilter(customFilter);
            }); 
            
            function updateFilter(){
                var filter1 =  $("#filter-field-research-1").val();
                var filter2 =  $("#filter-field-research-2").val();
                var filter3 =  $("#filter-field-research-3").val();
                var value1 = $("#filter-value-research-1").val();
                var value2 = $("#filter-value-research-2").val();
                var value3 = $("#filter-value-research-3").val();
                var type = $("#filter-type-research").val();
                if(!filter1){
                    filter1="ren";
                    value1="";
                }
                if(!filter2){
                    filter2="ren";
                    value2='';
                }
                if(!filter3){
                    filter3="ren";
                    value3='';
                }
                if(filter1 == 'start')
                    value1 = value1+'-';
                if(filter2 == 'start')
                    value2 = value2+'-';
                if(filter3 == 'start')
                    value3 = value3+'-';
                research.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-research-1, #filter-field-research-2,#filter-field-research-3,#filter-type-research").change(updateFilter);
            $("#filter-value-research-1,#filter-value-research-2,#filter-value-research-3,#filter-type-research").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-research").click(function(){
           
                $("#filter-field-research-1").val("").change();
                $("#filter-field-research-2").val("").change();
                $("#filter-field-research-3").val("").change();
                $("#filter-value-research-1").val("");
                $("#filter-value-research-2").val("");
                $("#filter-value-research-3").val("");
                $("#filter-type-research").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                research.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_research .visibility .item').click(function(){
              
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    research.hideColumn(this.id);
                    research.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    research.showColumn(this.id);
                    research.redraw();
                }
            });
                            
            $("#print-research").on("click", function(){
                research.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-research").click(function(){
                research.download("xlsx", "research report.xlsx", {sheetName:"Research"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-research").click(function(){
                research.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"Example Report", //add title to report
                });
            });
            //END OF RESEARCH
            // START OF JOURNAL
        }else if(now == 'allowance'){
            var allowance = new Tabulator("#allowance", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"allowance" },
                ajaxConfig:"POST",
                columnMinWidth:10,
                printAsHtml:true,
                printCopyStyle:true,
                tooltips: true, //Tool tip value
                tooltipsHeader: true, //Tool tip for headers
                tooltipGenerationMode: "load", //when to generate tooltips
                printHeader:"<h5> Allowance for scientific publishing</h5>",
                printFooter:"<h5></h5>",
                printFormatter:function(tableHolderElement, tableElement){
                    //tableElement.css('direction')="ltr";
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                resizableRows:true,
                layout:"fitColumns",
                placeholder:"No Data",
                columns:[
                    {title:"No.",align:"left", field:"id",sorter:"number",resizable:false, headerSort:false,width:41,minWidth:41},
                    {title:"Researcher's name", field:"researcher",align:"center", sorter:"string",width:170,minWidth:170},
                    {title:"Collage", field:"cname", sorter:"string",align:"center",width:180,minWidth:180},
                    {title:"Department", field:"dname",sorter:"string",align:"center",width:180,minWidth:180},
                    {title:"Degree", field:"dename",resizable:false,align:"center", sorter:"string",width:100,minWidth:100},
                    {title:"Journal name", field:"a_journal",sorter:"string",align:"left",editor:'input',validator:"required",minWidth:160,widthGrow:5/10},
                    {title:"Title of the article", field:"title", align:"left", sorter:"string",editor:'textarea',minWidth:160,widthGrow:5/10},
                    {title:"Year of publication", field:"year", align:"center", sorter:"number",width:87,minWidth:87,editor:"number",validator:["min:1900","max:2100"]},
                    {title:"No. pages", field:"pages", align:"center", sorter:"string",width:70,minWidth:70,editor:"input",},
                    {title:"No. papers", field:"paper", align:"center", sorter:"string",width:70,minWidth:70,editor:"input",},
                    {title:"added by ", field:"added_by", align:"center", sorter:"string",visible:false},
                    {title:'Del',formatter:deleted, align:"center",print:false,width:32,minWidth:32,headerSort:false,resizable:false, cellClick:function(e, cell){
                        var id = cell.getRow().getData().tid;
                        if(confirm('Are you sure '+cell.getRow().getData().journal+'?')){
                            $.ajax({
                                url:"report/includes/fetch.php",
                                method:"POST",
                                data:{
                                    now: 'delete',
                                    table:'allowance',
                                    id:id
                                },
                                success:function(data){
                                    allowance.setData();
                                }
                            })
                        }
                    }},
                    ],
            });   

            
            function updateFilter(){
                var filter1 =  $("#filter-field-allowance-1").val();
                var filter2 =  $("#filter-field-allowance-2").val();
                var filter3 =  $("#filter-field-allowance-3").val();
                var value1 = $("#filter-value-allowance-1").val();
                var value2 = $("#filter-value-allowance-2").val();
                var value3 = $("#filter-value-allowance-3").val();
                var type = $("#filter-type-allowance").val();
                if(!filter1){
                    filter1="researcher";
                    value1="";
                }
                if(!filter2){
                    filter2="researcher";
                    value2='';
                }
                if(!filter3){
                    filter3="researcher";
                    value3='';
                }
              
                allowance.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-allowance-1, #filter-field-allowance-2,#filter-field-allowance-3,#filter-type-allowance").change(updateFilter);
            $("#filter-value-allowance-1,#filter-value-allowance-2,#filter-value-allowance-3,#filter-type-allowance").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-allowance").click(function(){
           
                $("#filter-field-allowance-1").val("").change();
                $("#filter-field-allowance-2").val("").change();
                $("#filter-field-allowance-3").val("").change();
                $("#filter-value-allowance-1").val("");
                $("#filter-value-allowance-2").val("");
                $("#filter-value-allowance-3").val("");
                $("#filter-type-allowance").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                allowance.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_allowance .visibility .item').click(function(){
              
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    allowance.hideColumn(this.id);
                    allowance.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    allowance.showColumn(this.id);
                    allowance.redraw();
                }
            });
                            
            $("#print-allowance").on("click", function(){
                allowance.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-allowance").click(function(){
                allowance.download("xlsx", "allowance report.xlsx", {sheetName:"allowance"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-allowance").click(function(){
                research.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"allowance Report", //add title to report
                });
            });
            $('#t_allowance .tabulator-col-title').attr('style','text-align:left !important');
            $('#t_allowance .tabulator-arrow').attr('style','right:1px;left:unset');
            //END OF RESEARCH
            // START OF JOURNAL
        }
        else if(now == 'journal'){
            var selector = {
                1:"نعم",
                2:"لا",
                3:"احيانا",
                4:"غير معلوم",
            };
            var journal = new Tabulator("#journal", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"journal" },
                ajaxConfig:"POST",
                columnMinWidth:10,
                printAsHtml:true,
                printCopyStyle:true,
                tooltips: true, //Tool tip value
                tooltipsHeader: true, //Tool tip for headers
                tooltipGenerationMode: "load", //when to generate tooltips
                printFormatter:function(tableHolderElement, tableElement){
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
              
                },
                //printHeader:"<h5> المجلات العلمية</h5>",
                // printFooter:"<h5></h5>",
                resizableRows:true,
                layout:"fitColumns",
                placeholder:"No Data",
                //columnVertAlign:"bottom", //align header contents to bottom of cell
                columns:[
                    // {formatter:"responsiveCollapse", width:30, minWidth:30, align:"center",print:false, resizable:false, headerSort:false},
                    {title:'حذف',formatter:deleted, align:"center",print:false,width:32,minWidth:32,headerSort:false, resizable:false, cellClick:function(e, cell){
                        var id = cell.getRow().getData().tid;
                        if(confirm('Are you sure '+cell.getRow().getData().nameAr+'?')){
                            $.ajax({
                                url:"report/includes/fetch.php",
                                method:"POST",
                                data:{
                                    now: 'delete',
                                    table:'journal',
                                    id:id
                                },
                                success:function(data){
                           
                                    journal.setData();
                                }
                            })
                        }
                    }},
                    {title:"added by", field:"added_by", align:"center", sorter:"string",visible:false,width:100,resizable:false,},
                    {title:"Phone", field:"phone", align:"center", sorter:"string",editor:"input",visible:false,width:100,resizable:false,},
                    {title:"Email", field:"email", align:"", sorter:"string",editor:"input",visible:false,width:100,resizable:false,},
                    {title:"Impact Factor", field:"impactFactor", align:"center", resizable:false,sorter:"number",editor:"number",validator:numericValidator,visible:false,width:115,},
                    {title:"الحلول", field:"journalSolutio", align:"right", sorter:"string",editor:"input",visible:false,width:120,},
                    {title:"المشاكل", field:"journalProblem", align:"right", sorter:"string",editor:"input",visible:false,width:120, },
                    {title:"الموارد البشرية", field:"journalHr", align:"right", sorter:"string",editor:"input",visible:false,width:120,minWidth:120},
                    {title:"مقتنيات المجلة", field:"journalAssets", align:"right", sorter:"string",editor:"input",visible:false,minWidth:120,widthGrow:2/5},
                    {title:"مجالات النشر", field:"publishArea", align:"right", sorter:"string",editor:"input",minWidth:122,widthGrow:5/10},
                    {title:"مصادر الدخل", field:"incomeResource", align:"right", sorter:"string",editor:"input",visible:false,minWidth:120,widthGrow:3/10},
                    {title:"اسباب و فترات توقف الإصدار", field:"stopReason", align:"right", sorter:"string",editor:"input",visible:false,width:120,},
                    {title:"مجاني", field:"freeArbitrationf", align:"center", sorter:"string",editor:"select", editorParams:selector,width:43,minWidth:43},

                    {title:"مدفوع", field:"paidArbitration", align:"center", sorter:"string",editor:"input",width:70,minWidth:70},
                    {title:"عدد المحكين", field:"numArbitrator", align:"center", sorter:"string",editor:"input",width:77,minWidth:77},
                    {title:"تحكيم خارجي", field:"externalArbitrationf", align:"center", sorter:"string",editor:"select", editorParams:selector,width:42,minWidth:42},
                    {title:" تحكيم داخلي", field:"internalArbitrationf", align:"center", sorter:"string",editor:"select", editorParams:selector,width:42,minWidth:42},
                    {title:" عدد مرات الإصدار في السنة", field:"numPaperInYear", align:"center", sorter:"string",editor:"input",width:70,minWidth:70},
                    {title:"عدد الأوراق في كل إصدارة ", field:"numPaperInPublish", align:"center", sorter:"string",editor:"input",width:70,minWidth:70,visible:false},
                    {title:" الأعداد المنشورة حتي الان", field:"currentPublishPaper", align:"center",editor:"number",validator:numericValidator,width:51,minWidth:51},
                    {title:"تاريخ اول إصدار", field:"firstPublishDate", align:"right", sorter:"string",editor:"input",width:70,minWidth:70},
                    {//create column group
                        title:"طريقة النشر",
                            columns:[
                                {title:"إلكترونية", field:"spreadElecf", align:"center", sorter:"string",editor:"select", editorParams:selector,width:56,minWidth:56},
                                {title:"ورقية", field:"spreadPaperf", align:"center", sorter:"string",editor:"select", editorParams:selector,width:41,minWidth:41},
                            ]
                        },
                    {//create column group
                        title:"لغة الصدور",
                        columns:[
                            {title:" انجليزي", field:"publishEnf", align:"center", sorter:"string",editor:"select", editorParams:selector,width:50,minWidth:50},
                            {title:" عربي", field:"publishArf", sorter:"string", align:"center",editor:"select", editorParams:selector,width:40,minWidth:40}
                        ]
                    },
                    {//create column group
                        title:"طريقة الصدور",
                        columns:[
                            {title:" الكترونية", field:"publishElecf", sorter:"string",align:"center",editor:"select", editorParams:selector,width:56,minWidth:56},
                            {title:" ورقية", field:"publishPaperf",sorter:"string",align:"center", editor:"select", editorParams:selector,width:41,minWidth:41}
                        ]
                    },
                    {title:"رئيس التحرير", field:"editor",align:"right", sorter:"string",editor:'input',width:114,minWidth:114},
                    {//create column group
                        title:"اسم المجلة ",
                        columns:[
                            {title:"انجليزي", field:"nameEn",align:"left",sorter:"string",editor:'input',minWidth:140,widthGrow:2/10},
                            {title:" عربي", field:"nameAr",align:"right",sorter:"string",editor:'input',validator:"required",minWidth:145,widthGrow:3/10}
                        ]
                    },
                    {title:"#", field:"id",align:"right", headerSort:false,width:41,minWidth:41},
                ],
            });   
            
            function updateFilter(){
                var filter1 =  $("#filter-field-journal-1").val();
                var filter2 =  $("#filter-field-journal-2").val();
                var value1 = $("#filter-value-journal-1").val();
                var value2 = $("#filter-value-journal-2").val();
                var type = $("#filter-type-journal").val();
                if(!filter1){
                    filter1="nameAr";
                    value1="";
                }
                if(!filter2){
                    filter2="nameAr";
                    value2='';
                }
                journal.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}]]);
            }

            //Update filters on value change
            $("#filter-field-journal-1, #filter-field-journal-2,#filter-type-journal").change(updateFilter);
            $("#filter-value-journal-1,#filter-value-journal-2,#filter-type-journal").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-journal").click(function(){
                $("#filter-field-journal-1").val("").change();
                $("#filter-field-journal-2").val("").change();
                $("#filter-value-journal-1").val("").change();
                $("#filter-value-journal-2").val("").change();
                $("#filter-type-journal").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                journal.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_journal .visibility .item').click(function(){
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    journal.hideColumn(this.id);
                    journal.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    journal.showColumn(this.id);
                    journal.redraw();
                }
            });
                            
            $("#print-journal").on("click", function(){
                journal.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-journal").click(function(){
                journal.download("xlsx", "Journal report.xlsx", {sheetName:"journal"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-journal").click(function(){
                journal.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"Example Report", //add title to report
                });
            });
            //END OF Journal
            // START OF Discharge
        }
        else if(now == 'discharge'){
            var discharge = new Tabulator("#discharge", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"discharge" },
                ajaxConfig:"POST",
                layout:"fitColumns",
                //movableColumns:true,
                columnMinWidth:10,
                printAsHtml:true,
                printCopyStyle:true,  
                resizableRows:true,
                //layoutColumnsOnNewData: true,
                tooltips: true, //Tool tip value

                tooltipsHeader: true, //Tool tip for headers

                tooltipGenerationMode: "load", //when to generate tooltips
                printFooter:"<h5></h5>",
                printHeader:"<h5>إجازات التفرغ العلمي</h5>",
                printFormatter:function(tableHolderElement, tableElement){
                 
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                placeholder:"No Data",
                columns:[
                    {title:'حذف',formatter:deleted, align:"center",resizable:false,print:false,width:32,minWidth:32,headerSort:false, cellClick:function(e, cell){
                        var id = cell.getRow().getData().tid;
                        if(confirm('Are you sure '+cell.getRow().getData().tname+'?')){
                            $.ajax({
                                url:"report/includes/fetch.php",
                                method:"POST",
                                data:{
                                    now: 'delete',
                                    table:'discharge',
                                    id:id
                                },
                                success:function(data){
                          
                                    discharge.setData();
                                }
                            })
                        }
                    }},
                    {title:"النشاط المقترح ", field:"activity",headerSort:false,align:"right", sorter:"string",minWidth:100,widthGrow:1/3,editor:'textarea',/*formatter:""*/},
                    {title:"الدعم المقدم من المؤسسه", field:"support-edu",headerSort:false,align:"right", sorter:"string",minWidth:96,widthGrow:1/3,editor:'textarea',/*formatter:""*/},
                    {title:"الدعم المطلوب من الجامعة", field:"request-support",headerSort:false,align:"right", sorter:"string",minWidth:96,widthGrow:1/3,editor:'textarea',/*formatter:""*/},
                    {title:"added by ", field:"added_by", align:"", resizable:false,sorter:"string",visible:false},
                    {title:" تاريخ الترقية في حالة الأستاذ المساعد",align:"center", field:"promotion-date",sorter:"string",minWidth:80,width:80,editor:'dateEditor',formatter:"datetime", formatterParams:date},
                    {title:" تاريخ التعيين في الوظيفة الاولي",align:"center",field:"designation-date",sorter:"string",minWidth:80,width:80,editor:'dateEditor',formatter:"datetime",visible:false, formatterParams:date,minWidth:65,width:65},
                        {//create column group
                            title:"المؤسسه العلمية",
                            columns:[
                                {title:"البلد", field:"edu-countryf",sorter:"string",align:"right",minWidth:90,width:90},
                                {title:"الأسم", field:"edu-name",sorter:"string",editor:'input',minWidth:110,width:110},
                            ]
                        },
                            {//create column group
                                title:"اجازة التفرغ العلمي",
                                columns:[
                                    {title:"المدة", field:"request-vacation-num", align:"center", sorter:"number",minWidth:38,resizable:false,width:38},
                                    {title:"الي", field:"RVDT", align:"center", sorter:"string",editor:'dateEditor',resizable:false,validator:[rvdtValidator,"required"],minWidth:68,width:68,formatter:"datetime", formatterParams:date},
                                    {title:" من", field:"RVDF", align:"center", sorter:"string",editor:'dateEditor',resizable:false,validator:[rvdfValidator,"required"],minWidth:68,width:68,formatter:"datetime", formatterParams:date},
                                ]
                            },
                                {//create column group
                                    title:" الأستاذ",
                                    columns:[
                                        {title:"رقم الهاتف", field:"tphone", sorter:"number", align:"center",visible:false,minWidth:50,width:50,resizable:false,},
                                        {title:"الدرجة الوظيفية", field:"dename", sorter:"string",width:74,minWidth:74,resizable:false,},
                                        {title:" القسم", field:"deptname",sorter:"string",align:"right",minWidth:105,width:105},
                                        {title:"الكلية", field:"cname", sorter:"string",minWidth:115,width:115},
                                        {title:"الأسم", field:"tname",sorter:"string",align:"right",minWidth:120,width:120}
                                    ]
                                },
                                {title:"#", field:"id",sorter:"number", headerSort:false,width:41,minWidth:41,resizable:false,},
                ],
            });   

            function customFilter(data){
                endDate = $('#end_date').val();
                startDate = $('#start_date').val();
                if(startDate && endDate)
                    return data.RVDT <= endDate && data.RVDT >= startDate;
            }
            
            $('#search-discharge').click(function(){
                if($('#end_date').val() && $('#start_date').val())
                    discharge.setFilter(customFilter);  
            }); 
            
            function updateFilter(){
                var filter1 =  $("#filter-field-discharge-1").val();
                var filter2 =  $("#filter-field-discharge-2").val();
                var filter3 =  $("#filter-field-discharge-3").val();
                var value1 = $("#filter-value-discharge-1").val();
                var value2 = $("#filter-value-discharge-2").val();
                var value3 = $("#filter-value-discharge-3").val();
                var type = $("#filter-type-discharge").val();
                if(!filter1){
                    filter1="tname";
                    value1="";
                }
                if(!filter2){
                    filter2="tname";
                    value2='';
                }
                if(!filter3){
                    filter3="tname";
                    value3='';
                }
                if(filter1 == 'RVDF')
                    value1 = value1+'-';
                if(filter2 == 'RVDF')
                    value2 = value2+'-';
                if(filter3 == 'RVDF')
                    value3 = value3+'-';
                discharge.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-discharge-1, #filter-field-discharge-2,#filter-field-discharge-3,#filter-type-discharge").change(updateFilter);
            $("#filter-value-discharge-1,#filter-value-discharge-2,#filter-value-discharge-3,#filter-type-discharge").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-discharge").click(function(){
           
                $("#filter-field-discharge-1").val("").change();
                $("#filter-field-discharge-2").val("").change();
                $("#filter-field-discharge-3").val("").change();
                $("#filter-value-discharge-1").val("");
                $("#filter-value-discharge-2").val("");
                $("#filter-value-discharge-3").val("");
                $("#filter-type-discharge").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                discharge.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_discharge .visibility .item').click(function(){
               
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    discharge.hideColumn(this.id);
                    discharge.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    discharge.showColumn(this.id);
                    discharge.redraw();
                }
            });
                            
            $("#print-discharge").on("click", function(){
                discharge.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-discharge").click(function(){
                discharge.download("xlsx", "Discharge report.xlsx", {sheetName:"Discharge"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-discharge").click(function(){
                discharge.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"Discharge Report", //add title to report
                });
            });
            //END OF discharge
            // START OF foreighn
        }
        else if(now == 'foreign'){
            var foreign = new Tabulator("#foreign", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"foreign" },
                ajaxConfig:"POST",
                layout:"fitColumns",
                movableColumns:true,
                printAsHtml:true,
                printCopyStyle:true,
                printHeader:"<h5> منح الأساتذة الأجانب</h5>",
                printFooter:"<h5></h5>",   
                resizableRows:true,
                columnMinWidth:10,
                layoutColumnsOnNewData: true,
                tooltips: true, //Tool tip value

                tooltipsHeader: true, //Tool tip for headers

                tooltipGenerationMode: "load", //when to generate tooltips

                printConfig:{
                    columnGroups:true, //do not include column groups in column headers for HTML table
                    rowGroups:true, //do not include row groups in HTML table
                    columnCalcs:false, //do not include column calcs in HTML table
                },
                printFormatter:function(tableHolderElement, tableElement){
                  
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                //footerElement:"<h5 class='ui center aligned'></h5>",
                //headerElement:"<h5 class='ui center aligned'>The Footer</h5>",
                placeholder:"No Data",
                columns:[
                    {title:'حذف',formatter:deleted, align:"center",print:false,width:32,resizable:false,minWidth:32,headerSort:false, cellClick:function(e, cell){
                        var id = cell.getRow().getData().tid;
                        if(confirm('Are you sure to delete :  '+cell.getRow().getData().name+'?')){
                            $.ajax({
                                url:"report/includes/fetch.php",
                                method:"POST",
                                data:{
                                    now: 'delete',
                                    table:'foreign_teacher',
                                    id:id
                                },
                                success:function(data){
                                  
                                    foreign.setData();
                                }
                            })
                        }
                    }},
                    {title:"added by ", field:"added_by", align:"center", sorter:"string",visible:false,width:80},
                    {//create column group
                        title:"تفاصيل الزيارة",
                        columns:[
                            {title:"سبب الزيارة", field:"reason", align:"", sorter:"string",widthGrow:4/10,headerSort:false, editor:'textarea',/*formatter:""*/},
                            {title:"تاريخ انتهاء الزيارة", field:"end",resizable:false, align:"center",width:115,minWidth:115, sorter:"string",editor:'dateEditor',formatter:"datetime", formatterParams:date,validator:[endValidator]},
                            {title:" تاريخ بداية الزيارة", field:"start",resizable:false, align:"center",width:115,minWidth:115,sorter:"string",editor:'dateEditor',formatter:"datetime", formatterParams:date,validator:[startValidator]},
                            {title:"الكلية المستقبلة", field:"receive", sorter:"string",align:"",minWidth:140,widthGrow:1/10},
                        ]
                    },
                    {//create column group
                        title:" الأستاذ",
                        columns:[
                            {title:"الكلية", field:"collage", sorter:"string",editor:'input',minWidth:140,widthGrow:2/10},
                            {title:" الجامعة", field:"edu", sorter:"string",editor:'input',minWidth:160,widthGrow:1/10},
                            {title:"الأسم", field:"name",sorter:"string",align:"", editor:'input',validator:"required",minWidth:140,widthGrow:2/10}
                        ]
                    },
                    {title:"#", field:"id",sorter:"number", headerSort:false,width:41,minWidth:41,resizable:false,},
                ],
            });   

            function customFilter(data){
                endDate = $('#end_date').val();
                startDate = $('#start_date').val();
                if(startDate && endDate)
                    return data.end <= endDate && data.end >= startDate;
            }
            
            $('#search-foreign').click(function(){
                if($('#end_date').val() && $('#start_date').val())
                    foreign.setFilter(customFilter);  
            }); 
            
            function updateFilter(){
                var filter1 =  $("#filter-field-foreign-1").val();
                var filter2 =  $("#filter-field-foreign-2").val();
                var filter3 =  $("#filter-field-foreign-3").val();
                var value1 = $("#filter-value-foreign-1").val();
                var value2 = $("#filter-value-foreign-2").val();
                var value3 = $("#filter-value-foreign-3").val();
                var type = $("#filter-type-foreign").val();
                if(!filter1){
                    filter1="name";
                    value1="";
                }
                if(!filter2){
                    filter2="name";
                    value2='';
                }
                if(!filter3){
                    filter3="name";
                    value3='';
                }
                if(filter1 == 'start')
                    value1 = value1+'-';
                if(filter2 == 'start')
                    value2 = value2+'-';
                if(filter3 == 'start')
                    value3 = value3+'-';
                foreign.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-foreign-1, #filter-field-foreign-2,#filter-field-foreign-3,#filter-type-foreign").change(updateFilter);
            $("#filter-value-foreign-1,#filter-value-foreign-2,#filter-value-foreign-3,#filter-type-foreign").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-foreign").click(function(){
           
                $("#filter-field-foreign-1").val("").change();
                $("#filter-field-foreign-2").val("").change();
                $("#filter-field-foreign-3").val("").change();
                $("#filter-value-foreign-1").val("");
                $("#filter-value-foreign-2").val("");
                $("#filter-value-foreign-3").val("");
                $("#filter-type-foreign").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                foreign.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_foreign .visibility .item').click(function(){
               
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    foreign.hideColumn(this.id);
                    foreign.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    foreign.showColumn(this.id);
                    foreign.redraw();
                }
            });
                            
            $("#print-foreign").on("click", function(){
                foreign.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-foreign").click(function(){
                foreign.download("xlsx", "foreign report.xlsx", {sheetName:"foreign"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-foreign").click(function(){
                foreign.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"foreign Report", //add title to report
                });
            });
            //END OF foreign
            // START OF exhibition
        }
        else if(now == 'exhibition'){
            var exhibition = new Tabulator("#exhibition", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"exhibition" },
                ajaxConfig:"POST",
                layout:"fitColumns",

                columnMinWidth:10,
                movableColumns:true,
                printAsHtml:true,
                printCopyStyle:true,
                printHeader:"<h5>المعارض</h5>",
                printFooter:"<h5></h5>",  
                resizableRows:true,
                layoutColumnsOnNewData: true,
                tooltips: true, //Tool tip value

                tooltipsHeader: true, //Tool tip for headers

                tooltipGenerationMode: "load", //when to generate tooltips

                printFormatter:function(tableHolderElement, tableElement){
               
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                //footerElement:"<h5 class='ui center aligned'></h5>",
                //headerElement:"<h5 class='ui center aligned'>The Footer</h5>",
                placeholder:"No Data",
                columns:[
                    {title:'حذف',formatter:deleted, align:"center",print:false,width:32,minWidth:32,resizable:false,headerSort:false, cellClick:function(e, cell){
                        var id = cell.getRow().getData().tid;
                        if(confirm('Are you sure to delete :  '+cell.getRow().getData().name+'?')){
                            $.ajax({
                                url:"report/includes/fetch.php",
                                method:"POST",
                                data:{
                                    now: 'delete',
                                    table:'exhibition',
                                    id:id
                                },
                                success:function(data){
                                    
                                    exhibition.setData();
                                }
                            })
                        }
                    }},
                    {title:"added by ", field:"added_by", align:"", sorter:"string",resizable:false,visible:false},
                    {title:"المشاركين", field:"participant", align:"right",headerSort:false, sorter:"string",editor:'textarea',minWidth:150,widthGrow:5/10/*formatter:""*/},
                    {title:"تاريخ الإنتهاء ", field:"end", align:"center",minWidth:90,width:90,resizable:false, sorter:"string",editor:'dateEditor',validator:[endValidator], formatter:"datetime", formatterParams:date},
                    {title:" تاريخ البداية ", field:"start", align:"center",minWidth:90,width:90,resizable:false, sorter:"string",validator:[startValidator], editor:'dateEditor',formatter:"datetime", formatterParams:date},
                    {title:"الدرجة العلمية", field:"presenter-degree",minWidth:90,width:90, align:"center",resizable:false, sorter:"string",editor:"select", editorParams:degree},
                    {title:"المشرف", field:"presenter",sorter:"string",editor:'input',minWidth:150,width:150},
                    {title:"عدد المشاركين", field:"participant-num", align:"center",minWidth:90,width:90,resizable:false, sorter:"number",editor:"number",validator:numericValidator,},
                    {title:"المكان", field:"place",sorter:"string",editor:'input',minWidth:150,widthGrow:2/10,},
                    {title:"العنوان / الموضوع", field:"name",align:"right",sorter:"string",minWidth:150,widthGrow:3/10, editor:'input',validator:"required"},
                    {title:"#", field:"id",sorter:"number", headerSort:false,width:41,minWidth:41,resizable:false,},           ],
            });   

            function customFilter(data){
                endDate = $('#end_date').val();
                startDate = $('#start_date').val();
                if(startDate && endDate)
                    return data.end <= endDate && data.end >= startDate;
            }
            
            $('#search-exhibition').click(function(){
               
                if($('#end_date').val() && $('#start_date').val())
                    exhibition.setFilter(customFilter);  
            }); 
            
            function updateFilter(){
                var filter1 =  $("#filter-field-exhibition-1").val();
                var filter2 =  $("#filter-field-exhibition-2").val();
                var filter3 =  $("#filter-field-exhibition-3").val();
                var value1 = $("#filter-value-exhibition-1").val();
                var value2 = $("#filter-value-exhibition-2").val();
                var value3 = $("#filter-value-exhibition-3").val();
                var type = $("#filter-type-exhibition").val();
                if(!filter1){
                    filter1="name";
                    value1="";
                }
                if(!filter2){
                    filter2="name";
                    value2='';
                }
                if(!filter3){
                    filter3="name";
                    value3='';
                }
                if(filter1 == 'start')
                    value1 = value1+'-';
                if(filter2 == 'start')
                    value2 = value2+'-';
                if(filter3 == 'start')
                    value3 = value3+'-';
                exhibition.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-exhibition-1, #filter-field-exhibition-2,#filter-field-exhibition-3,#filter-type-exhibition").change(updateFilter);
            $("#filter-value-exhibition-1,#filter-value-exhibition-2,#filter-value-exhibition-3,#filter-type-exhibition").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-exhibition").click(function(){
           
                $("#filter-field-exhibition-1").val("").change();
                $("#filter-field-exhibition-2").val("").change();
                $("#filter-field-exhibition-3").val("").change();
                $("#filter-value-exhibition-1").val("");
                $("#filter-value-exhibition-2").val("");
                $("#filter-value-exhibition-3").val("");
                $("#filter-type-exhibition").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                exhibition.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_exhibition .visibility .item').click(function(){
              
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    exhibition.hideColumn(this.id);
                    exhibition.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    exhibition.showColumn(this.id);
                    exhibition.redraw();
                }
            });
                            
            $("#print-exhibition").on("click", function(){
                exhibition.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-exhibition").click(function(){
                exhibition.download("xlsx", "exhibition report.xlsx", {sheetName:"exhibition"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-exhibition").click(function(){
                exhibition.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"exhibition Report", //add title to report
                });
            });
            //END OF exhibition
            // START OF workshop
        }
        else if(now == 'workshop'){
            var workshop = new Tabulator("#workshop", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"workshop" },
                ajaxConfig:"POST",
                layout:"fitColumns",
                columnMinWidth:10,
                movableColumns:true,
                printAsHtml:true,
                printCopyStyle:true,
                printHeader:"<h5>الورش</h5>",
                printFooter:"<h5></h5>", 
                resizableRows:true,
                layoutColumnsOnNewData: true,
                tooltips: true, //Tool tip value

                tooltipsHeader: true, //Tool tip for headers

                tooltipGenerationMode: "load", //when to generate tooltips

                
                printFormatter:function(tableHolderElement, tableElement){
               
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                //footerElement:"<h5 class='ui center aligned'></h5>",
                //headerElement:"<h5 class='ui center aligned'>The Footer</h5>",
                placeholder:"No Data",
                columns:[
                    {title:'حذف',formatter:deleted, align:"center",print:false,width:32,minWidth:32,resizable:false,headerSort:false, cellClick:function(e, cell){
                        var id = cell.getRow().getData().tid;
                        if(confirm('Are you sure to delete :  '+cell.getRow().getData().name+'?')){
                            $.ajax({
                                url:"report/includes/fetch.php",
                                method:"POST",
                                data:{
                                    now: 'delete',
                                    table:'workshop',
                                    id:id
                                },
                                success:function(data){
                                 
                                    workshop.setData();
                                }
                            })
                        }
                    }},
                    {title:"added by ", field:"added_by", align:"", sorter:"string",visible:false,resizable:false,},
                    {title:"المشاركين", field:"participant", align:"right", sorter:"string",editor:'textarea',minWidth:150,widthGrow:5/10,headerSort:false/*formatter:""*/},
                    {title:"تاريخ الإنتهاء ", field:"end",resizable:false, align:"center",minWidth:90,width:90, sorter:"string",validator:[endValidator], editor:'dateEditor',formatter:"datetime", formatterParams:date},
                    {title:" تاريخ البداية ", field:"start",resizable:false, align:"center",minWidth:90,width:90,sorter:"string",validator:[startValidator], editor:'dateEditor',formatter:"datetime", formatterParams:date},
                    {title:"الدرجة العلمية", field:"presenter-degree",resizable:false, align:"center",minWidth:90,width:90, sorter:"string",editor:"select", editorParams:degree},
                    {title:"المقدم", field:"presenter",sorter:"string",editor:'input',minWidth:150,width:150},
                    {title:"عدد المشاركين", field:"participant-num",minWidth:90,width:90,align:"center", sorter:"number",editor:"number",validator:numericValidator,},
                    {title:"المكان", field:"place",sorter:"string",editor:'input',minWidth:150,widthGrow:2/10},
                    {title:"العنوان / الموضوع", field:"name",sorter:"string",minWidth:150,widthGrow:3/10,editor:'input',validator:"required"},
                    {title:"#", field:"id",sorter:"number",resizable:false, headerSort:false,width:41,minWidth:41},                ],
            });   

            function customFilter(data){
                endDate = $('#end_date').val();
                startDate = $('#start_date').val();
                if(startDate && endDate)
                    return data.end <= endDate && data.end >= startDate;
            }
            
            $('#search-workshop').click(function(){
               
                if($('#end_date').val() && $('#start_date').val())
                    workshop.setFilter(customFilter);  
            }); 
            
            function updateFilter(){
                var filter1 =  $("#filter-field-workshop-1").val();
                var filter2 =  $("#filter-field-workshop-2").val();
                var filter3 =  $("#filter-field-workshop-3").val();
                var value1 = $("#filter-value-workshop-1").val();
                var value2 = $("#filter-value-workshop-2").val();
                var value3 = $("#filter-value-workshop-3").val();
                var type = $("#filter-type-workshop").val();
                if(!filter1){
                    filter1="name";
                    value1="";
                }
                if(!filter2){
                    filter2="name";
                    value2='';
                }
                if(!filter3){
                    filter3="name";
                    value3='';
                }
                if(filter1 == 'start')
                    value1 = value1+'-';
                if(filter2 == 'start')
                    value2 = value2+'-';
                if(filter3 == 'start')
                    value3 = value3+'-';
                workshop.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-workshop-1, #filter-field-workshop-2,#filter-field-workshop-3,#filter-type-workshop").change(updateFilter);
            $("#filter-value-workshop-1,#filter-value-workshop-2,#filter-value-workshop-3,#filter-type-workshop").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-workshop").click(function(){
           
                $("#filter-field-workshop-1").val("").change();
                $("#filter-field-workshop-2").val("").change();
                $("#filter-field-workshop-3").val("").change();
                $("#filter-value-workshop-1").val("");
                $("#filter-value-workshop-2").val("");
                $("#filter-value-workshop-3").val("");
                $("#filter-type-workshop").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                workshop.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_workshop .visibility .item').click(function(){
                
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    workshop.hideColumn(this.id);
                    workshop.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    workshop.showColumn(this.id);
                    workshop.redraw();
                }
            });
                            
            $("#print-workshop").on("click", function(){
                workshop.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-workshop").click(function(){
                workshop.download("xlsx", "workshop report.xlsx", {sheetName:"workshop"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-workshop").click(function(){
                workshop.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"workshop Report", //add title to report
                });
            });
            //END OF workshop
            // START OF training
        }
        else if(now == 'training'){
            var training = new Tabulator("#training", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"training" },
                ajaxConfig:"POST",
                layout:"fitColumns",
                columnMinWidth:10,
                movableColumns:true,
                printAsHtml:true,
                printCopyStyle:true,
                printHeader:"<h5>التدريب</h5>",
                printFooter:"<h5></h5>",   
                resizableRows:true,
                layoutColumnsOnNewData: true,
                tooltips: true, //Tool tip value

                tooltipsHeader: true, //Tool tip for headers

                tooltipGenerationMode: "load", //when to generate tooltips

                printConfig:{
                    columnGroups:true, //do not include column groups in column headers for HTML table
                    rowGroups:true, //do not include row groups in HTML table
                    columnCalcs:false, //do not include column calcs in HTML table
                },printCopyStyle:true,
                printFormatter:function(tableHolderElement, tableElement){
         
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                //footerElement:"<h5 class='ui center aligned'></h5>",
                //headerElement:"<h5 class='ui center aligned'>The Footer</h5>",
                placeholder:"No Data",
                columns:[
                    {title:'حذف',formatter:deleted, align:"center",resizable:false,print:false,width:32,minWidth:32,headerSort:false, cellClick:function(e, cell){
                        var id = cell.getRow().getData().tid;
                        if(confirm('Are you sure to delete :  '+cell.getRow().getData().name+'?')){
                            $.ajax({
                                url:"report/includes/fetch.php",
                                method:"POST",
                                data:{
                                    now: 'delete',
                                    table:'training',
                                    id:id
                                },
                                success:function(data){
                                    
                                    training.setData();
                                }
                            })
                        }
                    }},
                    {title:"added by ", field:"added_by", align:"", sorter:"string",visible:false,resizable:false,},
                    {title:"المشاركين", field:"participant", align:"right", sorter:"string",editor:'textarea',minWidth:150,widthGrow:5/10,headerSort:false/*formatter:""*/},
                    {title:"تاريخ الإنتهاء ", field:"end",resizable:false, align:"center",minWidth:90,width:90, sorter:"string",validator:[endValidator], editor:'dateEditor',formatter:"datetime", formatterParams:date},
                    {title:" تاريخ البداية ", field:"start",resizable:false, align:"center",minWidth:90,width:90,sorter:"string",validator:[startValidator], editor:'dateEditor',formatter:"datetime", formatterParams:date},
                    {title:"الدرجة العلمية", field:"presenter-degree",resizable:false,minWidth:90,width:90, align:"center", sorter:"string",editor:"select", editorParams:degree},
                    {title:"المشرف", field:"presenter",sorter:"string",editor:'input',minWidth:150,width:150},
                    {title:"عدد المشاركين", field:"participant-num", align:"center",minWidth:90,width:90,sorter:"number",editor:"number",validator:numericValidator,},
                    {title:"المكان", field:"place",sorter:"string",editor:'input',minWidth:150,widthGrow:2/10,},
                    {title:"العنوان / الموضوع", field:"name",minWidth:150,widthGrow:3/10,sorter:"string",editor:'input',validator:"required"},
                    {title:"#", field:"id",sorter:"number", headerSort:false,width:41,minWidth:41,resizable:false,},               ],
            });   

            function customFilter(data){
                endDate = $('#end_date').val();
                startDate = $('#start_date').val();
                if(startDate && endDate)
                    return data.end <= endDate && data.end >= startDate;
            }
            
            $('#search-training').click(function(){
          
                if($('#end_date').val() && $('#start_date').val())
                    training.setFilter(customFilter);  
            }); 
            
            function updateFilter(){
                var filter1 =  $("#filter-field-training-1").val();
                var filter2 =  $("#filter-field-training-2").val();
                var filter3 =  $("#filter-field-training-3").val();
                var value1 = $("#filter-value-training-1").val();
                var value2 = $("#filter-value-training-2").val();
                var value3 = $("#filter-value-training-3").val();
                var type = $("#filter-type-training").val();
                if(!filter1){
                    filter1="name";
                    value1="";
                }
                if(!filter2){
                    filter2="name";
                    value2='';
                }
                if(!filter3){
                    filter3="name";
                    value3='';
                }
                if(filter1 == 'start')
                    value1 = value1+'-';
                if(filter2 == 'start')
                    value2 = value2+'-';
                if(filter3 == 'start')
                    value3 = value3+'-';
                training.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-training-1, #filter-field-training-2,#filter-field-training-3,#filter-type-training").change(updateFilter);
            $("#filter-value-training-1,#filter-value-training-2,#filter-value-training-3,#filter-type-training").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-training").click(function(){
           
                $("#filter-field-training-1").val("").change();
                $("#filter-field-training-2").val("").change();
                $("#filter-field-training-3").val("").change();
                $("#filter-value-training-1").val("");
                $("#filter-value-training-2").val("");
                $("#filter-value-training-3").val("");
                $("#filter-type-training").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                training.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_training .visibility .item').click(function(){

                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    training.hideColumn(this.id);
                    training.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    training.showColumn(this.id);
                    training.redraw();
                }
            });
                            
            $("#print-training").on("click", function(){
                training.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-training").click(function(){
                training.download("xlsx", "training report.xlsx", {sheetName:"training"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-training").click(function(){
                training.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"training Report", //add title to report
                });
            });
            //END OF exhibition
            // START OF workshop
        }
        else if(now == 'disEnd'){
            var disEnd = new Tabulator("#disEnd", {
                initialSort:[{column:"before",dir:"asc"}],
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"disEnd" },
                ajaxConfig:"POST",
                layout:"fitColumns",
                columnMinWidth:10,
                movableColumns:true,
                printAsHtml:true,
                printCopyStyle:true,
                printHeader:"<h5> إجازات التفرغ العلمي المنتهية</h5>",
                //printFooter:"<h5></h5>", 
                resizableRows:true,
                //layoutColumnsOnNewData: true,
                tooltips: true, //Tool tip value

                tooltipsHeader: true, //Tool tip for headers

                tooltipGenerationMode: "load", //when to generate tooltips

                printFormatter:function(tableHolderElement, tableElement){
                
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                //footerElement:"<h5 class='ui center aligned'></h5>",
                //headerElement:"<h5 class='ui center aligned'>The Footer</h5>",
                placeholder:"No Data",
                columns:[
                        {title:"قبل / يوم", field:"before", sorter:"number",align:"center",minWidth:140,width:140,resizable:false,},
                        {title:"تاريخ الإنتهاء ", field:"RVDT", align:"center",resizable:false,minWidth:160,width:160, sorter:"string",formatter:"datetime", formatterParams:date},
                        {title:" تاريخ البداية ", field:"RVDF", align:"center",resizable:false,width:160,minWidth:160, sorter:"string",formatter:"datetime", formatterParams:date},
                        {title:"رقم الهاتف", field:"tphone", sorter:"number",resizable:false,width:140, align:"center",visible:false},
                        {title:"الدرجة العلمية", field:"dename", sorter:"string",resizable:false,width:150,minWidth:150},
                        {title:" القسم", field:"deptname",sorter:"string",minWidth:150,widthGrow:3/10},
                        {title:"الكلية", field:"cname", sorter:"string",minWidth:150,widthGrow:3/10},
                        {title:"الأسم", field:"tname",sorter:"string",minWidth:150,widthGrow:4/10},
                        {title:"#", field:"id",sorter:"number", headerSort:false,width:41,minWidth:41,resizable:false,},               ],
            });   

            function customFilter(data){
                endDate = $('#end_date').val();
                startDate = $('#start_date').val();
                if(startDate && endDate)
                    return data.RVDT <= endDate && data.RVDT >= startDate;
            }
            
            $('#search-disEnd').click(function(){
                
                if($('#end_date').val() && $('#start_date').val())
                    disEnd.setFilter(customFilter);  
            }); 
            
            function updateFilter(){
                var filter1 =  $("#filter-field-disEnd-1").val();
                var filter2 =  $("#filter-field-disEnd-2").val();
                var filter3 =  $("#filter-field-disEnd-3").val();
                var value1 = $("#filter-value-disEnd-1").val();
                var value2 = $("#filter-value-disEnd-2").val();
                var value3 = $("#filter-value-disEnd-3").val();
                var type = $("#filter-type-disEnd").val();
                if(!filter1){
                    filter1="tname";
                    value1="";
                }
                if(!filter2){
                    filter2="tname";
                    value2='';
                }
                if(!filter3){
                    filter3="tname";
                    value3='';
                }
                if(filter1 == 'start')
                    value1 = value1+'-';
                if(filter2 == 'start')
                    value2 = value2+'-';
                if(filter3 == 'start')
                    value3 = value3+'-';
                disEnd.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-disEnd-1, #filter-field-disEnd-2,#filter-field-disEnd-3,#filter-type-disEnd").change(updateFilter);
            $("#filter-value-disEnd-1,#filter-value-disEnd-2,#filter-value-disEnd-3,#filter-type-disEnd").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-disEnd").click(function(){
           
                $("#filter-field-disEnd-1").val("").change();
                $("#filter-field-disEnd-2").val("").change();
                $("#filter-field-disEnd-3").val("").change();
                $("#filter-value-disEnd-1").val("");
                $("#filter-value-disEnd-2").val("");
                $("#filter-value-disEnd-3").val("");
                $("#filter-type-disEnd").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                disEnd.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_disEnd .visibility .item').click(function(){
                
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    disEnd.hideColumn(this.id);
                    disEnd.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    disEnd.showColumn(this.id);
                    disEnd.redraw();
                }
            });
                            
            $("#print-disEnd").on("click", function(){
                disEnd.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-disEnd").click(function(){
                disEnd.download("xlsx", "Discharge End report.xlsx", {sheetName:"disEnd"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-disEnd").click(function(){
                discharge.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"disEnd Report", //add title to report
                });
            });
            //END OF discharge
            // START OF foreighn
        }   
        else if(now == 'don'){
            var x = function(cell, formatterParams){
                var currency = cell.getRow().getData().currency;
                if(currency == 2){
                    t= {
                            decimal:".",
                            thousand:",",
                            symbol:"$",
                            symbolAfter:false,
                            precision:false,
                        }
                }else{
                    t= {
                        decimal:".",
                        thousand:",",
                        symbolAfter:false,
                        precision:false,
                    }
                }
                return t;
            }

            var payValidator = function(cell, value,parameters){
                var remain = cell.getRow().getData().remain;
                return (value <= remain && value >= 0);
            }
           
            var don = new Tabulator("#don", {
                ajaxURL: 'report/includes/fetch.php',
                ajaxParams:{now:"don" },
                ajaxConfig:"POST",
                layout:"fitColumns",
                columnMinWidth:10,
                movableColumns:true,
                printAsHtml:true,
                printCopyStyle:true,   
                resizableRows:true,
                tooltips: true, //Tool tip value
                tooltipsHeader: true, //Tool tip for headers
                tooltipGenerationMode: "load", //when to generate tooltips
                printHeader:"<h5> الجهات المانحة</h5>",
                printFooter:"<h5></h5>",
                printConfig:{
                    columnGroups:true, //do not include column groups in column headers for HTML table
                    rowGroups:true, //do not include row groups in HTML table
                    columnCalcs:false, //do not include column calcs in HTML table
                },
                printFormatter:function(tableHolderElement, tableElement){
                
                    //tableHolderElement - The element that holds the header, footer and table elements
                    //tableElement - The table
                },
                //footerElement:"<h5 class='ui center aligned'></h5>",
                //headerElement:"<h5 class='ui center aligned'>The Footer</h5>",
                placeholder:"No Data",
                columns:[
                    {title:"إضافة مبلغ", field:"pay", align:"center", sorter:"number",resizable:false,width:89,minWidth:89,formatter:'money',formatterParams:x,editor:"number",validator:[payValidator]},
                    {title:"المبلغ المتبقي", field:"remain", align:"center", sorter:"number",width:89,minWidth:89,formatter:'money',formatterParams:x},
                    {title:"المبلغ المدفوع", field:"payed", align:"center", sorter:"number",width:89,minWidth:89,formatter:'money',formatterParams:x},
                    {title:"المبلغ المصدق", field:"amount", align:"center", sorter:"number",width:89,minWidth:89, formatter:'money',formatterParams:x},
                    {title:"الجهة المانحة", field:"donor",sorter:"string",align:"right",minWidth:150,widthGrow:2/10},
                    {title:"اسم البحث", field:"research-name", sorter:"string",align:"right",minWidth:160,widthGrow:4/10},
                    {title:"الدرجة العلمية", field:"dename", sorter:"string",align:"center",resizable:false,width:83,minWidth:83},
                    {title:" القسم", field:"deptname",sorter:"string",align:"right",minWidth:120,widthGrow:1/10},
                    {title:"الكلية", field:"cname", sorter:"string",align:"right",minWidth:120,widthGrow:2/10},
                    {title:"الأسم", field:"tname",sorter:"string",align:"right",minWidth:130,widthGrow:1/10},
                    {title:"#", field:"id",sorter:"number",align:"right", headerSort:false,width:41,minWidth:41,resizable:false,},               ],
            });   

            function customFilter(data){
                endDate = $('#end_date').val();
                startDate = $('#start_date').val();
                if(startDate && endDate)
                    return data.end <= endDate && data.end >= startDate;
            }
            
            $('#search-don').click(function(){
                
                if($('#end_date').val() && $('#start_date').val())
                    don.setFilter(customFilter);  
            }); 
            
            function updateFilter(){
                var filter1 =  $("#filter-field-don-1").val();
                var filter2 =  $("#filter-field-don-2").val();
                var filter3 =  $("#filter-field-don-3").val();
                var value1 = $("#filter-value-don-1").val();
                var value2 = $("#filter-value-don-2").val();
                var value3 = $("#filter-value-don-3").val();
                var type = $("#filter-type-don").val();
                if(!filter1){
                    filter1="tname";
                    value1="";
                }
                if(!filter2){
                    filter2="tname";
                    value2='';
                }
                if(!filter3){
                    filter3="tname";
                    value3='';
                }
                if(filter1 == 'start')
                    value1 = value1+'-';
                if(filter2 == 'start')
                    value2 = value2+'-';
                if(filter3 == 'start')
                    value3 = value3+'-';
                don.setFilter([[{field:filter1,type:type, value:value1}],[{field:filter2,type:type,value:value2}],[{field:filter3,type:type, value:value3}]]);
                
            }

            //Update filters on value change
            $("#filter-field-don-1, #filter-field-don-2,#filter-field-don-3,#filter-type-don").change(updateFilter);
            $("#filter-value-don-1,#filter-value-don-2,#filter-value-don-3,#filter-type-don").keyup(updateFilter);
            
            //Clear filters on "Clear Filters" button click
            $("#reset-don").click(function(){
           
                $("#filter-field-don-1").val("").change();
                $("#filter-field-don-2").val("").change();
                $("#filter-field-don-3").val("").change();
                $("#filter-value-don-1").val("");
                $("#filter-value-don-2").val("");
                $("#filter-value-don-3").val("");
                $("#filter-type-don").val("like");
                $('#start_date').val("");
                $('#end_date').val("");
            
                don.setData();
            });
            //$('.visibility .item').attr('style','font-weight:700 !important;text-align:center !important;');
            $('#t_don .visibility .item').click(function(){
                if($(this).css('font-weight')=='700'){
                    $(this).attr('style','font-weight:400 !important;text-align:center !important;');
                    don.hideColumn(this.id);
                    don.redraw();
                }else{
                    $(this).attr('style','font-weight:700 !important;text-align:center !important;');
                    don.showColumn(this.id);
                    don.redraw();
                }
            });
                            
            $("#print-don").on("click", function(){
                don.print(false, true);
             });
            
            //trigger download of data.xlsx file
            $("#download-xlsx-don").click(function(){
                don.download("xlsx", "don End report.xlsx", {sheetName:"don"});
            });

                //trigger download of data.pdf file // arabic words issue
            $("#download-pdf-don").click(function(){
                discharge.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"don Report", //add title to report
                });
            });
            //END OF donor
        }   
        //GLOBAL FUNCTIONS
        //set datepicker
    $('#rangestart').calendar({
        type: 'date',
        endCalendar: $('#rangeend'),
        formatter: {
            date: function (date, settings) {
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
        }
      });
    $('#rangeend').calendar({
        type: 'date',
        startCalendar: $('#rangestart'),
        formatter: {
            date: function (date, settings) {
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
        }
    });
}
    //set the sidebar
    $('#sidebar').click(function(){
        $('.ui.sidebar').sidebar('toggle');
    });
});
