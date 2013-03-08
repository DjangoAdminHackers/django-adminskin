/* ========== Admin layout changes ========== */

/* Move object tools next to the changelist title */

$(document).ready(function() {

	/* Add .ir class to logo */
	$("h1#site-name").addClass("ir");
	
	/* Move object tools next to h1 */
	$("ul.object-tools").insertAfter("#content h1");
	
	/* Add show/hide filters toggle link */
	$('#changelist-search').after('<a id="toggle" class="show">Show table filters</a>');
	
	/* Show/hide filters on toggle link click */
	$('#toggle').click(function(){
		$('#changelist').toggleClass('show-filters');
		$('#toggle').toggleClass('show hide');
		if ($('#toggle').hasClass('show')) {
			$(this).text('Show table filters');
		} else {
			$(this).text('Hide table filters');
		}
	});
	
	/* Add cancel links to change form */
	
	$('.change-form #content-main').before('<a href="../" class="cancel-header">Cancel</a>');
	$('.change-form .submit-row').prepend('<a href="../" class="cancel-footer">Cancel</a>');
	
	/* Add id to search button */
	$('#changelist-search input[type="submit"]').attr('id', 'search-submit');

});