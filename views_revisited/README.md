# Django Views, Django URL & Django Template 再訪

到目前為止我們了解到 Django URL, Django View, Django Model 還有 Django Template 的基礎，在這個階段我們把之前所學來做個整合吧！我們在這邊的目標是讓網站能夠根據 URL 為 article/1/, article/2/, ..., 等等不同的 URL，把相對應 primary key 的 article 從資料庫中取出來並且把資料 response 到瀏覽器上。

首先我們先從 views 寫起吧！打開 article/views.py，加上這些 code

```python
from django.shortcuts import render
from .models import Article

def detail(request, pk):
    article = Article.objects.get(pk=pk)
    return render(request, 'article.html', {'post': post})
```

在這邊我們寫了一個叫做 detail 的 view，傳入的參數除了 request 之外又多了 pk 這個參數，我們稍待會來講如何從 url 當中取出來 pk 的值。

接著我們就來把 url 跟 views 做結合吧！打開 blog/urls.py，加上這些 code

```python
from article.views import detail

urlpatterns = [
    ...
    url(r'article/<int:pk>/', detail),
]
```

在前面提過，透過 route 定義 URL 的規則，讓 Django 對應到 view function。在這邊，route 除了可以使用固定字串之外，我們還可以還可以用動態的 URL。這邊的 `article/<int:pk>/` 代表的意義如下：

1. `article/` 代表 URL 的開頭是 **article/**
2. `<int:pk>/` 這邊代表在 `article/` 後面接的是數字 (int)，並且將其對應的數字以 `pk` 這個名稱傳入對應的到 view function 當中

這邊的 `int` 在 Django 當中稱作 [converter](https://docs.djangoproject.com/en/2.0/topics/http/urls/#path-converters)，Django 預設提供了以下幾種 converter

* str: 對應到任何的非空字串，這邊會排除掉 `/` 這個字元
* int: 對應到各種正整數
* slug: 像是 `building-your-1st-django-site` 這種字串
* uuid: uuid 是在網站、資料庫當中很常使用的，在某些狀況下，我們會透過 UUID 來代替資料庫當中的 pk。uuid 這個 converter 會回傳 UUID，舉例來說，像是 `075194d3-6885-417e-a8a8-6c931e272f00`，會回傳一個 [UUID](https://docs.python.org/3/library/uuid.html#uuid.UUID) 實例。
* path: 跟 `str` converter 類似，會對應到任何的非空字串，跟 `str` 不同的是 `path` 會包含 `/` 這個字元。

打開瀏覽器的 http://localhost:8000/article/1/ 看看，是不是會輸出你的第一篇文章內容？

## 練習

* 讓我們來把原本首頁的 Hello World 改成列出所有的 Article 吧！Hint: 我們可以用 Article.objects.all() 取出所有的 Article 物件，然後跑個 for loop 就好了！
