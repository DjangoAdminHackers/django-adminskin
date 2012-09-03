from django.conf.urls.defaults import *

urlpatterns = patterns('adminskin.views',
    url(r'^$', 'features', name='features'),
)