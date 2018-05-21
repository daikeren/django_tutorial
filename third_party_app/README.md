# Django 的第三方套件們

不知道到這邊為止大家有沒有體會到 Django 強大的威力？目前為止我們都只是用 Django 本身自帶的功能，但是 Django 除了自己本身有完整的功能外，還有許多的第三方套件可以使用。目前大多的第三方套件都能夠在 [Django Packages](https://www.djangopackages.com/) 尋找到。

讓我們來裝個套件玩玩吧！前面看過了 Django Admin 的畫面，我想有些人會覺得配色、版面看起來都太古老，希望可以漂亮一點。在這邊，我們來用 [django-grappelli](https://django-grappelli.readthedocs.io/en/latest/) 來強化 Django Admin!

首先，切換到你的 shell，輸入

```pipenv install django-grappelli```

接著，在 blog/settings.py 當中修改 INSTALLED_APPS，加入 grappelli 進去，記得要放在 django.contrib.admin 之前。

```python
INSTALLED_APPS = [
    ...
    'grappelli',
    'django.contrib.admin',
    ...
]
```

最後，在 blog/urls.py 當中加上對應的 URL

```python
urlpatterns = [
    ...
    path('grappelli/', include('grappelli.urls')), # grappelli URLS
    ...
]
```

打開 http://localhost:8000/admin ，看看 Django Admin 是不是長的不太一樣了呢？
