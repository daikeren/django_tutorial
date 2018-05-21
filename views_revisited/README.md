# Django Views, Django URL & Django Template 再訪

到目前為止我們了解到 Django URL, Django View, Django Model 還有 Django Template 的基礎，在這個階段我們把之前所學來做個整合吧！

## 單篇文章的頁面

首先，我們先來做單篇文章的頁面。我們在這邊的目標是讓網站能夠根據 URL 為 article/1/, article/2/, ..., 等等不同的 URL，把相對應 primary key 的 article 從資料庫中取出來並且把資料 response 到瀏覽器上。

首先我們先從 views 寫起，打開 article/views.py，加上這些 code

```python
from django.shortcuts import render
from .models import Article

def article_detail(request, pk):
    article = Article.objects.get(pk=pk)
    return render(request, 'article.html', {'article': article})
```

在這邊我們寫了一個叫做 `article_detail` 的 view，傳入的參數除了 request 之外又多了 pk 這個參數，我們稍待會來講如何從 url 當中取出來 pk 的值。

接著我們就來把 url 跟 views 做結合，打開 blog/urls.py，加上這些 code

```python
from article.views import article_detail

urlpatterns = [
    ...
    url(r'article/<int:pk>/', article_detail),
]
```

在前面提過，透過 route 定義 URL 的規則，讓 Django 對應到 view function。在這邊，route 除了可以使用固定字串之外，我們還可以還可以用動態的 URL。這邊的 `article/<int:pk>/` 代表的意義如下：

1. `article/` 代表 URL 的開頭是 **article/**
2. `<int:pk>/` 這邊代表在 `article/` 後面接的是數字 (int)，並且將其對應的數字以 `pk` 這個名稱傳入對應的到 view function 當中

這邊的 `int` 在 Django 當中稱作 [converter](https://docs.djangoproject.com/en/2.0/topics/http/urls/#path-converters)，Django 預設提供了以下幾種 converter

* str: 對應到任何的非空字串，這邊會排除掉 `/` 這個字元
* int: 對應到各種正整數
* slug: 我們常常會在網址當中像是看到使用 slug 而不是 pk 作爲網址，像是 `building-your-1st-django-site` 這種字串
* uuid: uuid 是在網站、資料庫當中很常使用的，在某些狀況下，我們會透過 UUID 來代替資料庫當中的 pk。uuid 這個 converter 會回傳 UUID，舉例來說，像是 `075194d3-6885-417e-a8a8-6c931e272f00`。這個 converter 會回傳一個 [UUID](https://docs.python.org/3/library/uuid.html#uuid.UUID) 實例。
* path: 跟 `str` converter 類似，會對應到任何的非空字串，跟 `str` 不同的是 `path` 會包含 `/` 這個字元。

最後要來寫 template，在 article/tempaltes 目錄底下新增一個 `article_detail.html`，內容如下：

```html
<!DOCTYPE html>
<html>
<head>
<title>{{ article.title }}</title>
<body>
    <h1>{{ article.title }}</h1>
    <h2>{{ article.category.name }}</h2>
    <div>
        {{ article.content }}
    </div>
</body>
```

在 tempalte 當中，這邊我們把從 `article_detail` 這個 view 當中傳入的 `article.title` 以及 `article.content` 在 template 當中作變數代換顯示在頁面上面。打開瀏覽器的 http://localhost:8000/article/1/ 看看，應該會輸出你的第一篇文章內容。


## 列出所有文章的頁面

接下來，我們來製作列出所有文章的頁面。跟製作單篇文章的頁面一樣，我們先從 views 開始寫起。打開 article/views.py，加上這些程式碼

```python
def article_list(request):
    articles = Article.objects.all()
    return render(request, 'article_list.html', {'articles': articles})
```

在這邊我們寫了一個叫做 `article_list` 的 view，先用 `Article.objects.all()` 取出所有的 Article 再傳入 `article_list.html` 這個 template 當中。

接着來寫 template，在 article/tempaltes 目錄底下新增一個 `article_list.html`，內容如下：

```html
<!DOCTYPE html>
<html>
<head>
<title>Article List</title>
<body>
<div>
    {% for article in articles %}
        <h1>{{ article.title }}</h1>
        <div>{{ article.content }}</div>
    {% endfor %}
</div>
</body>
```

### Template Tags

相信來到這邊，對於 `article_list.html` 裡面大部分的內容都沒問題了。不過這邊出現了一個之前沒看過的東西，`{% for %}` 到 `{% endfor %}` 的區塊。這部分是什麼呢？在 Python 當中，如果我們要取出一個 list 當中的所有值我們會用 [for ... in](https://docs.python.org/3/tutorial/controlflow.html#for-statements) 這種語法，在 Django 當中也有提供類似的機制。在底下這段程式碼當中的 `[{% for %}](https://docs.djangoproject.com/en/2.0/ref/templates/builtins/#for)` 被稱作 template tags。

```html
    {% for article in articles %}
        <h1>{{ article.title|title }}</h1>
        <div>{{ article.content }}</div>
    {% endfor %}
```

這邊可以看到 `[for](https://docs.djangoproject.com/en/2.0/ref/templates/builtins/#for)` 這個 template tag 的語法其實跟 Python 當中的 [for](https://docs.python.org/3/tutorial/controlflow.html#for-statements) 語法十分的接近。它會取出 articles 這個 list 當中所有的元素並且一一列出來。

### Template Filters

除了 template tags ，Django 也內建也許多的 template filters。Filter 的功用是在轉換輸入的變數。它們看起來會像是以下的形式：

```html
{{ article.title|title}}
```

如果 `article.title` 的內容是 "This is a book"，那麼上面的 template 會輸出爲

```html
This Is A Book
```

除了 for 跟 title 之外，Django 也內建了許多 [template tags 以及 template filters](https://docs.djangoproject.com/en/2.0/ref/templates/builtins/)，我們可以依據我們的需求選用。以下列出一些比較常用的[template tags 以及 template filters](https://docs.djangoproject.com/en/2.0/ref/templates/builtins/)。

* for
* if
* extends
* block
* include
* csrf_token
* url
* date
* default
* length
* safe

最後我們就來把 url 跟 views 做結合，打開 blog/urls.py，加上這些 code

```python
from article.views import article_list

urlpatterns = [
    ...
    url(r'', article_list),
]
```

打開瀏覽器的 http://localhost:8000/ 看看，應該會輸出你的所有文章內容。
