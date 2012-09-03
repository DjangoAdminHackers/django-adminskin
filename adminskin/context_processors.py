from adminskin.models import Feature

def features(request):
    return {
        'features': Feature.objects.all(),
    }