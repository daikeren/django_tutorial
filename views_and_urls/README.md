# Django Views & Django URLs

到這裡大家應該會在想 "搞了半天都在弄這些有的沒的，什麼時候才能開始做我們第一個頁面呢？" 這個章節會讓我們創立第一個頁面，並且讓我們了解到 Django 很重要的兩個部分 - URL 跟 Views.

## Django Views

一個網頁程式當中的邏輯通常是這個樣子的：request 進來 -> 從資料庫撈資料 -> 處理資料 -> 把網頁呈現出來。由於現在我們還沒有講到要怎麼樣做跟資料庫之間的互動，所以我們先來講講從 request 進來到頁面呈現出來這段過程 Django 是怎麼做的。

在 Django 當中，處理這部分的邏輯稱之為 Django Views，通常我們都會放在 Django APP 當中的 views.py 檔案裡面。讓我們來寫第一個 Django View 吧！如同所有程式剛開始一樣，我們先從 Hello World 開始！

```python
from django.http import HttpResponse

def home(request):
    str = "Hello World!"
    return HttpResponse(str)
```

這是一個最簡單的 Django View，我們可以看到一個 Django View 基本上就是一個 python function，傳入值是 request，它的型別是 [HttpRequest](https://docs.djangoproject.com/en/1.6/ref/request-response/#httprequest-objects)，當中 Django 幫我們封裝了有關一個 HTTP Request 進來會傳入的資料。包含了 request body, request method... 等等，在往後的章節當中我們會看到這部分的應用。

然後回傳一個用 "Hello World!" 字串當 constructor 的 [HttpResponse](https://docs.djangoproject.com/en/1.6/ref/request-response/#httpresponse-objects) 物件。同樣的，HttpResponse 也幫我們封裝了回傳給 browser 的資訊。包含了 content type, status code 等等。

透過 Django 的 Request 還有 Response 物件，我們在處理複雜的 HTTP 的時候可以省下更多的麻煩事要處理，讓我們可以更專注在把東西做好上面。

## Django URLs

我們寫好第一個 view 之後，那麼我們該怎麼讓 Django 知道連到哪個 URL 會呼叫這個 view 呢？這就是 Django URLs 會處理的事情。讓我們打開 blog/urls.py 這個檔案，在 urlpatterns 當中加入以下的 code

```python
urlpatterns = patterns('',
    ...
    url(r'^$', 'article.views.home'),
)
```

在這邊，我們可以看到我們使用了一個 [url function](https://docs.djangoproject.com/en/1.6/ref/urls/#django.conf.urls.url) ，有三個傳入值，第一個傳入值是個 regular expression，在此我們傳入一個空字串，也就是會對應道 url 當中沒有任何東西的時候。兒第二個傳入值是個 view function 的位置，這邊我們是傳入剛剛寫的 article.views.home，你也可以這樣寫：

```
from article.views import home

urlpatterns = patterns('',
    ...
    url(r'^$', home),
)
```

這樣可以達到一樣的效果。

接著切換到你的 terminal，重新輸入

```
python manage.py runserver
```

打開你的瀏覽器，開啓 [http://localhost:8000](http://localhost:8000)，應該就會看到 Hello World! 出現！

## 練習

現在你已經會寫一個簡單的 view 還有 url 了，來再新增一個 view function，讓我們連到 http://localhost:8000/now 的時候會輸出現在的時間吧！

