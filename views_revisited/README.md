# Django Views & Django URL 再訪

到目前為止我們了解到 Django URL, Django View 還有 Django Model 的基礎，在這個階段我們把之前所學來做個整合吧！我們在這邊的目標是讓網站能夠根據 URL 為 article/1/, article/2/, ..., 等等不同的 URL，把相對應 primary key 的 article 從資料庫中取出來並且把資料 response 到瀏覽器上。

首先我們先從 views 寫起吧！打開 article/views.py，加上這些 code

```python
from article.models import Article

def detail(request, pk):
    article = Article.objects.get(pk=int(pk))
    s = """
    <html>
    <head></head>
    <body>
    <h1>{0}</h1>
    {1}
    </body>
    </html>
    """.format(article.title, article.content)
    return HttpResponse(s)
```

在這邊我們寫了一個叫做 detail 的 view，傳入的參數除了 request 之外又多了 pk 這個參數，我們稍待會來講如何從 url 當中取出來 pk 的值。

接下來我們一樣使用了一個 str 變數，並且把取出的 article.title 以及 article.content 透過 [Python String Formatting](https://docs.python.org/2/library/stdtypes.html#string-formatting) 傳入來幫助我們輸出 HTML。最後再用 HttpResponse 把 HTML 吐出來。

接著我們就來把 url 跟 views 做結合吧！打開 blog/urls.py，加上這些 code

```python
urlpatterns = patterns('',
    ...
    url(r'^article/(?P<pk>[0-9]+)/$', 'article.views.detail'),
)
```

在這邊，我們透過傳入 regular expression，把所有 article/1/、article/2/... 等等的 URL patterns 都丟給剛剛我們寫的 view 做處理。

打開瀏覽器的 http://localhost:8000/article/1/ 看看，是不是會輸出你的第一篇文章內容？

## 練習

* 讓我們來把原本首頁的 Hello World 改成列出所有的 Article 吧！Hint: 我們可以用 Article.objects.all() 取出所有的 Article 物件，然後跑個 for loop 就好了！
