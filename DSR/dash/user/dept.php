<?php
   include('../../login/includes/isadmin.php');
   session_start();
   if (!isAdmin()){
	  $_SESSION['msg'] = "You must log in first";
	  header('location: ../../index.php');
    }
    $_SESSION['collage_id'] = $_GET['id'];
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="shortcut icon" type="image/x-icon" href="../../favicon.ico" />
    <link rel="stylesheet" href="../../form/css/bootstrap.min.css" >
    <link href="../../form/css/main.css" rel="stylesheet"/>
    <link href="../../form/webfonts/all.css" rel="stylesheet"/>
    <title>Department</title>
  </head>
  <body>
    <div class="container-fluid color">
        <nav class="navbar navbar-expand-lg navbar-dark row p-0">
            <div class="col-sm-4 ml-3">
                <a class="navbar-brand p-0" href="#">
                    <img src="../../form/images/logo.png" class="img-fluid img-logo pr-2"  alt="">
                    <h2 class="d-inline align-middle">DSR</h2>
                </a>
            </div>
            <!-- sidenave in mobel & tab -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse pl-4 " id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <!-- <li class="nav-item active">
                        <a class="nav-link" href="../home.php">Home <span class="sr-only">(current)</span></a>
                    </li> -->
                    <li class="nav-item">
                   
                        <a class="nav-link text-white" href="../../form.php">Forms </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="../../report.php">Reports</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="../../dashboard.php">Admin</a>
                    </li>
                </ul>
            </div>
            <?php echo "<h7 style='color:black;'>(".$_SESSION['user']['username'].")</h7><a href='../../login/includes/logout.php' class='text-white mr-5' style='text-decoration:none'> &nbsp&nbsp&nbspLogout</a>";?>
        </nav>
    </div>   
    <div class="container-fluid">
        <div class="row" >       
            <!-- The main section -->
                <!-- collage -->
                <div id="dept" class="col-12" style="direction:rtl">
                    <h5 class="text-center mb-4 "></h5>
                    <div class="container row">
                        <div class="panel panel-default col-8 mx-auto">
                            <div class="panel-heading">
                            <div>
                                <h6><p style="display:inline;margin-left:330px"><?php echo $_GET['name'] ?></p><a id="dept" class="btn btn-outline-success btn-sm" href="../../dashboard.php">  back </a></h6>
                                
                            </div>
                                <div class="row">                                     
                                    <div align="left">
                                        <button type="button" name="add_dept" id="add_dept" class="btn btn-outline-success btn-xs float-right">Add</button>
                                    </div>
                                    <div id="dept_res"></div>
                                    <div class="clear-fix"></div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive ">
                                    <table id="dept_data" class="table table-bordered table-striped mx-auto text-right">
                                        <thead>
                                            <tr>
                                                <th style="width:80%;padding-left:200px">أسم القسم</th>
                                                <th style="width:10%">Delete</th>
                                                <th style="width:10%">Update</th>
                                            </tr>
                                        </thead>
                                    </table>      
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
        </div>
    </div>
    
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="../../form/js/jquery-3.3.1.min.js"  ></script>
    <script src="../../form/js/popper.min.js"  ></script>
    <script src="../../form/js/bootstrap.min.js"></script>
    <!-- <script src="js/datatable.js"></script> -->

    <!-- <script src="js/jquery2.2.0.min.js"></script> -->
   
    <script src="../js/dialogify.min.js"></script>
    <!-- <script src="../js/Chart.bundle.js"></script>    -->
    <!-- <script src="../js/Chart.js"></script> -->
    <!-- <script src="../js/Chart.min.js"></script> -->
    <script src="../js/jquery.dataTables.min.js"></script>
    <script src="../js/dataTables.bootstrap.min.js"></script>  
    <script src="../js/dept.js"></script>  
    
</body>
</html>