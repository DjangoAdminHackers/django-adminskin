var batch_upload = function(gallery) {
    var filelist;
    var files = [];
    var file;
    var uploading = 0;
    var url = '/admin/xhr/photo-upload/';
    var $photos_group = $('div#photos-group');
    var $batch_upload = $('<div id="batch-upload"><h2>Batch Upload</h2></div>');
    var $batch_inner = $('<div id="batch-inner"></div>');
    var $upload_area = $('<input type="file" id="upload-area" multiple/>');
    var $upload_button = $('<button id="upload-button">Upload</button>');
    var $progress_bar = $('<div class="progress-bar" style="background-color: #ccc; height: 10px; width: 0%"></div>');
    var $num_left = $('<p></p>');


    var update_num_left = function() {
        $num_left.text('Uploading: '+ file.name + ', Photos left: ' + files.length);
    }

    var show_progress = function(percent, callback) {
        var duration = 50;
        if (percent == 0) {
            duration = 0;
        }
        $progress_bar.stop(true, true).animate({
            width: percent + '%'
        }, duration, 'swing', callback);
    }
    var upload_files = function() {
        show_progress(0);
        if (files.length == 0) {
            location.reload();
            return true
        }
        file = files.pop();
        update_num_left();
        var form_data = new FormData();
        form_data.append('image', file);
        form_data.append('gallery', gallery);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                var percent = (event.loaded / event.total) * 100;  
                show_progress(percent);
            }
        };
        xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = $.parseJSON(xhr.response);
                if (response == 'OK') {
                    show_progress(100, upload_files);
                } else {
                    alert("Error!");
                }
            }
        };
        xhr.send(form_data);
        form_data = new FormData();
        return true;
    };

    $photos_group.prepend($batch_upload);
    $batch_upload.append($batch_inner);
    $batch_inner.append($upload_area);
    $batch_inner.append($upload_button);
    $batch_inner.append($num_left);
    $batch_inner.append($progress_bar);

    $upload_area.on('change', function(event) {
        filelist = event.target.files;
    });
    $upload_button.on('click', function(event) {
        event.preventDefault();
        $.each(filelist, function() {
            files.push(this);
        });
        upload_files();
    });
};
$(function() {
    var path = window.location.pathname;

    if(path.substr(-1) == '/') {
        path = path.substr(0, path.length - 1);
    }
    gallery = path.split('/').pop();
    if (gallery != 'add') {
        batch_upload(gallery);
    }
});