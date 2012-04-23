<?php
progressBar(50);
progressBar(100);

function progressBar($percentage) {
	$percentage = ($percentage < 100) ? $percentage : 100;
	print "<div id=\"progress-bar\" class=\"all-rounded\">\n";
	print "<div id=\"progress-bar-percentage\" class=\"all-rounded\" style=\"width: $percentage%\">";
		if ($percentage > 5) {print "$percentage%";} else {print "<div class=\"spacer\">&nbsp;</div>";}
	print "</div></div>";
}
?>
