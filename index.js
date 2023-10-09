const fs = require("fs");
const ora = require("ora");
const download = require("download-git-repo");
const path = require('path')

const fetchTemplate = async (name) => {
  const templateSource = 'gitee.com:huchangkuang/react-template.git#master'
  const tempPath = path.resolve(__dirname, `./${name}`)
  if (fs.existsSync(tempPath)) {
    fs.rmdirSync(tempPath)
  }
  fs.mkdir(tempPath, (err) => {
    if (err) {
      console.log(error)
      return;
    }
    const spinner = ora(`正在从远程仓库拉取远程模板...`).start()
    download(templateSource, path.join(tempPath, name), { clone: true }, async error => {
      if (error) {
        console.log(error)
        spinner.color = 'red'
        spinner.fail('拉取远程模板仓库失败！')
        fs.rmdirSync(tempPath)
        return;
      }
      spinner.color = 'green'
      spinner.succeed('拉取远程模板仓库成功！')
    })
  })
}
module.exports = {
  fetchTemplate,
}