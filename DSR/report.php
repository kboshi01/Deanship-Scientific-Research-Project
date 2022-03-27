<?php
   session_start();
   if(!isset($_SESSION['user'])){
      header('location:index.php');
      exit();
   }
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title class="text-center">تقرير الابحاث العلمية</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" type="text/css" href="report/css/main.css"/>
    <link rel="stylesheet" type="text/css" href="report/css/semantic-calendar.css">
    <link rel="stylesheet" type="text/css" href="report/css/semantic.min.css"/>
    <link rel="stylesheet" type="text/css" href="report/css/tabulator.css"/>
  </head>
  <body>
    <div class="ui top attached demo menu  grid">
      <!-- <a href="home.php" class="one wide item ">Home</a> -->
      <a href="form.php" class="one wide item ">Form</a>
      <?php
        include ('login/includes/isadmin.php');
          if(isAdmin()){
            echo ' <a class="one wide item" href="dashboard.php">Admin</a>';
          }
      ?>
      <div class="ui calendar  ml" id="rangestart">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" class="set" placeholder="Start Date" id="start_date" autocomplete="off">
        </div>
      </div>
            
      <div class="ui calendar four wide mle" id="rangeend">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" class="set" placeholder="End Date" id="end_date" autocomplete="off">
        </div>
      </div>
        
      <div class=" two wide">
        <input type="button" id="search-research" value="Search" class="ui button  green " > 
        <!-- <input type="button" id="search-journal" value="Search" class="ui button  green collapse" disabled>  -->
        <input type="button" id="search-discharge" value="Search" class="ui button  green collapse" > 
        <input type="button" id="search-foreign" value="Search" class="ui button  green collapse"> 
        <input type="button" id="search-exhibition" value="Search" class="ui button  green collapse"> 
        <input type="button" id="search-workshop" value="Search" class="ui button  green collapse"> 
        <input type="button" id="search-training" value="Search" class="ui button  green collapse"> 
        <input type="button" id="search-disEnd" value="Search" class="ui button  green collapse"> 
      </div>
      <div class="six wide right aligned ml">
        <input type="button" id="reset-research" value="Reset" class="ui button  orange ">  
        <input type="button" id="reset-journal" value="Reset" class="ui button   orange collapse">  
        <input type="button" id="reset-discharge" value="Reset" class="ui button   orange collapse">  
        <input type="button" id="reset-foreign" value="Reset" class="ui button   orange collapse">  
        <input type="button" id="reset-exhibition" value="Reset" class="ui button   orange collapse">  
        <input type="button" id="reset-workshop" value="Reset" class="ui button   orange collapse">  
        <input type="button" id="reset-training" value="Reset" class="ui button   orange collapse">  
        <input type="button" id="reset-disEnd" value="Reset" class="ui button   orange collapse">  
        <input type="button" id="reset-don" value="Reset" class="ui button   orange collapse">  
        <input type="button" id="reset-allowance" value="Reset" class="ui button   orange collapse">  
      </div>
      <?php echo "<a href='login/includes/logout.php' class='item one wide right'>Logout</a>";?>
      <a id="sidebar" class="item right one wide"><i class="sidebar icon"></i></a>
    </div>
    <div class="ui bottom attached segment pushable">
      <div class="ui  labeled icon right inline vertical sidebar menu  large" >
        <h3 class="item">التقارير</h3>
        <a name = "research" class="research item bold">تقرير الأبحاث العلمية</a>
        <a name = "journal" class="journal item">تقرير المجلات العلمية</a>
        <a name = "discharge" class="discharge item">التفرغ العلمي</a>
        <a name = "foreign" class="discharge item">منح الأساتذة الأجانب</a>
        <a name = "allowance" class="allowance item">علاوة النشر العلمي</a>
        <a name = "exhibition" class="exhibition item">المعارض</a>
        <a name = "workshop" class="workshop item">الورش</a>
        <a name = "training" class="training item">التدريب</a>
        <a name = "disEnd" class="discharge-end item">انتهاء الإجازة العلمية </a>
        <a name = "don" class="don item">الجهات المانحة</a>
      </div>
      <div class="pusher" >
        <div class="ui basic segment" style="padding-right: 2px;padding-left: 2px;">
          <h2 id="grap" class="ui header center aligned">تقرير الأبحاث العلمية</h2>
          <!--research report-->
          <div id="t_research" class="table main " style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">

                <div class="eleven wide column">

                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-research-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="research-name" style="text-align:center">اسم البحث</option>
                    <option value="ren">اسم الباحث</option>
                    <option value="cname"> الكلية</option>
                    <option value="dname">القسم </option>
                    <option value="donor">الجهة المانحة</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-research-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-research-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 2</option>
                    <option value="research-name" style="text-align:center">اسم البحث</option>
                    <option value="ren">اسم الباحث</option>
                    <option value="cname"> الكلية</option>
                    <option value="dname">القسم </option>
                    <option value="donor">الجهة المانحة</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-research-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-research-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 3</option>
                    <option value="research-name" style="text-align:center">اسم البحث</option>
                    <option value="ren">اسم الباحث</option>
                    <option value="cname"> الكلية</option>
                    <option value="dname">القسم </option>
                    <option value="donor">الجهة المانحة</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-research-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-research" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:1200%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="research-name" class="item" style="font-weight:700 !important;text-align:center !important;">أسم البحث</div>
                        <div id="ren" class="item" style="font-weight:700 !important;text-align:center !important;">أسم الباحث </div>
                        <div id="cname" class="item" style="font-weight:700 !important;text-align:center !important;">الكلية</div>
                        <div id="dname" class="item" style="font-weight:700 !important;text-align:center !important;">القسم</div>
                        <div id="dename" class="item" style="text-align:center !important;">الدرجة العلمية</div>
                        <div id="phone"  class="item" style="text-align:center !important;">رقم الهاتف</div>
                        <div id="start" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ البداية</div>
                        <div id="end" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ الإنتهاء</div>
                        <div id="donor" class="item" style="font-weight:700 !important;text-align:center !important;">الجهة المانحة</div>
                        <div id="amount"  class="item" style="font-weight:700 !important;text-align:center !important;">المبلغ</div>
                        <div id="rate" class="item" style="font-weight:700 !important;text-align:center !important;">التقييم</div>
                        <div id="abstract" class="item" style="font-weight:700 !important;text-align:center !important;">المستخلص</div>
                        <div id="device" class="item" style="font-weight:700 !important;text-align:center !important;">الأجهزة</div>
                        <div id="added_by" class="item" style="text-align:center !important;">added by</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-research" class="ui button"> XLSX</button>
                  <button id="download-pdf-research" class="ui button collapse">Download PDF</button>
                  <button id="print-research" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="research" class="" style="direction:ltr" >
            </table>
          </div>
          <!--allowance report-->
          <div id="t_allowance" class="table main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">
                <div class="eleven wide column">

                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-allowance-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:15%;font: initial;direction:ltr">
                    <option value="">Field</option>
                    <option value="researcher" style="text-align:center">Researcher's name</option>
                    <option value="a_journal">Journal name</option>
                    <option value="title">Title of the article</option>
                    <option value="year">Year of publication</option>
                    <option value="cname">Collage</option>
                    <option value="dname">Department</option>
                  </select>
                  <div class="ui input focus small " style="width:14%;margin-right:1%">
                    <input style="text-align:center;" id="filter-value-allowance-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-allowance-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:15%;font: initial;">
                    <option value="">Field 2</option>
                    <option value="researcher" style="text-align:center">Researcher's name</option>
                    <option value="a_journal">Journal name</option>
                    <option value="title">Title of the article</option>
                    <option value="year">Year of publication</option>
                    <option value="cname">Collage</option>
                    <option value="dname">Department</option>
                  </select>
                  <div class="ui input focus small " style="width:14%;margin-right:1%">
                    <input style="text-align:center;" id="filter-value-allowance-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-allowance-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:15%;font: initial;">
                    <option value="">Field 3</option>
                    <option value="researcher" style="text-align:center">Researcher's name</option>
                    <option value="a_journal">Journal name</option>
                    <option value="title">Title of the article</option>
                    <option value="year">Year of publication</option>
                    <option value="cname">Collage</option>
                    <option value="dname">Department</option>
                  </select>
                  <div class="ui input focus small " style="width:14%;margin-right:1%">
                    <input style="text-align:center;" id="filter-value-allowance-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-allowance" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:1200%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">No.</div>
                        <div id="researcher" class="item" style="font-weight:700 !important;text-align:center !important;">Researcher's name</div>
                        <div id="a_journal" class="item" style="font-weight:700 !important;text-align:center !important;"> Journal name </div>
                        <div id="title" class="item" style="font-weight:700 !important;text-align:center !important;"> Title of the article </div>
                        <div id="year" class="item" style="font-weight:700 !important;text-align:center !important;"> Year of publication </div>
                        <div id="pages" class="item" style="font-weight:700 !important;text-align:center !important;"> Number of pages </div>
                        <div id="dename" class="item" style="font-weight:700 !important;text-align:center !important;">Degree</div>
                        <div id="cname" class="item" style="font-weight:700 !important;text-align:center !important;">Collage</div>
                        <div id="dname" class="item" style="font-weight:700 !important;text-align:center !important;">Department</div>
                        <div id="paper" class="item" style="font-weight:700 !important;text-align:center !important;">Number of papers</div>
                        <div id="added_by" class="item" style="text-align:center !important;">added by</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-allowance" class="ui button">XLSX</button>
                  <button id="download-pdf-allowance" class="ui button collapse">Download PDF</button>
                  <button id="print-allowance" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="allowance" class="" style="" >
            </table>
          </div>
          <!--journal report-->
          <div id="t_journal" class="table main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">

                <div class="eleven wide column">

                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-journal-1" class="ui simple dropdown " style="margin-right:1%;height:93% !important;border-radius: 5px;width:16%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="nameAr" style="text-align:center">الأسم عربي</option>
                    <option value="nameEn" style="text-align:center">الأسم انجليزي</option>
                  </select>
                  <div class="ui input focus small " style="width:19%;margin-right:6%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-journal-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-journal-2" class="ui simple dropdown " style="margin-right:1%;height:93% !important;border-radius: 5px;width:16%;font: initial;direction:rtl">
                    <option value="" style="text-align:left">Field 2</option>
                    <option value="nameAr" style="text-align:center">الأسم عربي</option>
                    <option value="nameEn" style="text-align:center">الأسم انجليزي</option>
                  </select>
                  <div class="ui input focus small " style="width:19%;margin-right:4%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-journal-2" type="text" placeholder="Value 2" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-journal" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:1200%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="nameAr" class="item" style="font-weight:700 !important;text-align:center !important;"> عربي</div>
                        <div id="nameEn" class="item" style="font-weight:700 !important;text-align:center !important;"> انجليزي </div>
                        <div id="editor" class="item" style="font-weight:700 !important;text-align:center !important;"> رئيس التحرير </div>
                        <div id="publishPaperf" class="item" style="font-weight:700 !important;text-align:center !important;">ورقية</div>
                        <div id="publishElecf" class="item" style="font-weight:700 !important;text-align:center !important;"> الكترونية</div>
                        <div id="publishArf"  class="item" style="font-weight:700 !important;text-align:center !important;">لغة الصدور عربي</div>
                        <div id="publishEnf" class="item" style="font-weight:700 !important;text-align:center !important;">لغة الصدور انجليزي </div>
                        <div id="spreadPaperf" class="item" style="font-weight:700 !important;text-align:center !important;">طريقة النشر ورقية </div>
                        <div id="spreadElecf" class="item" style="font-weight:700 !important;text-align:center !important;">طريقة النشر إلكترونية </div>
                        <div id="firstPublishDate" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ اول إصدار</div>
                        <div id="currentPublishPaper" class="item" style="font-weight:700 !important;text-align:center !important;">الاعداد المنشورة حتي الان</div>
                        <div id="numPaperInPublish" class="item" style="font-weight:700 !important;text-align:center !important;">عدد الاوراق في كل إصدارة</div>
                        <div id="numPaperInYear" class="item" style="font-weight:700 !important;text-align:center !important;">عدد مرات الإصدار في السنة </div>
                        <div id="internalArbitrationf" class="item" style="font-weight:700 !important;text-align:center !important;">تحكيم داخلي</div>
                        <div id="externalArbitrationf" class="item" style="font-weight:700 !important;text-align:center !important;">تحكيم خارجي</div>
                        <div id="numArbitrator" class="item" style="font-weight:700 !important;text-align:center !important;">عدد المحكمين</div>
                        <div id="paidArbitration" class="item" style="font-weight:700 !important;text-align:center !important;">مدفوع</div>
                        <div id="freeArbitrationf" class="item" style="font-weight:700 !important;text-align:center !important;">مجاني</div>
                        <div id="stopReason" class="item" style="text-align:center !important;">اسباب وفترات توقف الإصدار</div>
                        <div id="incomeResource" class="item" style="text-align:center !important;">مصادر الدخل</div>
                        <div id="publishArea" class="item" style="font-weight:700 !important;text-align:center !important;">مجالات النشر</div>
                        <div id="journalAssets" class="item" style="text-align:center !important;">مقتنيات المجلة</div>
                        <div id="journalHr" class="item" style="text-align:center !important;">الموارد البشرية</div>
                        <div id="journalProblem" class="item" style="text-align:center !important;">المشاكل</div>
                        <div id="journalSolution" class="item" style="text-align:center !important;">الحلول</div>
                        <div id="impactFactor" class="item" style="text-align:center !important;">Impact Factor</div>
                        <div id="email" class="item" style="text-align:center !important;">البريد الإلكتروني</div>
                        <div id="phone" class="item" style="text-align:center !important;">رقم الهاتف</div>
                        <div id="added_by" class="item" style="text-align:center !important;">added by</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-journal" class="ui button"> XLSX</button>
                  <button id="download-pdf-journal" class="ui button collapse">Download PDF</button>
                  <button id="print-journal" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="journal" class=" " style="direction:ltr">
            </table>
          </div>
        
          <!--discharge report-->
          <div id="t_discharge" class="table  main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">
                <div class="eleven wide column">
                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-discharge-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="tname" style="text-align:center">الأسم </option>
                    <option value="dename">الدرجة الوظيفية </option>
                    <option value="cname"> الكلية</option>
                    <option value="edu-name">المؤسسه العلمية </option>
                    <option value="edu-countryf">البلد </option>
                    <option value="RVDF">تاريخ البداية </option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-discharge-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-discharge-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 2</option>
                    <option value="tname" style="text-align:center">الأسم </option>
                    <option value="dename">الدرجة الوظيفية </option>
                    <option value="cname"> الكلية</option>
                    <option value="edu-name">المؤسسه العلمية </option>
                    <option value="edu-countryf">البلد </option>
                    <option value="RVDF">تاريخ البداية </option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-discharge-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-discharge-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 3</option>
                    <option value="tname" style="text-align:center">الأسم </option>
                    <option value="dename">الدرجة الوظيفية </option>
                    <option value="cname"> الكلية</option>
                    <option value="edu-name">المؤسسه العلمية </option>
                    <option value="edu-countryf">البلد </option>
                    <option value="RVDF">تاريخ البداية </option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-discharge-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-discharge" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:133%;height:1200%;overflow-y:scroll;">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="tname" class="item" style="font-weight:700 !important;text-align:center !important;">الأسم</div>
                        <div id="tphone" class="item" style="font-weight:700 !important;text-align:center !important;">رقم الهاتف</div>
                        <div id="dename" class="item" style="font-weight:700 !important;text-align:center !important;">الدرجة الوظيفية</div>
                        <div id="cname" class="item" style="font-weight:700 !important;text-align:center !important;"> الكلية</div>
                        <div id="deptname" class="item" style="font-weight:700 !important;text-align:center !important;">القسم</div>
                        <div id="designation-date" class="item" style="text-align:center !important;">تاريخ التعيين في الوظيفة الاولي </div>
                        <div id="promotion-date"  class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ الترقية في حالة الأستاذ المساعد </div>
                        <div id="RVDF" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ البداية</div>
                        <div id="RVDT" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ الإنتهاء</div>
                        <div id="request-vacation-num" class="item" style="font-weight:700 !important;text-align:center !important;">المدة </div>
                        <div id="edu-name"  class="item" style="font-weight:700 !important;text-align:center !important;">أسم المؤسسه</div>
                        <div id="edu-countryf" class="item" style="font-weight:700 !important;text-align:center !important;">البلد</div>
                        <div id="activity" class="item" style="font-weight:700 !important;text-align:center !important;">النشاط المقترح</div>
                        <div id="support-edu" class="item" style="font-weight:700 !important;text-align:center !important;">الدعم المقدم من المؤسسه</div>
                        <div id="request-support" class="item" style="font-weight:700 !important;text-align:center !important;">الدعم المطلوب من الجامعة</div>
                        <div id="added_by" class="item" style="text-align:center !important;">added by</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-discharge" class="ui button"> XLSX</button>
                  <button id="download-pdf-discharge" class="ui button collapse">Download PDF</button>
                  <button id="print-discharge" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="discharge" class="" style="direction:ltr" >
            </table>
          </div>
      
          <!-- Foreign -->
          <div id="t_foreign" class="table  main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">
                <div class="eleven wide column">
                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-foreign-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="name" style="text-align:center">الأسم </option>
                    <option value="edu"> الجامعة </option>
                    <option value="collage"> الكلية</option>
                    <option value="receive"> الكلية المستقبلة</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-foreign-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-foreign-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 2</option>
                    <option value="name" style="text-align:center">الأسم </option>
                    <option value="edu"> الجامعة </option>
                    <option value="collage"> الكلية</option>
                    <option value="receive"> الكلية المستقبلة</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-foreign-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-foreign-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 3</option>
                    <option value="name" style="text-align:center">الأسم </option>
                    <option value="edu"> الجامعة </option>
                    <option value="collage"> الكلية</option>
                    <option value="receive"> الكلية المستقبلة</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-foreign-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-foreign" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:850%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="name" class="item" style="font-weight:700 !important;text-align:center !important;">الأسم</div>
                        <div id="edu" class="item" style="font-weight:700 !important;text-align:center !important;"> الجامعة</div>
                        <div id="collage" class="item" style="font-weight:700 !important;text-align:center !important;">الكلية</div>
                        <div id="receive" class="item" style="font-weight:700 !important;text-align:center !important;"> الكلية المستقبلة</div>
                        <div id="start" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ بداية الزيارة</div>
                        <div id="end" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ إنتهاء الزيارة</div>
                        <div id="reason" class="item" style="font-weight:700 !important;text-align:center !important;">سبب الزيارة</div>
                        <div id="added_by" class="item" style="text-align:center !important;">added by</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-foreign" class="ui button"> XLSX</button>
                  <button id="download-pdf-foreign" class="ui button collapse">Download PDF</button>
                  <button id="print-foreign" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="foreign" class="" style="" >
            </table>
          </div>
          <!-- exhibition -->
          <div id="t_exhibition" class="table  main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">

                <div class="eleven wide column">
                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-exhibition-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المشرف</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-exhibition-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-exhibition-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 2</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المشرف</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-exhibition-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-exhibition-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 3</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المشرف</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-exhibition-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-exhibition" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:850%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="name" class="item" style="font-weight:700 !important;text-align:center !important;">العنوان / الموضوع</div>
                        <div id="place" class="item" style="font-weight:700 !important;text-align:center !important;"> المكان</div>
                        <div id="participant-num" class="item" style="font-weight:700 !important;text-align:center !important;">عددالمشاركين</div>
                        <div id="presenter" class="item" style="font-weight:700 !important;text-align:center !important;"> المشرف </div>
                        <div id="presenter-degree" class="item" style="font-weight:700 !important;text-align:center !important;"> الدرجة العلمية </div>
                        <div id="start" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ البداية </div>
                        <div id="end" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ الإنتهاء </div>
                        <div id="participant" class="item" style="font-weight:700 !important;text-align:center !important;">المشاركين</div>
                        <div id="added_by" class="item" style="text-align:center !important;">added by</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-exhibition" class="ui button"> XLSX</button>
                  <button id="download-pdf-exhibition" class="ui button collapse">Download PDF</button>
                  <button id="print-exhibition" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="exhibition" class="" style="direction:ltr" >
            </table>
          </div>
          <!-- workshop -->
          <div id="t_workshop" class="table  main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">
                <div class="eleven wide column">
                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-workshop-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المقدم</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-workshop-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-workshop-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 2</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المقدم</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-workshop-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-workshop-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 3</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المقدم</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-workshop-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-workshop" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:850%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="name" class="item" style="font-weight:700 !important;text-align:center !important;">العنوان / الموضوع</div>
                        <div id="place" class="item" style="font-weight:700 !important;text-align:center !important;"> المكان</div>
                        <div id="participant-num" class="item" style="font-weight:700 !important;text-align:center !important;">عددالمشاركين</div>
                        <div id="presenter" class="item" style="font-weight:700 !important;text-align:center !important;"> المقدم </div>
                        <div id="presenter-degree" class="item" style="font-weight:700 !important;text-align:center !important;"> الدرجة العلمية </div>
                        <div id="start" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ البداية </div>
                        <div id="end" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ الإنتهاء </div>
                        <div id="participant" class="item" style="font-weight:700 !important;text-align:center !important;">المشاركين</div>
                        <div id="added_by" class="item" style="text-align:center !important;">added by</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-workshop" class="ui button"> XLSX</button>
                  <button id="download-pdf-workshop" class="ui button collapse">Download PDF</button>
                  <button id="print-workshop" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="workshop" class="" style="direction:ltr" >
            </table>
          </div>
          <!-- training -->
          <div id="t_training" class="table  main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">
                <div class="eleven wide column">
                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-training-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المشرف</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-training-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-training-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 2</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المشرف</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-training-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-training-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 3</option>
                    <option value="name" style="text-align:center">العنوان / الموضوع </option>
                    <option value="place"> المكان </option>
                    <option value="presenter"> المشرف</option>
                    <option value="start">تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-training-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-training" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:850%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="name" class="item" style="font-weight:700 !important;text-align:center !important;">العنوان ظ الموضوع</div>
                        <div id="place" class="item" style="font-weight:700 !important;text-align:center !important;"> المكان</div>
                        <div id="participant-num" class="item" style="font-weight:700 !important;text-align:center !important;">عددالمشاركين</div>
                        <div id="presenter" class="item" style="font-weight:700 !important;text-align:center !important;"> المشرف </div>
                        <div id="presenter-degree" class="item" style="font-weight:700 !important;text-align:center !important;"> الدرجة العلمية </div>
                        <div id="start" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ البداية </div>
                        <div id="end" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ الإنتهاء </div>
                        <div id="participant" class="item" style="font-weight:700 !important;text-align:center !important;">المشاركين</div>
                        <div id="added_by" class="item" style="text-align:center !important;">added by</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-training" class="ui button"> XLSX</button>
                  <button id="download-pdf-training" class="ui button collapse">Download PDF</button>
                  <button id="print-training" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="training" class="" style="direction:ltr" >
            </table>
          </div>
          <!-- discharge end -->
          <div id="t_disEnd" class="table  main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">
                <div class="eleven wide column">
                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-disEnd-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="tname" style="text-align:center">الأسم</option>
                    <option value="cname"> الكلية </option>
                    <option value="before"> قبل</option>
                    <option value="start"> تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-disEnd-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-disEnd-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 2</option>
                    <option value="tname" style="text-align:center">الأسم</option>
                    <option value="cname"> الكلية </option>
                    <option value="before"> قبل</option>
                    <option value="start"> تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-disEnd-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-disEnd-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 3</option>
                    <option value="tname" style="text-align:center">الأسم</option>
                    <option value="cname"> الكلية </option>
                    <option value="before"> قبل</option>
                    <option value="start"> تاريخ البداية</option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-disEnd-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-disEnd" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:1200%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="tname" class="item" style="font-weight:700 !important;text-align:center !important;">الأسم</div>
                        <div id="cname" class="item" style="font-weight:700 !important;text-align:center !important;"> الكلية</div>
                        <div id="deptname" class="item" style="font-weight:700 !important;text-align:center !important;">القسم</div>
                        <div id="dename" class="item" style="font-weight:700 !important;text-align:center !important;"> الدرجة العلمية </div>
                        <div id="tphone" class="item" style="text-align:center !important;"> رقم الهاتف </div>
                        <div id="start" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ البداية </div>
                        <div id="end" class="item" style="font-weight:700 !important;text-align:center !important;">تاريخ الإنتهاء </div>
                        <div id="before" class="item" style="font-weight:700 !important;text-align:center !important;">قبل (يوم)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-disEnd" class="ui button"> XLSX</button>
                  <button id="download-pdf-disEnd" class="ui button collapse">Download PDF</button>
                  <button id="print-disEnd" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="disEnd" class=" " style="direction:ltr" >
            </table>
          </div>
          <!--  donor -->
          <div id="t_don" class="table  main collapse" style="width:100%">
            
            <div class="ui three column divided grid center aligned" style="margin-bottom:-8px">

              <div class="row">

                <div class="eleven wide column">
                  <!-- <label for="" class="" style="margin-right:1%">Field</label> -->
                  <select id="filter-field-don-1" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 1</option>
                    <option value="tname" style="text-align:center">الأسم</option>
                    <option value="cname"> الكلية </option>
                    <option value="dename"> الدرجة العلمية </option>
                    <option value="research-name">  اسم البحث </option>
                    <option value="donor"> الجهة المانحة  </option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-don-1" type="text" placeholder="Value 1" >
                  </div>

                  <select id="filter-field-don-2" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 2</option>
                    <option value="tname" style="text-align:center">الأسم</option>
                    <option value="cname"> الكلية </option >
                    <option value="dename"> الدرجة العلمية </option>
                    <option value="research-name">  اسم البحث </option>
                    <option value="donor"> الجهة المانحة  </option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-don-2" type="text" placeholder="Value 2" >
                  </div>

                  <select id="filter-field-don-3" class="ui simple dropdown " style="height:93% !important;border-radius: 5px;width:12%;font: initial;direction:rtl">
                    <option value="">Field 3</option>
                    <option value="tname" style="text-align:center">الأسم</option>
                    <option value="cname"> الكلية </option>
                    <option value="dename"> الدرجة العلمية </option>
                    <option value="research-name">  اسم البحث </option>
                    <option value="donor"> الجهة المانحة  </option>
                  </select>
                  <div class="ui input focus small " style="width:16%;margin-right:2%">
                    <input style="text-align:center;direction:rtl;" id="filter-value-don-3" type="text" placeholder="Value 3" >
                  </div>

                  <!-- <label for="" class="" style="margin-right:1%">Type</label> -->
                  <select id="filter-type-don" class="ui dropdown compact samll" style="height:93% !important;border-radius: 5px;">
                    <option value="like"> like </option>
                    <option value="="> = </option>
                    <option value=">"> > </option>
                    <option value="<"> < </option>
                  </select>
                </div>

                <div class="two wide column">
                  <div class="ui compact menu small">
                    <div class="ui simple dropdown item small">
                      Column Visibility
                      <i class="dropdown icon"></i>
                      <div class="visibility menu" style="width:100%;height:1200%;overflow-y:scroll">
                        <div id="id" class=" item" style="font-weight:700 !important;text-align:center !important;">#</div>
                        <div id="tname" class="item" style="font-weight:700 !important;text-align:center !important;">الأسم</div>
                        <div id="cname" class="item" style="font-weight:700 !important;text-align:center !important;"> الكلية</div>
                        <div id="deptname" class="item" style="font-weight:700 !important;text-align:center !important;">القسم</div>
                        <div id="dename" class="item" style="font-weight:700 !important;text-align:center !important;"> الدرجة العلمية </div>
                        <div id="research-name" class="item" style="font-weight:700 !important;text-align:center !important;"> اسم البحث </div>
                        <div id="donor" class="item" style="font-weight:700 !important;text-align:center !important;">الجهة المانحة</div>
                        <div id="amount" class="item" style="font-weight:700 !important;text-align:center !important;">المبلغ المصدق</div>
                        <div id="payed" class="item" style="font-weight:700 !important;text-align:center !important;">المبلغ المدفوع</div>
                        <div id="remain" class="item" style="font-weight:700 !important;text-align:center !important;">المبلغ المتبقي</div>
                        <div id="pay" class="item" style="font-weight:700 !important;text-align:center !important;">إضافة مبلغ</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="three wide column">
                  <button id="download-xlsx-don" class="ui button"> XLSX</button>
                  <button id="download-pdf-don" class="ui button collapse">Download PDF</button>
                  <button id="print-don" class="ui button">Print</button>
                </div>
              </div>
              
            </div>

            <table id="don" class="" style="direction:ltr" >
            </table>
          </div>

        </div>
      </div>
    </div>
  </body>
  <script type="text/javascript" src="report/js/tabulator.js"></script>
  <script type="text/javascript" src="form/js/jquery-3.3.1.min.js"  ></script>
  <script type="text/javascript" src="form/js/popper.min.js"  ></script>
  <script type="text/javascript" src="report/js/sematic-calendar.js"></script>
  <script type="text/javascript" src="report/js/semantic.min.js"></script>
  <script type="text/javascript" src="report/js/xlsx.full.min.js"></script>
  <!-- <script src="report/js/jspdf.min.js"></script> -->
  <script src="report/js/moment.js"></script>
  <!-- <script src="report/js/jspdf.plugin.autotable.js"></script> -->
  <script type="text/javascript" src="report/js/main.js"></script>  
</html>