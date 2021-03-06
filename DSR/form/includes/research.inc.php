<?php
    session_start();
    header('Access-Control-Allow-Origin: *');
    include "db-inc.php";
    mysqli_query($conn,"SET NAMES 'utf8'");
    mysqli_query($conn,'SET CHARACTER SET utf8');
    if(isset($_POST['key'])){
        if($_POST['key']=="teachers"){
            $sql = $conn->query("SELECT name,id FROM teacher order by name");
            if($sql->num_rows > 0){
                $response = "<option value=''></option>";
                while($data = $sql->fetch_array()){
                    $response .= "<option value=".$data['id'].">".$data['name']."</option>";
                }
            }else
                $response = "";

            exit($response);
        }
        if($_POST['key']=="country"){
            $sql = $conn->query("SELECT name,id FROM country ");
            if($sql->num_rows > 0){
                $response = "<option value=''></option>";
                while($data = $sql->fetch_array()){
                    $response .= "<option value=".$data['id'].">".$data['name']."</option>";
                }
            }else
                $response = "";

            exit($response);
        }
        if($_POST['key']=="collage"){
            $sql = $conn->query("SELECT name,id FROM collage ");
            if($sql->num_rows > 0){
                $response = "<option value=''></option>";
                while($data = $sql->fetch_array()){
                    $response .= "<option value=".$data['id'].">".$data['name']."</option>";
                }
            }else
                $response = "";

            exit($response);
        }
        if($_POST['key']=="teacherData"){ 
            $id = trim($conn->real_escape_string($_POST['id']));
            $sql = $conn->query("SELECT teacher.dept_id AS dept_id ,department.name AS dept_name , collage.name AS collage_name , teacher.degree_id AS degree,
                                    teacher.phone FROM teacher INNER JOIN department ON teacher.dept_id = department.id 
                                    INNER JOIN collage ON department.collage_id = collage.id  WHERE teacher.id = '$id' ;");
            if($sql->num_rows > 0){
                while($data = $sql->fetch_array()){
                    $collage_name = "<option value =".$data['collage_name']." >".$data['collage_name']."</option>";
                    $dept_name = "<option value =".$data['dept_id']." >".$data['dept_name']."</option>";
                    $phone = $data['phone'];
                    $degree = $data['degree'];
                }
                $data = array( "dept_name"=> $dept_name,  'collage_name'=>$collage_name , 'degree' => $degree ,'phone'=>$phone);
            }else
                $data = array( "dept_name"=> '<option value="">Choose...</option>',  'collage_name'=>'<option value="">Choose...</option>' , 'degree' => '' ,'phone'=>'');
            
            echo json_encode($data);
        }
        if($_POST['key']=='researches'){
            $name = trim($conn->real_escape_string($_POST['name']));
            $researcher = trim($conn->real_escape_string($_POST['researcher']));
            $startDate = trim($conn->real_escape_string($_POST['startDate']));
            $endDate = trim($conn->real_escape_string($_POST['endDate']));
            $donor = trim($conn->real_escape_string($_POST['donor']));
            $amount = trim($conn->real_escape_string($_POST['amount']));
            if($amount == "" ) $amount = NULL;
            $currency = trim($conn->real_escape_string($_POST['currency']));
            $rate = trim($conn->real_escape_string($_POST['rate']));
            if($rate == "" ) $rate = NULL;
            $abstract = trim($conn->real_escape_string($_POST['abstract']));
            if(empty($_POST['device'])){
                $device = "";
            }else{
                $device_array = array_map('trim',$_POST['device']);
                $device = $conn->real_escape_string(implode(" , ",$device_array));
            }
            $sql = $conn->query("SELECT id FROM research WHERE `research-name` = '$name' AND `start-date` = '$startDate' AND `researcher-name-id` = '$researcher'");
            $result = $sql->fetch_assoc();
            if(!($sql->num_rows > 0)){
                $sql = $conn->query("SELECT * FROM teacher WHERE id = '$researcher'");
                $result = $sql->fetch_assoc();
                if($sql->num_rows > 0){
                    $sql = "INSERT INTO research(`research-name`,`researcher-name-id`,`start-date`,`end-date`,donor,amount,currency,rate,abstract,device,added_by)VALUES (?,?,?,?,?,?,?,?,?,?,?);";
                    $stmt = $conn->prepare($sql);
                    if($stmt){
                        $stmt->bind_param('sssssiiisss',$name,$researcher,$startDate,$endDate,$donor,$amount,$currency,$rate,$abstract,$device,$_SESSION['user']['username']);
                        $stmt->execute();
                        $stmt->close();
                        exit("added successfully");
                    }
                }else{
                    exit("Researcher Name Not Found");
                }
            }else{
                exit('Already Exist');
            }
        }//end researches
        if($_POST['key']=='allowances'){
            $journal = trim($conn->real_escape_string($_POST['journal']));
            $researcher = trim($conn->real_escape_string($_POST['researcher']));
            $title = trim($conn->real_escape_string($_POST['title']));
            $year = trim($conn->real_escape_string($_POST['year']));
            $pages = trim($conn->real_escape_string($_POST['pages']));
            $paper = trim($conn->real_escape_string($_POST['paper']));
            
            $sql = $conn->query("SELECT id FROM allowance WHERE `title` = '$title' AND `a_researcherf` = '$researcher'");
            $result = $sql->fetch_assoc();
            if(!($sql->num_rows > 0)){
                $sql = $conn->query("SELECT * FROM teacher WHERE id = '$researcher'");
                $result = $sql->fetch_assoc();
                if($sql->num_rows > 0){
                    $sql = "INSERT INTO allowance(`a_researcherf`,`a_journal`,`title`,`year`,pages,paper,added_by)VALUES (?,?,?,?,?,?,?);";
                    $stmt = $conn->prepare($sql);
                    if($stmt){
                        $stmt->bind_param('issssss',$researcher,$journal,$title,$year,$pages,$paper,$_SESSION['user']['username']);
                        $stmt->execute();
                        $stmt->close();
                        exit("added successfully");
                    }
                }else{
                    exit("Researcher Name Not Found");
                }
            }else{
                exit('Already Exist');
            }
        }//end researches
        // save journal data
        if($_POST['key'] == 'journals'){
            $nameAr = trim($conn->real_escape_string($_POST['nameAr']));
            $nameEn = trim($conn->real_escape_string($_POST['nameEn']));
            $editor = trim($conn->real_escape_string($_POST['editor']));
            $publishPaper = trim($conn->real_escape_string($_POST['publishPaper']));
            $publishElec = trim($conn->real_escape_string($_POST['publishElec']));
            $publishAr = trim($conn->real_escape_string($_POST['publishAr']));
            $publishEn = trim($conn->real_escape_string($_POST['publishEn']));
            $spreadPaper = trim($conn->real_escape_string($_POST['spreadPaper']));
            $spreadElec = trim($conn->real_escape_string($_POST['spreadElec']));
            $firstPublishDate = trim($conn->real_escape_string($_POST['firstPublishDate']));
            $currentPublishPaper = trim($conn->real_escape_string($_POST['currentPublishPaper']));
            if($currentPublishPaper == "") $currentPublishPaper= NULL;
            $numPaperInPublish = trim($conn->real_escape_string($_POST['numPaperInPublish']));
            $numPaperInYear = trim($conn->real_escape_string($_POST['numPaperInYear']));
            $internalArbitration = trim($conn->real_escape_string($_POST['internalArbitration']));
            $externalArbitration = trim($conn->real_escape_string($_POST['externalArbitration']));
            $numArbitrator = trim($conn->real_escape_string($_POST['numArbitrator']));
            $paidArbitration = trim($conn->real_escape_string($_POST['paidArbitration']));
            $freeArbitration = trim($conn->real_escape_string($_POST['freeArbitration']));
            $stopReason = trim($conn->real_escape_string($_POST['stopReason']));
            $incomeResource = trim($conn->real_escape_string($_POST['incomeResource']));
            $publishArea = trim($conn->real_escape_string($_POST['publishArea']));
            $journalAssets = trim($conn->real_escape_string($_POST['journalAssets']));
            $journalHr = trim($conn->real_escape_string($_POST['journalHr']));
            $journalProblem = trim($conn->real_escape_string($_POST['journalProblem']));
            $journalSolution = trim($conn->real_escape_string($_POST['journalSolution']));
            $impactFactor = trim($conn->real_escape_string($_POST['impactFactor']));
            $email = trim($conn->real_escape_string($_POST['email']));
            $phone = trim($conn->real_escape_string($_POST['phone']));
            //set foregin keys to NULL value
            if($publishPaper == "" ) $publishPaper = NULL;
            if($publishElec == "" ) $publishElec = NULL;
            if($publishAr == "" ) $publishAr = NULL;
            if($publishEn == "" ) $publishEn = NULL;
            if($spreadPaper == "" ) $spreadPaper = NULL;
            if($spreadElec == "" ) $spreadElec = NULL;
            if($internalArbitration == "" ) $internalArbitration = NULL;
            if($externalArbitration == "" ) $externalArbitration = NULL;
            if($freeArbitration == "" ) $freeArbitration = NULL;
            //check if journal name exist
            //here problem with empty
            $result = "";
            $sql = $conn->query("SELECT id FROM journal WHERE (nameAr = '$nameAr' AND nameAr !='') OR (nameEn = '$nameEn' AND nameEN !='');");
            if($sql->num_rows > 0){
                exit("Already Exist");
            }else{
                $sql = "INSERT INTO journal(nameAr,nameEn,editor,publishPaperf,publishElecf,publishArf,publishEnf,spreadPaperf,spreadElecf,firstPublishDate,
                        currentPublishPaper,numPaperInPublish,numPaperInYear,internalArbitrationf,externalArbitrationf,numArbitrator,paidArbitration,freeArbitrationf,
                        stopReason,incomeResource,publishArea,journalAssets,journalHr,journalProblem,journalSolution,impactFactor,email,phone,added_by) VALUES
                        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                    
                $stmt = $conn->prepare($sql);
                if($stmt){
                    $stmt->bind_param('sssiiiiiisissiississsssssisss',$nameAr,$nameEn,$editor,$publishPaper,$publishElec,$publishAr,$publishEn,$spreadPaper,$spreadElec,$firstPublishDate,
                    $currentPublishPaper,$numPaperInPublish,$numPaperInYear,$internalArbitration,$externalArbitration,$numArbitrator,$paidArbitration,$freeArbitration,
                    $stopReason,$incomeResource,$publishArea,$journalAssets,$journalHr,$journalProblem,$journalSolution,$impactFactor,$email,$phone,$_SESSION['user']['username']);
                    $stmt->execute();
                    $stmt->close();
                    exit("added successfully");
                }else
                    exit("error");
            }
        }//end of journals
        //save discharge data
        if($_POST['key'] == 'discharges'){
            $disName = trim($conn->real_escape_string($_POST['disName']));
            $disPhone = trim($conn->real_escape_string($_POST['disPhone']));
            $disDegree = trim($conn->real_escape_string($_POST['disDegree']));
            $disCollage = trim($conn->real_escape_string($_POST['disCollage']));
            $disDept = trim($conn->real_escape_string($_POST['disDept']));
            $designationDate = trim($conn->real_escape_string($_POST['designationDate']));
            $promotionDate = trim($conn->real_escape_string($_POST['promotionDate']));
            $loanType = trim($conn->real_escape_string($_POST['loanType']));
            $loanDateFrom = trim($conn->real_escape_string($_POST['loanDateFrom']));
            $loanDateTo = trim($conn->real_escape_string($_POST['loanDateTo']));
            $loanPlace = trim($conn->real_escape_string($_POST['loanPlace']));
            $vacationDateFrom = trim($conn->real_escape_string($_POST['vacationDateFrom']));
            $vacationDateTo = trim($conn->real_escape_string($_POST['vacationDateTo']));
            $vacationPlace = trim($conn->real_escape_string($_POST['vacationPlace']));
            $grantDateFrom1 = trim($conn->real_escape_string($_POST['grantDateFrom1']));
            $grantDateTo1 = trim($conn->real_escape_string($_POST['grantDateTo1']));
            $grantPlace1 = trim($conn->real_escape_string($_POST['grantPlace1']));
            $grantDateFrom2 = trim($conn->real_escape_string($_POST['grantDateFrom2']));
            $grantDateTo2 = trim($conn->real_escape_string($_POST['grantDateTo2']));
            $grantPlace2 = trim($conn->real_escape_string($_POST['grantPlace2']));
            $requestVacationDateFrom = trim($conn->real_escape_string($_POST['requestVacationDateFrom']));
            $requestVacationDateTo = trim($conn->real_escape_string($_POST['requestVacationDateTo']));
            $requestVacationNum = trim($conn->real_escape_string($_POST['requestVacationNum']));
            $eduName = trim($conn->real_escape_string($_POST['eduName']));
            $eduCountry = trim($conn->real_escape_string($_POST['eduCountry']));
            $eduConfirm = trim($conn->real_escape_string($_POST['eduConfirm']));
            $activity = trim($conn->real_escape_string($_POST['activity']));
            $supportEdu = trim($conn->real_escape_string($_POST['supportEdu']));
            $requestSupport = trim($conn->real_escape_string($_POST['requestSupport']));
            $deptConfirm = trim($conn->real_escape_string($_POST['deptConfirm']));
            $confirmCoverage = trim($conn->real_escape_string($_POST['confirmCoverage']));
            $collageConfirm = trim($conn->real_escape_string($_POST['collageConfirm']));
            $boardConfirm = trim($conn->real_escape_string($_POST['boardConfirm']));
            //set foregin keys to NULL value
            if($deptConfirm == "" ) $deptConfirm = NULL;
            if($eduConfirm == "" ) $eduConfirm = NULL;
            if($eduCountry == "" )
                $eduCountry = NULL;
            if($confirmCoverage == "" ) $confirmCoverage = NULL;
            if($collageConfirm == "" ) $collageConfirm = NULL;
            if($boardConfirm == "" ) $boardConfirm = NULL;
            //check if discharge name exist
            $sql = $conn->query("SELECT discharge.id FROM discharge LEFT JOIN teacher ON discharge.teacher_id = teacher.id WHERE teacher.id = '$disName' AND discharge.`request-vacation-date-from` = '$requestVacationDateFrom';");
            $result = $sql->fetch_assoc();
            if(!($sql->num_rows > 0)){
                $sql = $conn->query("SELECT * FROM teacher WHERE id = '$disName'");
                $result = $sql->fetch_assoc();
                if($sql->num_rows > 0){
                    //$dis_ = $result['name'];
                    $sql = "INSERT INTO discharge(`teacher_id`,`designation-date`,`promotion-date`,`loan-type`,`loan-date-from`,`loan-date-to`,`loan-place`,
                    	    `vacation-date-from`,`vacation-date-to`,`vacation-place`,`grant-date-from-1`,`grant-date-to-1`,`grant-place-1`,`grant-date-from-2`,
                            `grant-date-to-2`,`grant-place-2`,`request-vacation-date-from`,`request-vacation-date-to`,`request-vacation-num`,`edu-name`,`edu-countryf`,
                            `edu-confirmf`,`activity`,`support-edu`,`request-support`,`department-confirmf`,`confirm-coveragef`,`collage-confirmf`,`board-confirmf`,added_by)
                            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                    $stmt = $conn->prepare($sql);
                    if($stmt){
                        $stmt->bind_param('isssssssssssssssssdsiisssiiiis',$disName,$designationDate,$promotionDate,$loanType,$loanDateFrom,$loanDateTo,$loanPlace,$vacationDateFrom,$vacationDateTo,$vacationPlace
                        ,$grantDateFrom1,$grantDateTo1,$grantPlace1,$grantDateFrom2,$grantDateTo2,$grantPlace2,$requestVacationDateFrom,$requestVacationDateTo,
                        $requestVacationNum,$eduName,$eduCountry,$eduConfirm,$activity,$supportEdu,$requestSupport,$deptConfirm,$confirmCoverage,$collageConfirm,
                        $boardConfirm,$_SESSION['user']['username']);
                        $stmt->execute();
                        $stmt->close();
                        exit("added successfully");
                    }
                }else{
                    exit("Teacher Not Found");
                }   
            }else{
                exit("Already Exist");
            }
        }//end of discharge
        //save foreign data
        if($_POST['key']=='foreigns'){
            $collageExist = '';
            $name = trim($conn->real_escape_string($_POST['name']));
            $foreignEdu = trim($conn->real_escape_string($_POST['foreignEdu']));
            $foreignCollage = trim($conn->real_escape_string($_POST['foreignCollage']));
            $receiveCollage = trim($conn->real_escape_string($_POST['receiveCollage']));
            if($receiveCollage == "" ) $receiveCollage = NULL;
            $startDate = trim($conn->real_escape_string($_POST['startDate']));
            $endDate = trim($conn->real_escape_string($_POST['endDate']));
            $foreignReason = trim($conn->real_escape_string($_POST['foreignReason']));

            $sql = $conn->query("SELECT id FROM `foreign_teacher` WHERE name = '$name' AND `start-date` = '$startDate' AND reason = '$foreignReason'");
            if($sql->num_rows > 0){
                exit("Already Exist");
            }else{
                $sql = "INSERT INTO `foreign_teacher`(`name`,edu,collage,`receive`,`start-date`,`end-date`,reason,added_by) VALUES (?,?,?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                if($stmt){
                    $stmt->bind_param('sssissss',$name,$foreignEdu,$foreignCollage,$receiveCollage,$startDate,$endDate,$foreignReason,$_SESSION['user']['username']);
                    $stmt->execute();
                    $stmt->close();
                    exit("added successfully");
                }else{
                    exit("error");
                }
            }   
        }//end foreigns
        if($_POST['key']=='workshops'){
            $name = trim($conn->real_escape_string($_POST['name']));
            $place = trim($conn->real_escape_string($_POST['place']));
            $participantNum = trim($conn->real_escape_string($_POST['participantNum']));
            if($participantNum == "" ) $participantNum = NULL;
            $presenter = trim($conn->real_escape_string($_POST['presenter']));
            $presenterDegree = trim($conn->real_escape_string($_POST['presenterDegree']));
            if($presenterDegree == "") $presenterDegree = NULL;
            $startDate = trim($conn->real_escape_string($_POST['startDate']));
            $endDate = trim($conn->real_escape_string($_POST['endDate']));
            if(empty($_POST['participant'])){
                $participant = "";
            }else{
                $participant_array = array_map('trim',$_POST['participant']);
                $participant = $conn->real_escape_string(implode(" , ",$participant_array));
            }

            $sql = $conn->query("SELECT id FROM workshop WHERE name = '$name' AND  place = '$place'");
            if($sql->num_rows > 0){
                exit("Already Exist");
            }else{
                $sql = "INSERT INTO workshop(name,place,`participant-num`,presenter,`presenter-degree`,`start-date`,`end-date`,participant,added_by) VALUES (?,?,?,?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                if($stmt){
                    $stmt->bind_param('ssisissss',$name,$place,$participantNum,$presenter,$presenterDegree,$startDate,$endDate,$participant,$_SESSION['user']['username']);
                    $stmt->execute();
                    $stmt->close();
                    exit("added successfully");
                }
            }   
        }//end workshop
        if($_POST['key']=='exhibitions'){
            $name = trim($conn->real_escape_string($_POST['name']));
            $place = trim($conn->real_escape_string($_POST['place']));
            $participantNum = trim($conn->real_escape_string($_POST['participantNum']));
            if($participantNum == "" ) $participantNum = NULL;
            $presenter = trim($conn->real_escape_string($_POST['presenter']));
            $presenterDegree = trim($conn->real_escape_string($_POST['presenterDegree']));
            if($presenterDegree == "") $presenterDegree = NULL;
            $startDate = trim($conn->real_escape_string($_POST['startDate']));
            $endDate = trim($conn->real_escape_string($_POST['endDate']));
            if(empty($_POST['participant'])){
                $participant = "";
            }else{
                $participant_array = array_map('trim',$_POST['participant']);
                $participant = $conn->real_escape_string(implode(" , ",$participant_array));
            }
            $sql = $conn->query("SELECT id FROM exhibition WHERE name = '$name' AND place = '$place'");
            if($sql->num_rows > 0){
                exit("Already Exist");
            }else{
                $sql = "INSERT INTO exhibition(name,place,`participant-num`,presenter,`presenter-degree`,`start-date`,`end-date`,participant,added_by) VALUES (?,?,?,?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                if($stmt){
                    $stmt->bind_param('ssisissss',$name,$place,$participantNum,$presenter,$presenterDegree,$startDate,$endDate,$participant,$_SESSION['user']['username']);
                    $stmt->execute();
                    $stmt->close();
                    exit("added successfully");
                }
            }   
        }//end exhibition
        if($_POST['key']=='trainings'){
            $name = trim($conn->real_escape_string($_POST['name']));
            $place = trim($conn->real_escape_string($_POST['place']));
            $participantNum = trim($conn->real_escape_string($_POST['participantNum']));
            if($participantNum == "" ) $participantNum = NULL;
            $presenter = trim($conn->real_escape_string($_POST['presenter']));
            $presenterDegree = trim($conn->real_escape_string($_POST['presenterDegree']));
            if($presenterDegree == "") $presenterDegree = NULL;
            $startDate = trim($conn->real_escape_string($_POST['startDate']));
            $endDate = trim($conn->real_escape_string($_POST['endDate']));
            if(empty($_POST['participant'])){
                $participant = "";
            }else{
                $participant_array = array_map('trim',$_POST['participant']);
                $participant = $conn->real_escape_string(implode(" , ",$participant_array));
            }

            $sql = $conn->query("SELECT id FROM training WHERE name = '$name' AND place = '$place'");
            if($sql->num_rows > 0){
                exit("Already Exist");
            }else{
                $sql = "INSERT INTO training(name,place,`participant-num`,presenter,`presenter-degree`,`start-date`,`end-date`,participant,added_by) VALUES (?,?,?,?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                if($stmt){
                    $stmt->bind_param('ssisissss',$name,$place,$participantNum,$presenter,$presenterDegree,$startDate,$endDate,$participant,$_SESSION['user']['username']);
                    $stmt->execute();
                    $stmt->close();
                    exit("added successfully");
                }
            }   
        }//end training
        //notification
        $today = date("Y-m-d");
        if($_POST['key'] == 'notification'){
            $sql = $conn->query("SELECT d.id AS did,t.name AS tname ,`request-vacation-date-to` AS RVDT  FROM `discharge` AS d LEFT JOIN teacher AS t ON d.teacher_id = t.id 
                                WHERE `request-vacation-date-to` < '$today' AND `status` = 0 ORDER BY RVDT DESC;");
            $response = '';
            $count = 0;
            if($sql->num_rows > 0){
                $count = $sql->num_rows;
                while($data = $sql->fetch_array()){
                    $response .= "<a id=".$data['did']." href='report.html' class='list-group-item list-group-item-action l'>".$data['tname']."</a>";
                }
            }
                $data = array("res"=> $response,  'count'=>$count);
                //$sql = $conn->query("UPDATE  discharge SET `status` = 1 WHERE id = 9;");
                echo json_encode($data);
            
        }
        if($_POST['key'] == 'seenOne'){
            $id = $_POST['id'];
            $sql = $conn->query("UPDATE discharge SET `status` = 1 WHERE id = '$id';");
        }
        //incomplete
        if($_POST['key'] == 'seenAll'){
            $id = json_decode(stripslashes($_POST['group']));
            //$end = $id.length;
            foreach ($id as $key) {
                $sql = $conn->query("UPDATE discharge SET `status` = 1 WHERE id = '$key';");
            }
            
        }
    }

?>