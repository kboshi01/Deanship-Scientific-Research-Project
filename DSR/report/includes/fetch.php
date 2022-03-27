<?php
//fetch.php
header('Access-Control-Allow-Origin: *');
$connect = mysqli_connect("localhost", "admin", "dsr123", "dsr");
mysqli_query($connect,"SET NAMES 'utf8'");
mysqli_query($connect,'SET CHARACTER SET utf8');
if(isset($_POST['now'])){
    if($_POST['now']== 'research'){
        $query = "SELECT research.id AS rid,`research-name`,teacher.phone ,added_by,`start-date`,`end-date`,donor,amount,currency,rate,abstract,device, teacher.name AS tname, department.name AS dname ,
                    degree.name AS dename , collage.name AS cname FROM research LEFT JOIN teacher ON `research`.`researcher-name-id` = `teacher`.id 
                    LEFT JOIN department ON `teacher`.`dept_id`=department.id LEFT JOIN collage on `department`.`collage_id` = collage.id LEFT JOIN 
                    degree on `teacher`.`degree_id` = degree.id order by rid desc";
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $currency = $row['currency'];
            $amount = $row['amount'];
            $sub_array = array();
            $sub_array = ['id'=>$i,'tid'=>$row['rid'], 'research-name'=>$row['research-name'], 'ren'=>$row['tname'], 'cname'=>$row['cname'], 'dename'=>$row['dename'], 'dname'=>$row['dname'],
            'phone'=>$row['phone'], 'start'=>$row['start-date'],'end'=>$row['end-date'],'donor'=>$row['donor'],'amount'=>$amount,'currency'=>$currency,'rate'=>$row['rate'],
            'abstract'=>$row['abstract'],'device'=>$row['device'],'status'=>1,'added_by'=>$row['added_by']];
            $data[] = $sub_array;
            $i++;
        }
        
        echo(json_encode($data));
        // END OF ALLOWANCE
    }else if($_POST['now']== 'allowance'){
        $query = "SELECT allowance.id AS aid,`a_journal`,teacher.phone ,added_by,`title`,`year`,pages,paper, teacher.name AS tname, department.name AS dname ,
                    degree.name AS dename , collage.name AS cname FROM allowance LEFT JOIN teacher ON `allowance`.`a_researcherf` = `teacher`.id 
                    LEFT JOIN department ON `teacher`.`dept_id`=department.id LEFT JOIN collage on `department`.`collage_id` = collage.id LEFT JOIN 
                    degree on `teacher`.`degree_id` = degree.id order by aid desc";
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            $sub_array = ['id'=>$i,'tid'=>$row['aid'], 'a_journal'=>$row['a_journal'],'title'=>$row['title'], 'researcher'=>$row['tname'], 'cname'=>$row['cname'],
            'dename'=>$row['dename'], 'dname'=>$row['dname'],'pages'=>$row['pages'],'year'=>$row['year'],'paper'=>$row['paper'],'added_by'=>$row['added_by']];
            $data[] = $sub_array;
            $i++;
        }
        
        echo(json_encode($data));
        // END OF RESEARCH
    }else if($_POST['now']== 'journal'){
        $query = "SELECT j.id AS jid,nameAr,nameEn,editor,added_by,pp.name AS PP,pe.name AS PE,pa.name AS PA,pen.name AS PEN,sp.name AS SP,se.name AS SE,j.firstPublishDate,
            j.currentPublishPaper,j.numPaperInPublish,j.numPaperInYear,ia.name AS IA,ea.name AS EA,j.numArbitrator,j.paidArbitration,fa.name AS FA,j.stopReason,
            j.incomeResource,j.publishArea,j.journalAssets,j.journalHr,j.journalProblem,j.journalSolution,j.impactFactor,j.email,j.phone FROM journal AS j LEFT JOIN
            selector AS pp ON pp.id = j.publishPaperf LEFT JOIN selector AS pe ON j.publishElecf = pe.id LEFT JOIN selector AS pa ON j.publishArf = pa.id LEFT JOIN 
            selector AS pen ON pen.id = j.publishEnf LEFT JOIN selector AS sp ON sp.id = j.spreadPaperf LEFT JOIN selector AS se ON se.id = j.spreadElecf LEFT JOIN
            selector AS ia ON ia.id = j.internalArbitrationf LEFT JOIN selector AS ea ON ea.id=j.externalArbitrationf LEFT JOIN selector AS fa ON fa.id = j.freeArbitrationf 
            order by jid desc";

        $result = mysqli_query($connect, $query);
        $i = 1;
        
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            $sub_array = ['id'=>$i,'nameAr'=>$row["nameAr"],'nameEn'=>$row["nameEn"],'editor'=>$row["editor"],'publishPaperf'=>$row["PP"],'publishElecf'=>$row["PE"],'publishArf'=>$row["PA"],
                        'publishEnf'=>$row["PEN"],'spreadPaperf'=>$row["SP"],'spreadElecf'=>$row["SE"],'firstPublishDate'=>$row["firstPublishDate"],'currentPublishPaper'=>$row["currentPublishPaper"],
                        'numPaperInPublish'=>$row["numPaperInPublish"],'numPaperInYear'=>$row["numPaperInYear"],'internalArbitrationf'=>$row["IA"],'externalArbitrationf'=>$row["EA"],
                        'numArbitrator'=>$row["numArbitrator"],'paidArbitration'=> $row["paidArbitration"],'freeArbitrationf'=>$row["FA"],'stopReason'=>$row["stopReason"],
                        'incomeResource'=>$row["incomeResource"],'publishArea'=>$row["publishArea"],'journalAssets'=>$row["journalAssets"],
                        'journalHr'=>$row["journalHr"],'journalProblem'=>$row["journalProblem"],'journalSolution'=>$row["journalSolution"],
                        'impactFactor'=>$row["impactFactor"],'email'=>$row["email"],'phone'=>$row["phone"],'added_by'=>$row["added_by"],'tid'=>$row['jid']];

            $data[] = $sub_array;
            $i++;
        }

        echo(json_encode($data));
        // END JOURNAL
    }else if($_POST['now']== 'discharge'){
        $query = "SELECT d.id AS did, country.name AS coname, activity,`request-support` AS RS,`support-edu` AS SE,`edu-name` AS EN,`request-vacation-num` AS RVN,
                    `request-vacation-date-to` AS RVDT,`request-vacation-date-from` AS RVDF,`promotion-date` AS PD,t.name AS tname,t.phone AS tphone,degree.name AS
                    dename,c.name AS cname,added_by,dept.name AS deptname,`designation-date` AS DD,`status` FROM discharge AS d LEFT JOIN teacher AS t ON  d.teacher_id = t.id
                    LEFT JOIN department AS dept ON dept.id = t.dept_id LEFT JOIN degree ON t.degree_id = degree.id LEFT JOIN collage AS c ON dept.collage_id = c.id 
                    LEFT JOIN country ON `edu-countryf`= country.id order by did desc";
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            $sub_array = ['id'=>$i,'tid'=>$row['did'], 'tname'=>$row['tname'], 'designation-date'=>$row['DD'], 'cname'=>$row['cname'],'dename'=>$row['dename'],
                        'deptname'=>$row['deptname'],'tphone'=>$row['tphone'], 'RVDF'=>$row['RVDF'],'RVDT'=>$row['RVDT'],
                        'promotion-date'=>$row['PD'],'request-vacation-num'=>$row['RVN'],'edu-name'=>$row['EN'],'edu-countryf'=>$row['coname'],
                        'activity'=>$row['activity'],'support-edu'=>$row['SE'],'request-support'=>$row['RS'],'status'=>$row['status'],'added_by'=>$row['added_by']];
            $data[] = $sub_array;
            $i++;
        } 
        echo(json_encode($data));
        //discharge end here
    }else if($_POST['now']== 'foreign'){
        $query = "SELECT fore.id AS fore_id,fore.name AS fname,edu,added_by,collage AS fcollage,c.name AS receive_collage,`start-date` AS startDate,`end-date`
                 AS endDate ,reason FROM foreign_teacher AS fore LEFT JOIN collage AS c ON fore.receive = c.id order by fore_id desc";
        
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            $sub_array = ['id'=>$i,'tid'=>$row['fore_id'], 'name'=>$row['fname'], 'edu'=>$row['edu'], 'collage'=>$row['fcollage'], 'receive'=>$row['receive_collage'],
                        'start'=>$row['startDate'],'end'=>$row['endDate'],'reason'=>$row['reason'],'added_by'=>$row['added_by']];
            $data[] = $sub_array;
            $i++;
        }
        
        echo(json_encode($data));
        
    }else if($_POST['now']== 'exhibition'){
        $query = "SELECT ex.id AS exid,ex.name AS ex_name,place,`participant-num`,added_by,presenter,`start-date` AS startDate ,`end-date` AS endDate ,participant,
                    degree.name AS de_name FROM exhibition AS ex LEFT JOIN degree ON `ex`.`presenter-degree`=degree.id order by exid desc";
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            $sub_array = ['id'=>$i,'tid'=>$row['exid'], 'name'=>$row['ex_name'], 'place'=>$row['place'], 'participant-num'=>$row['participant-num'],
                        'presenter'=>$row['presenter'],'presenter-degree'=>$row['de_name'],'start'=>$row['startDate'],'end'=>$row['endDate'],
                        'participant'=>$row['participant'],'added_by'=>$row['added_by']];
            $data[] = $sub_array;
            $i++;
        }
        echo(json_encode($data));
    }else if($_POST['now']== 'workshop'){
        $query = "SELECT wo.id AS woid,wo.name AS wo_name,place,`participant-num`,added_by,presenter,`start-date` AS startDate ,`end-date` AS endDate ,participant,
                    degree.name AS de_name FROM workshop AS wo LEFT JOIN degree ON `wo`.`presenter-degree`=degree.id order by woid desc";
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            $sub_array = ['id'=>$i,'tid'=>$row['woid'], 'name'=>$row['wo_name'], 'place'=>$row['place'], 'participant-num'=>$row['participant-num'],
                        'presenter'=>$row['presenter'],'presenter-degree'=>$row['de_name'],'start'=>$row['startDate'],'end'=>$row['endDate'],
                        'participant'=>$row['participant'],'added_by'=>$row['added_by']];
            $data[] = $sub_array;
            $i++;
        }
        echo(json_encode($data));

    }else if($_POST['now']== 'training'){
        $query = "SELECT tr.id AS trid,tr.name AS tr_name,place,`participant-num`,presenter,added_by,`start-date` AS startDate ,`end-date` AS endDate ,participant,
                    degree.name AS de_name FROM training AS tr LEFT JOIN degree ON `tr`.`presenter-degree`=degree.id order by trid desc";
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            $sub_array = ['id'=>$i,'tid'=>$row['trid'], 'name'=>$row['tr_name'], 'place'=>$row['place'], 'participant-num'=>$row['participant-num'],
                        'presenter'=>$row['presenter'],'presenter-degree'=>$row['de_name'],'start'=>$row['startDate'],'end'=>$row['endDate'],
                        'participant'=>$row['participant'],'added_by'=>$row['added_by']];
            $data[] = $sub_array;
            $i++;
        }
        echo(json_encode($data));
       
    }else if($_POST['now']== 'disEnd'){
        $today = date("Y-m-d");
        $global = "SELECT d.id AS did,`request-vacation-num` AS RVN,`request-vacation-date-to` AS RVDT,`request-vacation-date-from` AS RVDF,
                    t.name AS tname,t.phone AS tphone,degree.name AS dename,c.name AS cname,dept.name AS deptname FROM discharge AS d LEFT JOIN 
                    teacher AS t ON  d.teacher_id = t.id LEFT JOIN department AS dept ON dept.id = t.dept_id LEFT JOIN degree ON t.degree_id = degree.id LEFT JOIN
                    collage AS c ON dept.collage_id = c.id";
        $query = $global." WHERE `request-vacation-date-to` < '$today'";
        
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            if($row['RVDT'] != '0000-00-00')
                $before = floor((strtotime($today)- strtotime($row['RVDT']))/24/3600);
            else
                $before = '';
            $sub_array = ['id'=>$i,'tid'=>$row['did'], 'tname'=>$row['tname'], 'cname'=>$row['cname'], 'deptname'=>$row['deptname'],

                        'dename'=>$row['dename'],'tphone'=>$row['tphone'],'RVDF'=>$row['RVDF'],'RVDT'=>$row['RVDT'],
                        'before' =>$before];
            $data[] = $sub_array;
            $i++;
        }
        echo(json_encode($data));

    }else if($_POST['now']== 'don'){
        $today = date("Y-m-d");
        $query = "SELECT r.id AS don_id,t.name AS tname,t.phone AS tphone,degree.name AS dename,`research-name`,c.name AS cname,dept.name AS deptname,donor,amount,payed,currency
                 FROM research AS r
                    LEFT JOIN teacher AS t ON  r.`researcher-name-id` = t.id LEFT JOIN department AS dept ON dept.id = t.dept_id LEFT JOIN degree ON
                    t.degree_id = degree.id LEFT JOIN collage AS c ON dept.collage_id = c.id";
        $result = mysqli_query($connect, $query);
        $i = 1;
        while($row = mysqli_fetch_array($result)){
            $sub_array = array();
            $amount = $row['amount'];
            $payed = $row['payed'];
            $remain = $amount - $payed;
            $sub_array = ['id'=>$i,'tid'=>$row['don_id'], 'tname'=>$row['tname'], 'cname'=>$row['cname'], 'deptname'=>$row['deptname'],
                        'dename'=>$row['dename'],'research-name'=>$row['research-name'],'donor'=>$row['donor'],'amount'=>$amount,
                        'payed' =>$payed,'remain'=>$remain,'currency' =>$row['currency']];
            $data[] = $sub_array;
            $i++;
        }
        echo(json_encode($data));
    }else if($_POST['now']== 'delete'){
        if(isset($_POST["id"])){
            $table = $_POST['table'];
            $query = "DELETE FROM `$table` WHERE `id` = '".$_POST["id"]."'";
            $statement = $connect->prepare($query);
            $statement->execute();
            echo json_encode('Row Deleted');
        }
    }else if($_POST['now']== 'update'){
        if(isset($_POST["value"])){
            $x = $_POST["value"];
            $table = $_POST["table"];
            $query = "UPDATE `$table` SET `".$_POST["field"]."` = '".$x."' WHERE `id` = ".$_POST["id"]."";
            $statement = $connect->prepare($query);
            $statement->execute();
            echo json_encode($table);
        }
    }else if($_POST['now']== 'updatePay'){
        if(isset($_POST["value"])){
            $x = $_POST["value"];
            $query = "UPDATE `research` SET payed = payed + '".$x."' WHERE `id` = ".$_POST["id"]."";
            $statement = $connect->prepare($query);
            $statement->execute();
        }
    }
    else if($_POST['now']== 'deleteDischarge'){
        if(isset($_POST["dischargeId"])){
            $query = "DELETE FROM `discharge` WHERE `id` = '".$_POST["dischargeId"]."'";
            $statement = $connect->prepare($query);
            $statement->execute();
            echo json_encode($_POST['Data Deleted']);
        }
    }else if($_POST['now']== 'deleteExhibition'){
        if(isset($_POST["exhibitionId"])){
            $query = "DELETE FROM `exhibition` WHERE `id` = '".$_POST["exhibitionId"]."'";
            $statement = $connect->prepare($query);
            $statement->execute();
            echo json_encode($_POST['Data Deleted']);
        }
    }else if($_POST['now']== 'deleteForeign'){
        if(isset($_POST["foreignId"])){
            $query = "DELETE FROM `foreign_teacher` WHERE `id` = '".$_POST["foreignId"]."'";
            $statement = $connect->prepare($query);
            $statement->execute();
            echo json_encode($_POST['Data Deleted']);
        }
    }else if($_POST['now']== 'deleteWorkshop'){
        if(isset($_POST["workshopId"])){
            $query = "DELETE FROM `workshop` WHERE `id` = '".$_POST["workshopId"]."'";
            $statement = $connect->prepare($query);
            $statement->execute();
            echo json_encode($_POST['Data Deleted']);
        }
    }else if($_POST['now']== 'deleteTraining'){
        if(isset($_POST["trainingId"])){
            $query = "DELETE FROM `training` WHERE `id` = '".$_POST["trainingId"]."'";
            $statement = $connect->prepare($query);
            $statement->execute();
            echo json_encode($_POST['Data Deleted']);
        }
    }else if($_POST['now']== 'addDon'){
            $query = "UPDATE `research` SET `payed` = '".$_POST["numNum"]."' WHERE `research`.`id` = '".$_POST["id"]."' ";
            $statement = $connect->prepare($query);
            $statement->execute();
            echo json_encode('ok');
    }else if($_POST['now']== 'payDon'){
        $query = "SELECT amount,payed FROM `research` WHERE `research`.`id` = '".$_POST["rid"]."'";
        $result = mysqli_query($connect, $query);
        while($row = mysqli_fetch_array($result)){
            $payed = $row['payed'];
            $amount = $row['amount'];
        }
        $data = array("amount"=> $amount,  "payed"=>$payed);
        echo json_encode($data);
    }
}

?>