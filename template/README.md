# Django Template

在前一章當中我們透過在 view 當中使用直接輸出字串的方式來幫助我們輸出 HTML，不過這樣會有一個很大的壞處：通常來說 HTML 的部分可能是由前端工程師寫的，如果我們把 HTML 寫在 view 當中，會造成維護以及修改上面的困難，因此 Django 提供了 Django Template 來幫助我們解決這部分的問題。

## 第一個 Template

讓我們在我們的 article 目錄底下建立一個 templates 目錄。裡面新增一個 now.html 檔案，內容如下

```html
<!DOCTYPE html>
<html>
<head>
<title>
This is an example template
</title>
</head>
<body>
<h1>{{ now }}</h1>
</body>
</html>
```

在這邊，我們發現有個特別的

```html
<h1>{{ now }}</h1>
```

的部分，這邊用 `{{ now }}` 代表的是這部分會由從 django view 當中傳入的 `now` 來做變數的代換

接著，打開我們之前寫的 article/views.py，把之前寫的 now view 改成：

```python
from django.shortcuts import render

def now(request):
    return render(request, "now.html", {'now': datetime.now()})
```


我們 import 了 [django.shortcuts.render](https://docs.djangoproject.com/en/2.0/topics/http/shortcuts/#render)，這個 function 可以幫助我們讀取 template 之後，把變數以 python dictionary 的方式傳入 template 當中，最後再 render 出來並且回傳到瀏覽器中。打開 http://localhost:8000/now 看看，如果都沒做錯的話應該會出現類似以下的畫面。

![now](img/now.png)

在這邊大家可能會覺得好像 Django Template 也沒做什麼事情，只是個簡單的變數取代而已。不過其實 Django Template 提供了很多[內建的 template tag 跟 template filter](https://docs.djangoproject.com/en/2.0/ref/templates/builtins/)，也提供了你可以擴充 Django Template 的功能。

比如說我們這邊希望修改一下 `{{ now }}` 所輸出的格式，原本是的 `May 17, 2018, 7:22am` 的格式想改成 `Thu 17 May 2018` 這種樣子，我們可以把原本的 `{{ now }}` 改成 `{{ now|date:"D d M Y" }}`。這邊我們使用了 `[date](https://docs.djangoproject.com/en/2.0/ref/templates/builtins/#date)` 這個 template tag，你也可以參考說明改成你想要的形式。

這邊我們很簡單的寫了第一個 template，也用了一個 template tag，在後面我們會更詳細的介紹其他的 template 應用。
