jQuery(document).ready(function($){
    $('input[name=parse-metatags]').click(function() {
    	var url_value = $('input[name=url]').val();
    	if (isUrlValid(url_value)) {
			$.ajax({
			    url: '/get-metatags.php',
			    data: {
			    	'url': url_value
			    },
			    method: 'POST',
			    dataType: 'json',
			    success: function (meta_data) {
			    	var meta_table = '<table>';
			    	meta_table = meta_table.concat('<tr>');
					meta_table = meta_table.concat('<th>Metatag name</th>');
					meta_table = meta_table.concat('<th>Metatag content</th>');
					meta_table = meta_table.concat('</tr>');
			    	for(var k in meta_data) {
			    		meta_table = meta_table.concat('<tr>');
						meta_table = meta_table.concat('<td>' + k + '</td>');
						meta_table = meta_table.concat('<td>' + meta_data[k] + '</td>');
						meta_table = meta_table.concat('</tr>');
					}
					meta_table = meta_table.concat('</table>');
					meta_table = meta_table.concat('<p><input type="submit" name="save-metatags-db" value="Save to database"></p>');
					$('.metatag-table').html(meta_table);

					$('input[name=save-metatags-db]').click(function() {
				    	$.ajax({
						    url: '/save-metatags-db.php',
						    data: {
						    	'meta_data': meta_data,
						    	'url_value': url_value,
						    },
						    method: 'POST',
						    dataType: 'json',
						    success: function (result) {
						    	alert(result['message']);
						    }
						});
					});
			    }
			});
    	} else {
    		alert("Please enter a valid URL.");
    	}
    });

    $('.slider').slick({
		dots: true,
		infinite: true,
		fade: true,
		cssEase: 'linear',
		arrows: false
	});

	function isUrlValid(url) {
    	return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
	}
});
