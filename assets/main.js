jQuery(document).ready(function($){
    $('input[name=parse-metatags]').click(function() {
    	var url_value = $('input[name=url]').val();
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
    });
});
