<?php
    require_once 'config.php';
    require_once 'classes/database.class.php';
    $db=New Database();

    switch($_GET["action"]){
        case 'setFeeds':
            $feedlist=getNewFeeds();
            //print_r($feedlist);
            foreach($feedlist as $feed){
                $query="SELECT id FROM feeds WHERE title='".$feed["title"]."'";
                $answer = $db->_db->query($query)->fetch_assoc();
                if($answer["id"]==NULL){
                    $query="INSERT INTO feeds (title, description, link, feedUrl, author) VALUES ('".$feed["title"]."', '".$feed["description"]."', '".$feed["link"]."', '".$feed["feedUrl"]."', '".$feed["author"]."')";
                    if($db->_db->query($query)){
                        $id_feed=mysqli_insert_id($db->_db);
                    }
                }else{
                    $id_feed=$answer["id"];
                }

                foreach ($feed["entries"] as $entry){
                    $query="INSERT INTO entries (source, publishedDate, author, link, sImage, title, feed) VALUES ('".$entry["source"]."', '".date("Y-m-d H:i:s", $entry["publishedDate"])."', '".$entry["author"]."', '".$entry["link"]."', '".$entry["sImage"]."', '".$entry["title"]."', '".$id_feed."')";
                    if($db->_db->query($query)){
                        if($sImage=saveImage($entry["sImage"], $entry["source"], $entry["publishedDate"])){
                            $query="UPDATE entries SET sImage='".$sImage."' WHERE source='".$entry["source"]."' AND publishedDate='".date("Y-m-d H:i:s", $entry["publishedDate"])."'";
                            $db->_db->query($query);
                        }
                        //echo "<br>".$entry["source"]." - ".$entry["title"];

                        $query="SELECT count(*) as count FROM entries WHERE source='".$entry["source"]."'";
                        $answer = $db->_db->query($query)->fetch_assoc();
                        if($answer["count"]>NUM_ENTRIES){
                            $query="SELECT sImage FROM entries WHERE source='".$entry["source"]."' ORDER BY publishedDate ASC LIMIT 1";
                            $answer = $db->_db->query($query)->fetch_assoc();
                            @unlink($_SERVER['DOCUMENT_ROOT'].$answer["sImage"]);
                            $query="DELETE FROM entries WHERE source='".$entry["source"]."' ORDER BY publishedDate ASC LIMIT 1";
                            $db->_db->query($query);
                        }
                    }
                }
            }
        break;

        case 'getFeeds':
            $queryfeeds="SELECT * FROM feeds";
            if($answerfeed=$db->_db->query($queryfeeds)){
                $countfeeds=0;
                while($rowfeed = $answerfeed->fetch_assoc()){
                    $queryentries="SELECT * FROM entries WHERE feed='".$rowfeed["id"]."'";
                    if($answerentries=$db->_db->query($queryentries)){
                        $countentries=0;
                        while($rowentries = $answerentries->fetch_assoc()){
                            $entries[$countentries]=$rowentries;
                            $countentries++;
                        }
                        $feeds[$countfeeds]=$rowfeed;
                        $feeds[$countfeeds]["entries"]=$entries;
                        $countfeeds++;
                    }
                }
                if(!empty($feeds)){
                    echo json_encode($feeds);
                }
            }
        break;
    }

    function getNewFeeds() {
        $feedSource = array(
            'http://agenciabai.es/category/university/feed/',
            'http://baianai.es/category/fffres-co/fffres-co-recursos/feed/',
            'http://graffica.info/feed',
            'http://mix.chimpfeedr.com/7e4a7-lomasfffresco',
            'http://brandemia.org/feed',
            'http://www.area-visual.com/feeds/posts/default',
            'http://nfgraphics.com/feed/',
            'http://40defiebre.com/feed',
            'https://dribbble.com/shots/popular.rss',
            'http://ffffound.com/feed',
            'https://www.behance.net/rss',
            'http://lacriaturacreativa.com/feed/',
            'http://thecreatorsproject.vice.com/es/rss',
            'http://www.domestika.org/es/blog/rss',
            'http://www.awwwards.com/feed/',
            'http://www.csswinner.com/feed',
            'http://www.fubiz.net/feed/',
        );
        $feedlist=array();
        foreach ($feedSource as $feed_url){
            $data = file_get_contents("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=".NUM_ENTRIES."&q=".$feed_url);
            $object = json_decode($data)->responseData->feed;
            $entries=array();
            foreach($object->entries as $entry){
                $entry = array(
                    "source" => asignSource($entry->link),
                    "publishedDate" => strtotime($entry->publishedDate),
                    "author" => $entry->author,
                    //"content" => htmlspecialchars($entry->content),
                    //"contentSnippet" => $entry->contentSnippet,
                    "link" => $entry->link,
                    "sImage" => getSrc($entry->content),
                    "title" => $entry->title,
                    "feedUrl" => $object->feedUrl
                );
                array_push($entries, $entry);
            }
            $feed = array(
                "title" => $object->title,
                "description" => $object->description,
                "link" => $object->link,
                "feedUrl" => $object->feedUrl,
                "author" => $object->author,
                "entries" => $entries
            );
            array_push($feedlist, $feed);
        }
        //print_r($feedlist);
        return $feedlist;
    }

    function asignSource($link){
        if (strpos($link,'graffica') > -1) {
            return 'Gràffica';
        }
        if (strpos($link,'area-visual') > -1) {
            return 'Área Visual';
        }
        if (strpos($link,'baianai') > -1) {
            return 'Staff Pick';
        }
        if (strpos($link,'brandemia') > -1) {
            return 'Brandemia';
        }
        if (strpos($link,'lacriaturacreativa') > -1) {
            return 'La Criatura Creativa';
        }
        if (strpos($link, '40defiebre') > -1) {
            return '40 de Fiebre';
        }
        if (strpos($link,'thecreatorsproject') > -1) {
            return 'The Creators Project';
        }
        if (strpos($link,'CosasVisuales') > -1) {
            return 'Cosas Visuales';
        }
        if (strpos($link,'nfgraphics') > -1) {
            return 'Nice Fucking Graphics!';
        }
        if (strpos($link, 'behance') > -1) {
            return 'Behance';
        }
        if (strpos($link, 'dribbble') > -1) {
            return 'Dribbble';
        }
        if (strpos($link, 'ffffound') > -1) {
            return 'FFFFOUND';
        }
        if (strpos($link, 'domestika') > -1) {
            return 'Domestika';
        }
        if (strpos($link, 'awwwards') > -1) {
            return 'Awwwards';
        }
        if (strpos($link, 'csswinner') > -1) {
            return 'CSS Winner';
        }
        if (strpos($link, 'producthunt') > -1) {
            return 'Product Hunt';
        }
        if (strpos($link, 'fubiz') > -1) {
            return 'Fubiz';
        }
        if (strpos($link, 'smashingmagazine') > -1) {
            return 'Smashing Magazine';
        }
    }

    function getSrc($content){
        preg_match('@src="([^"]+)"@', $content, $array);
        return array_pop($array);
    }

    function saveImage($imgsource, $feedsource, $date){
        if(!empty($imgsource)){
            $feedsource=sanitize_string($feedsource);
            $upload_folder='/images/sImage/'.$feedsource;
            if (!file_exists($_SERVER['DOCUMENT_ROOT'].$upload_folder)) {
                mkdir($_SERVER['DOCUMENT_ROOT'].$upload_folder, 0777, true);
            }

            /* original size */
            if($size=getimagesize($imgsource)){
                $sourcewidth = $size[0];
                $sourceheight =$size[1];
                /* destiny size*/
                $dstheight=214;
                $dstwidth=$dstheight*$sourcewidth/$sourceheight;

                $ext=MimeToExtension($imgsource);
                switch($ext){
                    case "jpeg":
                        $imagecreate="imagecreatefrom".$ext;
                        $imgsource = $imagecreate($imgsource);
                        $temp=imagecreatetruecolor($dstwidth, $dstheight);
                        imagecopyresampled($temp,$imgsource,0,0,0,0, $dstwidth, $dstheight, $sourcewidth, $sourceheight);

                        $imgdst=$upload_folder.'/'.$date.'.jpg';
                        imagejpeg($temp, $_SERVER['DOCUMENT_ROOT'].$imgdst, 100);
                        ImageDestroy($imgsource);
                     break;

                    case "png":
                        $imagecreate="imagecreatefrom".$ext;
                        $imgsource = $imagecreate($imgsource);
                        $temp=imagecreatetruecolor($dstwidth, $dstheight);
                        $color=imagecolorAllocate($temp,255,255,255);
                        imagefill($temp,0,0,$color);
                        imagecopyresampled($temp,$imgsource,0,0,0,0, $dstwidth, $dstheight, $sourcewidth, $sourceheight);

                        $imgdst=$upload_folder.'/'.$date.'.jpg';
                        imagejpeg($temp, $_SERVER['DOCUMENT_ROOT'].$imgdst, 100);
                    break;

                    case "gif":
                        $img = new Imagick ($imgsource);
                        $n = $img->getNumberImages ();

                        for ($i = 0; $i < $n; $i++) {
                            $img->scaleImage ($dstwidth, $dstheight);
                            $img->nextImage ();
                        }
                        $imgdst=$upload_folder.'/'.$date.'.gif';
                        $img->writeImages ($_SERVER['DOCUMENT_ROOT'].$imgdst, TRUE);
                     break;
                }
                return $imgdst;
            }
        }
    }

    function MimeToExtension($imgsource){
        $buffer = file_get_contents($imgsource);
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->buffer($buffer);
        switch($mime){
            case 'image/jpeg': case 'image/pjpeg': $ext='jpeg';break;
            case 'image/png': $ext='png'; break;
            case 'image/gif': $ext='gif'; break;
        }
        return $ext;
    }

    function sanitize_string($s)
    {
		$s = preg_replace("/á|à|â|ã|ª/","a",$s);
		$s = preg_replace("/Á|À|Â|Ã/","A",$s);
		$s = preg_replace("/é|è|ê/","e",$s);
		$s = preg_replace("/É|È|Ê/","E",$s);
		$s = preg_replace("/í|ì|î/","i",$s);
		$s = preg_replace("/Í|Ì|Î/","I",$s);
		$s = preg_replace("/ó|ò|ô|õ|º/","o",$s);
		$s = preg_replace("/Ó|Ò|Ô|Õ/","O",$s);
		$s = preg_replace("/ú|ù|û/","u",$s);
		$s = preg_replace("/Ú|Ù|Û/","U",$s);
		$s = str_replace(" ","_",$s);
		$s = str_replace("ñ","n",$s);
		$s = str_replace("Ñ","N",$s);

		$s = preg_replace('/[^a-zA-Z0-9_.-]/', '', $s);
		return $s;
    }
?>
