/* ========== Admin layout changes ========== */

/* Move object tools next to the changelist title */

(function($) {
    
    $(document).ready(function($) {
        
        /* Move object tools next to h1 */
        $("ul.object-tools").insertAfter("#content h1");
        
        /* Add show/hide filters toggle link */
        $('#changelist-search').after('<a id="toggle" class="show">Show table filters</a>');
        
        /* Hide filters by default */
        $('#changelist').addClass('hidden');
        
        /* Show/hide filters on toggle link click */
        $('#toggle').click(function(){
            $('#changelist').toggleClass('hidden shown');
            $('#toggle').toggleClass('show hide');
            if ( $('#toggle').hasClass('show') ) {
                $(this).text('Show table filters')
            } else {
                $(this).text('Hide table filters') 
            }
        });
        
        /* Add cancel links to change form */
        $('.change-form #content-main').before('<a href="../" class="cancel-header">Cancel</a>');
        $('.change-form .submit-row').prepend('<a href="../" class="cancel-footer">Cancel</a>');
        
        /* Add id to search button */
        $('#changelist-search input[type="submit"]').attr('id', 'search-submit');
    });
    
})(django.jQuery);