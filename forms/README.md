# Django Forms & Django Views 的結合

在前面我們介紹了 Django Admin 可以來對我們的 Model 做 CRUD 的動作，但是或許你還是會希望自己手刻一個新增文章的界面，那麼該怎麼做呢？傳統的 framework 可能會需要處理以下的事情：

* 用 HTML 刻個 form
* 處理 HTTP POST request
* 檢查表單欄位內容是否正確
* 把確認過的資料存進 database 當中

