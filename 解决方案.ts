前端部分代码

1、app.module.ts

import {JsonpModule} from "@angular/jsonp";
2、需要调取数据的组件 jsonp.component.ts

import {Component} from "@angular/core";
import {Jsonp, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/map';
@Component({
    selector: "my-jsonp",
    templateUrl: "app/templates/tpl1.html"
})
export class AppComponent {
    constructor(public jsonp:Jsonp) {
        // 重点来了，url地址后面添加?callback=JSONP_CALLBACK
        let wikiUrl = 'http://localhost:3000/users?callback=JSONP_CALLBACK';
        // 也可使用URLSearchParams()设置参数，这里只有一个参数，就写在url里面了。
        // 使用map().substribe()获取数据
        this.jsonp.get(wikiUrl)
            .map(res=> res.json())
            .subscribe((response) => {
                console.log(response);
            }, (error) => {
                console.error(error);
            });
    }
}
后台部分代码（express）返回jsonp数据即可

router.get('/', function(req, res, next) {
  // 使用jsonp
  res.jsonp({"name": "heping"});
});
