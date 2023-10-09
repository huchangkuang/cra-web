const fs = require("fs");
const ora = require("ora");
const download = require("download-git-repo");
const path = require('path')

const fetchTemplate = async (name) => {
  const templateSource = 'gitee.com:huchangkuang/react-template.git#master'
  const tempPath = path.resolve(process.cwd(), `./${name}`)
  if (fs.existsSync(tempPath)) {
    await fs.rm(tempPath, { recursive: true })
  }
  fs.mkdir(tempPath, (err) => {
    if (err) {
      console.log(err)
      return;
    }
    const spinner = ora(`正在从远程仓库拉取远程模板...`).start()
    download(templateSource, tempPath, { clone: true }, async error => {
      if (error) {
        console.log(error)
        spinner.color = 'red'
        spinner.fail('拉取远程模板仓库失败！')
        await fs.rm(tempPath, { recursive: true })
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