const fs = require('fs');
const compressing = require('compressing');
class Zip {
  constructor(option) {
    this.option = option;
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('Zip', (_, cb) => {
      let exist = fs.existsSync(this.option.filePath);
      if (exist) {
        if (!fs.existsSync(this.option.zipPath)) {
          //zip压缩保存的目录不存在了,先创建
          fs.mkdirSync(this.option.zipPath);
        }
        let fileName = 'target.zip';
        if (this.option.zipName) {
          fileName = `/${this.option.zipName}.zip`;
        }
        let zipPath = this.option.zipPath + fileName;
        if (fs.existsSync(zipPath)) {
          // 压缩包存在，先删除压缩包
          fs.unlinkSync(zipPath);
        }
        compressing.zip
          .compressDir(this.option.filePath, zipPath)
          .then(() => {
            cb();
          })
          .catch(err => {
            cb();
          });
      } else {
        cb();
      }
    });
  }
}
exports = module.exports = Zip;
