# Django Template

在前一章當中我們透過在 view 當中使用 str 的方式來幫助我們輸出 HTML，不過這樣會有一個很大的壞處：通常來說 HTML 的部分可能是由前端工程師寫的，如果我們把 HTML 寫在 view 當中，會造成維護以及修改上面的困難，因此 Django 提供了 Django Template 來幫助我們解決這部分的問題。

讓我們在我們的 article 目錄底下建立一個 templates 目錄。裡面新增一個 detail.html 檔案，內容如下

```html
<html>
<head></head>
<body>
<h1>{{ article.title }}</h1>
{{ article.content }}
</body>
</html>
```


在這邊，我們可以看到基本上跟原本我們用 string formatting 的內容差別不到，只是原本 {0}、{1} 的地方被改成了 {{ article.title }} 還有 {{ article.content }}，這部分會讓 Django View 把變數傳入 template 當中。


接著，打開我們之前寫的 article/views.py，把之前寫的 detail view 改成：

```python
from django.shortcuts import render

def detail(request, pk):
    article = Article.objects.get(pk=int(pk))
    return render(request, "detail.html", {'article': article})
```

我們 import 了 [django.shortcuts.render](https://docs.djangoproject.com/en/1.6/topics/http/shortcuts/#render)，這個 function 可以幫助我們讀取 template 之後，把變數以 python dictionary 的方式傳入 template 當中，最後再 render 出來並且回傳到瀏覽器中。

在這邊大家可能會覺得好像 Django Template 也沒做什麼事情，只是個簡單的變數取代而已。不過其實 Django Template 提供了很多[內建的 template tag 跟 template filter](https://docs.djangoproject.com/en/1.6/ref/templates/builtins/)，也提供了你可以擴充 Django Template 的功能。

讓我們來試試看簡單的 Tag 跟 Filter 吧，首先讓我們來做一件很無聊的事情：如果 article 的 primary key 是 1 的話，我們就把 content 的內容變成全部大寫。要做到這件事情很簡單，透過 [if](https://docs.djangoproject.com/en/1.6/ref/templates/builtins/#if) 這個 tag 跟 [upper](https://docs.djangoproject.com/en/1.6/ref/templates/builtins/#upper) 這個 filter 就可以達到。修改 detail.html 如下：

```html
<html>
<head></head>
<body>
<h1>{{ article.title }}</h1>
{% if article.pk == 1 %}
{{ article.content|upper }}
{% endif %}
</body>
</html>
```

打開 http://localhost:8000/article/1 看看是不是有成功？

## 練習

* 如果你有完成上個章節的練習，完成了列出所有 Article 的頁面，那麼也把這個頁面改成用 Django Template 重寫吧！Hint: 可以查看 [for](https://docs.djangoproject.com/en/1.6/ref/templates/builtins/#for) 這個 Template Tag
* 試試看如果把某篇 article.content 的內容寫些 HTML tag，template render 出來會怎樣？如果跟你想的不一樣，那麼該怎麼辦呢？Hint: 可以查看 [safe](https://docs.djangoproject.com/en/1.6/ref/templates/builtins/#safe) 這個 Template Filter
