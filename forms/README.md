# Django Forms & Django Views 的結合

在前面我們介紹了 Django Admin 可以來對我們的 Model 做 CRUD 的動作，但是或許你還是會希望自己手刻一個新增文章的界面，那麼該怎麼做呢？傳統的 framework 可能會需要處理以下的事情：

* 用 HTML 刻個 form
* 處理 HTTP POST request
* 檢查表單欄位內容是否正確
* 把確認過的資料存進 database 當中

在 Django 當中，我們可以很輕鬆地做到這件事情。首先，先讓我們介紹 Django Form 這個 Django 當中很重要的 feature。

## Django Form

當我們有了一個 Model 之後，如果希望在頁面上面可以更新那個 Model，最簡單的方式就是生出一個表單，表單上面有 Model 所需要的欄位。當使用者填好欄位按下送出之後，
再由 web framework 處理送進來的資料，做完 validation，存進 database。

在 Django 當中提供了 Django Form 讓你可以很輕鬆的做完這件事情，讓我們來看看怎麼做吧！

首先讓我們在 article/views.py 當中新增以下的程式：

```python
from django import forms

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content', ]
```

如此我們就創造了一個依照 Article Model 的 Django Form 類別，它繼承自 [ModelForm](https://docs.djangoproject.com/en/dev/topics/forms/modelforms/) 而表單的欄位是 'title' 跟 'content' 這兩個欄位。

那麼我們要如何來使用 ArticleForm 呢？當然是在 view function 還有 template 當中來使用。在 article/views.py 當中新增以下的程式碼：

```python
from django.http import HttpResponseRedirect

def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            new_article = form.save()
            return HttpResponseRedirect('/article/' + str(new_article.pk))

    form = ArticleForm()
    return render(request, 'create_article.html', {'form': form})
```

在這邊，我們定義了一個 create view，接著我們透過 [request.method](https://docs.djangoproject.com/en/dev/ref/request-response/#django.http.HttpRequest.method) 來判斷接下來的行為。如果是一般的 method，是創建一個 ArticleForm 的 instance，並且把它傳進去 create_article.html 的 template 當中。如果 method 為 POST，Django request 會把 POST 的資料都放到 [request.POST](https://docs.djangoproject.com/en/dev/ref/request-response/#django.http.HttpRequest.POST) 當中，我們再把 request.POST 傳入 ArticleForm 當作 ArticleForm 的 constructor。接著透過 ```is_valid()``` 這個 method 來檢查輸入資料是否合法，如果是的話就存起來，最後再把網頁 redirect 到這篇的網址。

接下來我想大家也知道要幹什麼了，新增 article/templates/create_article.html 這個檔案。內容如下：

```html
<html>
<head></head>
<body>
<form action="." method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" />
</form>
</body>
</html>
```

這邊我們透過了 form.as_p 這個 method 把 form 給 render 出來，另外在這邊我們看到了 [csrf_token](https://docs.djangoproject.com/en/dev/ref/templates/builtins/#std:templatetag-csrf_token) 這個奇怪的 template tag，這個 template tag 的意義是做 [Cross Site Request Forgery protection](https://docs.djangoproject.com/en/dev/ref/contrib/csrf/)，為了防止別的網站對你的站台做攻擊。細節我們在這邊不多說，可以參考 Django 官方文件有說明。這邊只要記得當你在做 POST 的時候要記得加上 csrf_token 這個 template tag 在 form 當中送出。

最後我們再 blog/urls.py 當中加上一段 code 來把 url 跟 views 串起來：

```python
urlpatterns = patterns(''
    ...
    url(r'^create/$', 'article.views.create'),
)
```

打開瀏覽器看看 http://localhost:8000/create ，試試看你的表單吧！

