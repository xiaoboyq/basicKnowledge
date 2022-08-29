# 配置文件
ESLint 支持几种格式的配置文件，如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

JavaScript - 使用 .eslintrc.js 然后输出一个配置对象。
YAML - 使用 .eslintrc.yaml 或 .eslintrc.yml 去定义配置的结构。
JSON -使用 .eslintrc.json 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
Deprecated -使用 .eslintrc，可以使 JSON 也可以是 YAML。
package.json - 在 package.json 里创建一个 eslintConfig 属性，在那里定义你的配置。

# 配置规则格式
规则格式是<规则名称>: <告警级别>，告警级别分为三种:

"0"表示忽略问题，等同于"off";
"1"表示给出警告，等同于"warn";
"2"表示直接报错，等同于"error"