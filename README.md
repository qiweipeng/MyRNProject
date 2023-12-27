# React Native 学习项目

## 项目创建

``` zsh
npx react-native@latest MyRNRroject
```

参考：[Creating a new application](https://reactnative.dev/docs/environment-setup#creating-a-new-application)

## 配置

### Xcode 相关配置

修改 `Podfile`，禁用 `Hermes` 和 `Flipper`：

``` ruby
:hermes_enabled => false,
# ...
:flipper_configuration => FlipperConfiguration.disabled,
```

## Reat Native 理解（已废弃）

### React Native 与本地的桥接

在 iOS 项目中，RN 的桥接主要是：

一是创建 `RCTBridge` 这个类的对象，并设置代理。这决定了 RN 的内容如何加载到 iOS 项目中，在 Debug 环境下是实时加载的，而在 Release 环境下会打包到 `main.jsbundle` 中去。

``` objc
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
```

二是将创建一个 `UIView` 的 RN 的视图对象，并将这个视图作为一个 iOS 的控制器的根视图，以把 RN 的内容显示出来。

``` objc
    NSDictionary *initProps = [self prepareInitialProps];
    UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"MyRNProject", initProps);
```

这个视图对象的创建需要三个参数：

一是一个 `RCTBridge` 的对象。

二是 `moduleName` 即一个 RN 项目中的模块名，这里的字符串 `moduleName` 对应到 RN 中就是 index.js 中的 `AppRegistry.registerComponent(appName, () => App);` 的 `appName`。而 `AppRegistry.registerComponent(appName, () => App);` 中的 `App` 就是将要作为桥接的根视图显示的那个根组件，一般会是 `App.js`。也就是说，我们在 index.js 中可以使用该方法注册多个 `component`，然后提供给 iOS 中原生视图的不同控制器中，达到 React Native 与原生混编的目的。

三是 `initProps` 即初始的配置信息，比如在 React18 之后可以设置 `concurrentRoot` 的开关。

### 如何将 React Native 添加到现有到 iOS 项目中

最简便的方式是先创建一个完整的 RN 项目，再将 RN 项目中的 `ios` 文件夹中的内容替换为现有的项目。

下面介绍如何替换：

- 移除 RN 项目 `ios` 文件夹内容，将现有项目所有内容移动到 RN 项目的 `ios` 文件夹中；
- 根据需要适当修改 `Podfile` 文件；
- 参照 RN 中原有 iOS 项目的 `AppDelegate` 中的方式修改现有项目（当然也可以只在特定控制器引入 RN）；
- 在 `Target - Build Phases` 中参照 RN 原有 iOS 项目添加 `Start Packager` 和 `Bundle React Native code and images` 脚本：

``` shell
// Start Packager
// 不勾选 Show environment variables in build log
export RCT_METRO_PORT="${RCT_METRO_PORT:=8081}"
echo "export RCT_METRO_PORT=${RCT_METRO_PORT}" > "${SRCROOT}/../node_modules/react-native/scripts/.packager.env"
if [ -z "${RCT_NO_LAUNCH_PACKAGER+xxx}" ] ; then
  if nc -w 5 -z localhost ${RCT_METRO_PORT} ; then
    if ! curl -s "http://localhost:${RCT_METRO_PORT}/status" | grep -q "packager-status:running" ; then
      echo "Port ${RCT_METRO_PORT} already in use, packager is either not running or not running correctly"
      exit 2
    fi
  else
    open "$SRCROOT/../node_modules/react-native/scripts/launchPackager.command" || echo "Can't start packager automatically"
  fi
fi

// Bundle React Native code and images
set -e

WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
REACT_NATIVE_XCODE="../node_modules/react-native/scripts/react-native-xcode.sh"

/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

- 执行 `pod install`；
