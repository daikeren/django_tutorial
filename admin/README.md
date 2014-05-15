# Django 最吸引人的 feature 之一 - Django Admin

上一個章節我們了解到 Django Model 要怎麼建置，也透過了 Django Shell 來對 Model 做操作，但是常常我們會希望能夠直接有個方便的網頁界面可能對這些 Model 做創造、讀取、更新、刪除的動作，那麼該怎麼辦呢？許多的 web framework 可能都需要手動刻一個這樣的界面，但是 Django 當中有 admin 這個套件來幫你很容易地完成相關的事情。

首先我們先在 settings.py 當中的 INSTALLED_APPS 當中加入 'django.contrib.admin' 這個 app

```python
INSTALLED_APPS = (
...
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
...
)
```

接著在 blog/urls.py 當中加上

```python
from django.contrib import admin
admin.autodiscover()

urlpatterns = pattern('',
    ...
    url(r'^admin/', include(admin.site.urls)),
)
```

接著造訪 http://localhost:8000/admin ，使用你在上一章當中創建的 user/password 登入，如果一切順利的話你會看到 Django Admin 的畫面。不過這個時候 Django Admin 還看不到我們建立的 Tag, Article 這兩個 Model，所以我們要告訴 Django Admin 這件事情。

在 article 目錄底下，新增 admin.py，內容如下：

```python
from django.contrib import admin
from article.models import Article, Category

admin.site.register(Article)
admin.site.register(Category)
```

這時候重新 reload http://localhost:8000/admin，應該就會看到上面出現 Article 跟 Category 的 admin 界面，我們就可以在這邊做創造、讀取、更新、刪除的動作了。
