/* ========== Admin layout changes ========== */

/* Move object tools next to the changelist title */


$(function ($) {
    var initial_form = $.trim(unescape($.param($('form').serializeArray().sort(sort_by_name))).replace(/\s/g, ''));
    var SAVING = false;
    $('.submit-row').click(function() {
        SAVING = true;
    });
    function sort_by_name(a, b){
        var a_name = a.name.toLowerCase();
        var b_name = b.name.toLowerCase();
        return ((a_name < b_name) ? -1 : ((a_name > b_name) ? 1 : 0));
    }

    //Use serializeArray + param instead of serialize as we need to reorder
    //the parameters

    var changed = function() {
        $('.filtered').filter('[id$=_to]').find('option').each(function(){
            $(this).attr('selected', 'selected');
        });
        var current_form = $.param($('form').serializeArray().sort(sort_by_name));
        current_form = $.trim(unescape(current_form).replace(/\s/g, '').replace(/\+data-mce-href=".+?"/g, '').replace(/<p><br\+data-mce-bogus="1"><\/p>/g, ''));
        return current_form != initial_form && !SAVING;

    }
    window.onbeforeunload = function() {
        if (changed()) {
            return 'You have unsaved changes.';
        }
    };
    /* Move object tools next to h1 */
    $("ul.object-tools").insertAfter("#content h1");
    $("ul.object-tools a").on('click', function() {
        if (changed()) {
           alert("You have unsaved changes. Please save before continuing.");
           return false;
        }
    });
    /* Add show/hide filters toggle link */
    $('#changelist-search').after('<a id="toggle" class="hide">Hide filters</a>');
    
    /* Show/hide filters on toggle link click */
    $('#toggle').click(function(){
        $('#changelist').toggleClass('hide-filters');
        $('#toggle').toggleClass('show hide');
        if ($('#toggle').hasClass('show')) {
            $(this).text('Show filters');
        } else {
            $(this).text('Hide filters');
        }
    });
    
    /* Add cancel links to change form */
    $('.change-form #content-main').before('<a href="../" class="cancel-header">Cancel</a>');
    $('.change-form .submit-row').prepend('<a href="../" class="cancel-footer">Cancel</a>');
    
    /* Add id to search button */
    $('#changelist-search input[type="submit"]').attr('id', 'search-submit');
    
    $('.move_to_submit_row').insertBefore('.submit-row>input:first');
    $('.submit-row input').removeClass('default');
    $('.submit-row>input:first').addClass('default');

    $('.submit-row-extra').insertBefore('.submit-row>input:first');
    $('.submit-row-extra').on('click', function(event) {
        event.preventDefault();
        SAVING = false;
        var $this = $(this);
        var modal = $this.attr('modal');
        var href = $this.attr('href');
        if (changed()) {
           alert("You have unsaved changes. Please save before continuing.");
           return false;
        }
        if (modal !== undefined) {
            $('#' + modal).foundation('reveal', 'open');
        } else {
            window.location = $(this).attr('href');
            
        }
    });
});