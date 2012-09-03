from django.shortcuts import render_to_response
from django.template import RequestContext

def features(request):
    return render_to_response('features/features.html', RequestContext(request))