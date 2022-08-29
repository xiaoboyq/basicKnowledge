//  npm install request 
//  npm install cheerio  //Cheerio 包括了 jQuery 核心的子集, Cheerio 几乎能够解析任何的 HTML 和 XML document。Cheerio 从jQuery库中去除了所有 DOM不一致性和浏览器尴尬的部分
//  npm install iconv-lite  // 解码 node不支持gbk gb2312  通过 iconv-lite可以实现中文字符解码

// cheerio 是jquery核心功能的一个快速灵活而又简洁的实现，主要是为了用在 服务器端需要对DOM进行操作的地方（因为在服务端不能操作DOM）
// cheerio 是nodejs的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种Web爬虫程序。
// 参考文档： https://blog.csdn.net/weixin_45969777/article/details/106158057

const originRequest = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
function request(url, callback) {
  // const options = {
  //   url: url,
  //   encoding: null
  // };
  originRequest(url, callback);
}

for (let i = 100553; i < 100590; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`;
  request(url, function (err, res, body) {
    const html = iconv.decode(body, "gbk"); // 依旧是乱码
    const $ = cheerio.load(html);
    console.log($(".title_all h1").text());
  });
}