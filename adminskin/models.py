from django.db import models

class Feature(models.Model):
    title = models.CharField(max_length='200')
    description = models.TextField()
    features = models.TextField()
    added = models.DateField(auto_now=False, auto_now_add=False)

    class Meta:
        ordering = ['-added']
        
    def __unicode__(self):
        return self.title