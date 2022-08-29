<!-- https://www.h5w3.com/141046.html -->

## html5的13个type类型
html5中的input的type属性总共是新增了13个，我把这13个总结了一下，分别是type的这些属性：color（定义拾色器）、date（定义日期字段）、datetime（定义日期字段）、datetime-local（定义日期字段）、month（定义日期字段的月）、week（定义日期字段的周）、time（定义日期字段的时、分、秒）、email（定义用于 e-mail 地址的文本字段）、number（定义带有 spinner 控件的数字字段）、range（定义带有 slider 控件的数字字段）、search（定义用于搜索的文本字段）、tel（定义用于电话号码的文本字段）、url（定义用于 URL 的文本字段）


## 注意
input的type只能作为输入时候的数据格式选择 不能作为验证规则，验证建议用pattern在js中验证
<input type="tel" required pattern="[0-9]{3}">