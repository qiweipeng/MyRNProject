# React Native 学习项目

## 项目创建

``` bash
npx react-native@latest MyRNRroject
```

参考：[Creating a new application](https://reactnative.dev/docs/environment-setup#creating-a-new-application)

## VSCode 配置

必须安装：

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

  格式化代码快捷键：`window：shift+alt+f,mac：shift+option+f`。

- [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
  
  增强 `markdown` 文件预览

推荐安装：

- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)

- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

  包含一些常用代码块。

- [koroFileHeader](https://marketplace.visualstudio.com/items?itemName=OBKoro1.korofileheader)

  如果使用 koroFileHeader，请在本地用户的 settings.json 中添加以下内容：

  ``` json
  "fileheader.customMade": {
    "作者": "张三", // 修改为自己名字
  },
  ```

  头部注释快捷键：`window：ctrl+win+i,mac：ctrl+cmd+i`，函数注释快捷键（单行函数参数将光标放在函数行或者将光标放在函数上方的空白行，多行函数参数则鼠标左键选择多行函数声明区域）：`window：ctrl+win+t,mac：ctrl+cmd+t`。

- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)

  代码中使用 `TODO:` 和 `FIXME:` 加标注。VSCode 命令中选择： TODO-Highlight: List highlighted annotations 可以搜索项目中所有的标注。

- [Icons](https://marketplace.visualstudio.com/items?itemName=tal7aouy.icons)

- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

项目中的 `.vscode` 文件夹中添加了 `settings.json`，其中写入了本项目的默认设置：

``` json
{
 "editor.tabSize": 2,
 "editor.formatOnPaste": true,
 "eslint.packageManager": "yarn",
 "eslint.format.enable": true,
 "[javascript]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
 },
 "[typescript]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
 },
 "[javascriptreact]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
 },
 "[typescriptreact]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
 },
 "fileheader.customMade": {
  "Date": "Do not edit",
  "FilePath": "Do not edit",
  "custom_string_obkoro1": "@类描述:",
  "custom_string_obkoro1_copyright": "@版权所有: 北京XXX科技有限公司 (C) ${now_year}",
 },
 "fileheader.configObj": {
  "specialOptions": {
   "Date": "创建时间",
   "FilePath": "包路径"
  }
 },
}
```

添加了 `extensions.json`，其中写入了本项目推荐安装的插件：

``` json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "shd101wyy.markdown-preview-enhanced",
  ]
}
```

## husky（v8.x） 和 lint-staged

``` bash
yarn add --dev husky
yarn add --dev lint-staged
```

之后使用

``` bash
npm pkg set scripts.prepare="husky install" && npm run prepare
```

该命令会在 package.json 中添加 `"prepare": "husky install"`，并会创建 `.husky` 文件夹。

之后使用

``` bash
npx husky add .husky/pre-commit "yarn lint-staged && yarn tsc --skipLibCheck --noEmit"
```

该命令会在 `.husky` 文件夹下创建 `pre-commit` 文件，并写入 `yarn lint-staged && yarn tsc --skipLibCheck --noEmit` 命令。

同时，在 package.json 中添加

``` json
"lint-staged": {
  "*.js|*.jsx|*.ts|*.vue|*.tsx": [
    "eslint",
    "eslint --fix"
  ]
}
```

参考：[husky](https://typicode.github.io/husky/#/)，[lint-staged](https://github.com/okonet/lint-staged)

## 支持绝对路径

安装 `babel-plugin-module-resolver` 以支持绝对路径。

``` bash
yarn add --dev babel-plugin-module-resolver
```

之后在 `babel.config.js` 中增加：

```javascript
  // 这里将根路径设置为 babel.config.js 文件所在目录，然后设置 alias，即将 ./src 替换为 @
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
```

之后在 `tsconfig.json` 中增加：

``` json
    // 这里对应 babel.config.js 设置即可
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "src/*"
            ],
        }
    },
```

再安装 `eslint-plugin-import` 和 `eslint-import-resolver-babel-module` 增加 ESLint 的兼容

``` bash
yarn add --dev eslint-plugin-import eslint-import-resolver-babel-module
```

之后在 `.eslintrc.js` 中添加：

```javascript
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
```

## 增加测试库

安装 [react-native-testing-library](https://github.com/callstack/react-native-testing-library)

``` bash
yarn add --dev @testing-library/react-native
yarn add --dev @testing-library/jest-native
```

然后在 `package.json` 中的 `jest` 键中增加

``` json
{
  "preset": "react-native",
  "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
}
```

## 项目其他配置

### NPM 相关

如果某个npm包是另外部署的仓库地址，希望优先访问该地址，增加 `.npmrc` 文件并写入：

``` text
@qiweipeng/use-axios:registry="http://..."
```

### ESLint 相关

`.eslintrc.js` 写入：

``` javascript
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
    },
  ],
```

目的是为了使用 `@typescript-eslint/recommended` 的规则。

### 打包脚本

项目增加 `scripts` 文件夹，用以添加需要执行的脚本，该文件夹中增加脚本后，在 `package.json` 中 `scripts` 字段下加入脚本的名称和路径。

增加 `changeversion.sh` 脚本，目的是可以方便地同时修改 `iOS` 和 `Android` 的版本号并提交 `Git`，该脚本可在新版本开始时执行。

``` sh
#!/bin/sh

current_dir=${PWD##*/}
read -r -p "请输入版本号(如 1.2.0)：" version
read -r -p "将设置版本号为${version}，确定吗？ [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
sed -i "" -e "s/        versionName [^\\;]*/        versionName \"$version\"/" ./android/app/build.gradle
sed -i "" -e "s/MARKETING_VERSION \\= [^\\;]*\\;/MARKETING_VERSION = ${version};/" ./ios/$current_dir.xcodeproj/project.pbxproj
git add -A && git commit -m "Version ${version}"
echo 已设置完成
else
echo 已取消
fi
```

增加 `apppackage` 脚本，目的是生成基于当前时间的 `build` 号，提交 `Git`，之后打包 `iOS` 和 `Android`。需要注意该脚本中将项目文件夹名称作为 `iOS` 的项目名，因此打包时需要确定项目文件夹名称是否与 `iOS` 项目名一致。

``` sh
#!/bin/sh

current_dir=${PWD##*/}
minutesNumber=$(((10#$(date +"%H") * 60 + 10#$(date +"%M")) / 2))
printf -v minutesString "%03d" $minutesNumber
buildNumber=$(date +"%y%m%d")$minutesString

uname_s=$(uname -s)
os_name=${uname_s:0:6}
if [ "$os_name" == "Darwin" ]; then
sed -i "" -e "s/        versionCode [^\\;]*/        versionCode $buildNumber/" ./android/app/build.gradle
else
sed -i -e "s/        versionCode [^\\;]*/        versionCode $buildNumber/" ./android/app/build.gradle
fi

cd ios
agvtool new-version $buildNumber
cd ..

read -r -p "希望将修改后的 build 号提交到 Git 吗？ [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
git add -A && git commit -m "iOS & Android build ${buildNumber}"
echo 修改后的 build 号已提交到 Git。
else
  echo 修改后的 build 号不会提交到 Git，请稍后手动提交。
fi

cd ios
xcodebuild archive -workspace $current_dir.xcworkspace -scheme $current_dir
cd ..

cd android && ./gradlew assemble && cd ..
```

如果需要单独打包，也分别提供 `iospackage` 和 `androidpackage` 脚本。

``` sh
#!/bin/sh

current_dir=${PWD##*/}
minutesNumber=$(((10#$(date +"%H") * 60 + 10#$(date +"%M")) / 2))
printf -v minutesString "%03d" $minutesNumber
buildNumber=$(date +"%y%m%d")$minutesString

cd ios
agvtool new-version $buildNumber
read -r -p "希望将修改后的 build 号提交到 Git 吗？ [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
git add -A && git commit -m "iOS build ${buildNumber}"
echo 修改后的 build 号已提交到 Git。
else
  echo 修改后的 build 号不会提交到 Git，请稍后手动提交。
fi
xcodebuild archive -workspace $current_dir.xcworkspace -scheme $current_dir
cd ..
```

``` sh
#!/bin/sh

minutesNumber=$(((10#$(date +"%H") * 60 + 10#$(date +"%M")) / 2))
printf -v minutesString "%03d" $minutesNumber
buildNumber=$(date +"%y%m%d")$minutesString

uname_s=$(uname -s)
os_name=${uname_s:0:6}
if [ "$os_name" == "Darwin" ]; then
sed -i "" -e "s/        versionCode [^\\;]*/        versionCode $buildNumber/" ./android/app/build.gradle
else
sed -i -e "s/        versionCode [^\\;]*/        versionCode $buildNumber/" ./android/app/build.gradle
fi
read -r -p "希望将修改后的 build 号提交到 Git 吗？ [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
git add -A && git commit -m "Android build ${buildNumber}"
echo 修改后的 build 号已提交到 Git。
else
  echo 修改后的 build 号不会提交到 Git，请稍后手动提交。
fi
cd android && ./gradlew assemble && cd ..
```

## Sentry 集成

安装 Sentry SDK

``` sh
yarn add @sentry/react-native
```

安装 Sentry Wizard，这个工具的作用是可以通过脚本方便地完成项目中 Sentry 的相关配置。

``` sh
# 全局安装
yarn global add @sentry/wizard

# 或仅项目安装
yarn add @sentry/wizard
```

在默认浏览器登录 `Sentry` 账户。

之后执行 `sentry-wizard -i reactNative -p ios android -u https://xxx.com/`，其中最后是服务器地址，该脚本会修改 `iOS` 和 `Android` 项目来进行 Sentry 的相关配置。该脚本主要做如下事情。

`android/app/build.gradle` 中添加 `apply from: "../../node_modules/@sentry/react-native/sentry.gradle"`。

`iOS` 项目中增加 `Upload Debug Symbols to Sentry` 脚本，用于在项目打包前上传符号表（之后最好手动将脚本的 `For install builds only` 勾选一下）。

分别在 `iOS` 和 `Android` 项目根目录创建 `sentry.properties` 配置文件，该文件填写服务器地址、组织名、项目名、token 等信息。如果默认浏览器已经登录了 `Sentry` 服务器，此步骤会自动读取到相关信息。

``` text
defaults.url=https://sentry.io/
defaults.org=username
defaults.project=react-native-app
auth.token=52d629b10e5843ffa3ba324c8622fsddsfr23r34
```

脚本也会在 `App.tsx` 中添加 `Sentry` 的初始化方法，当然，我们也可以将其初始化移动到更合适的位置。

## iOS 相关配置配置

> 具有时效性，不同 `React Native` 版本创建的项目可能会有一些区别。

### Xcode 相关配置

修改 `Podfile`，禁用 `Hermes` 和 `Flipper`：

```ruby
:hermes_enabled => false,
# ...
:flipper_configuration => FlipperConfiguration.disabled,
```

### 将 React Native 添加到现有 iOS 项目中

最简便的方式是先创建一个完整的 RN 项目，再将 RN 项目中的 `ios` 文件夹中的内容替换为现有的项目。

下面介绍如何替换：

- 移除 RN 项目 `ios` 文件夹内容，将现有项目所有内容移动到 RN 项目的 `ios` 文件夹中；
- 根据需要适当修改 `Podfile` 文件；
- 参照 RN 中原有 iOS 项目的 `AppDelegate` 中的方式修改现有项目（也可以只在特定控制器引入 RN）；
- 在 `Target - Build Phases` 中参照 RN 原有 iOS 项目添加 `Bundle React Native code and images` 脚本：

``` text
// Bundle React Native code and images
set -e

WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
REACT_NATIVE_XCODE="../node_modules/react-native/scripts/react-native-xcode.sh"

/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

- 修改兼容性，如 info 中增加「View controller-based status bar appearance」并设置为 false，Xocde 右侧 Inspectors - Project Format 修改为「Xcode 13.0-compatible」；
- 执行 `pod install`；
