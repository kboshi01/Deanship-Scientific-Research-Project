<?php
   include('../../../login/includes/isadmin.php');
   session_start();

   if (!isAdmin())
    {
	  $_SESSION['msg'] = "You must log in first";
	  header('location: ../../../index.php');
     }
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" /-->
    <!-- <link rel="stylesheet" href="../form/css/dataTables.bootstrap.min.css" /> -->
    <!-- <script type="text/javascript" src="js/jquery.min.js"></script> -->
    <!-- <script type="text/javascript" src="js/jquery.validate.min.js"></script> -->
    <link href="form/css/main.css" rel="stylesheet"/>
    <title>Admin Page</title>
  </head>
  <body>
        <div class="form-group">
        
            <label>الأسم</label>
            <input type="text" name="tname" id="tname" class="form-control" value = "<?php if(isset($_GET['t_name']) && !empty($_GET['t_name']))
                                                                        echo $_GET['t_name']; ?>"  required>
        </div>

        <div class="form-group">
            <select name="cname" id="cname" class="form-control" onchange = "get(this)" required>
                <?php
                    header('Access-Control-Allow-Origin: *');
                    $connect = mysqli_connect("localhost", "admin", "dsr123", "dsr");
                    mysqli_query($connect,"SET NAMES 'utf8'");
                    mysqli_query($connect,'SET CHARACTER SET utf8');
                    $query = "SELECT id,name AS cname FROM collage";
                    $response = "<option selected value=''>الكلية</option>";
                        $result = mysqli_query($connect, $query);
                        while($row = mysqli_fetch_array($result)){
                            if(!empty($row["cname"]))
                                $response.= '<option value="'.$row["id"].'">'.$row["cname"].'</option>';
                        }
                    echo $response;
                ?>
            </select>
        </div>

        <div class="form-group" >
            <select name="dname" id="dname" class="form-control" required>
                <option selected value=''>القسم</option>
            </select>
        </div>

        <div class="form-group">
            <select class="form-control" id="dename" >
                <option value="0">الدرجة العلمية : </option>
                <option value="1">أستاذ </option>
                <option value="2">أستاذ مشارك</option>
                <option value="3">أستاذ مساعد</option>
                <option value="4">محاضر</option>
                <option value="5">مساعد تدريس</option>
            </select>
        </div>

        <div class="form-group ">
            <label for="phone"> رقم الهاتف :</label>
            <input direction="ltr" type="tel"  class="form-control" id="tphone"  placeholder="Ex : 249912788430" pattern="[0-9]+$"  maxlength="18" minlength="4" value = "<?php if(isset($_GET['t_phone']) && !empty($_GET['t_phone']))
                                                                        echo $_GET['t_phone']; ?>">
        </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <!-- <script src="../form/js/jquery-3.3.1.min.js"  ></script> -->
    <script>
        function get(x){
            $.ajax({
            url:"dash/user/dept_data.php",
            type:"POST",
            dataType: "text",
            data:{
                collage_id:x.value
            },success: function(res) {
                $('#dname').html(res);
            }
            });
            
        }
        document.getElementById("tname").focus();
    
    </script>
    <!-- <script src="js/datatable.js"></script> -->
    
    <!-- <script src="js/jquery2.2.0.min.js"></script> -->
   
    
    
</body>
</html>
