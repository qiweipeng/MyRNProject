# React Native 学习项目

## 项目创建

```
npx react-native init MyRNRroject
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
