# tappay-ios-sdk

### The TapPay iOS SDK helps you build customizable payments into your iOS app

---

## How to install

The TapPay iOS SDK is open source, and provided by the following methods

#### [1. Manual Framework](#manual)
#### [2. Cocoapods](#cocoapods)
#### [3. Swift Package](#package)

---

## How to use the methods in SDK

> Please refer to the example page [tappay-ios-example](https://github.com/TapPay/tappay-ios-example)

---
<a name="manual"></a>
## Manual Framework
> a. Download the TPDirect.xcframework.zip from  [releases page](https://github.com/TapPay/tappay-ios-sdk/releases)  and unzip it <br>
> b. Drag TPDirect.xcframework to the "Frameworks, Libraries and Embedded Content" section of the General settings in your Xcode project. Make sure to select Copy items if needed.

***
<a name="cocoapods"></a>
## Cocoapods
> a. Open the terminal and cd to the root path of the project which will be installed SDK. <br>
> b. Create Podfile by the following command
```
pod init
```
> c. Modify the content of Podfile like following
```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

source 'https://github.com/TapPay/tappay-ios-sdk.git'

target 'Test' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  pod 'tappay-ios-sdk'

  # Pods for Test

end

# Replace 'Test' with the project name, like 'ProjectXXX'
```
> d. Then use the following command to install SDK
```
pod install
```
> e. Finally the SDK is available for the project by using the .xcwrokspace file

***
<a name="package"></a>
## Swift Package

> a. Follow the steps of the image to add a new package dependency <br><br>
![](./tutorial_images/Swift_Package_Tutorial_1.png) <br><br>
> b. Enter https://github.com/TapPay/tappay-ios-sdk.git as the repository URL and set it as master branch <br><br>
![](./tutorial_images/Swift_Package_Tutorial_2.png) <br><br>
> c. Click add package <br><br>
![](./tutorial_images/Swift_Package_Tutorial_3.png) <br><br>
> d. If the installation is success, then the package will appear in the side menu, and you can use the SDK by adding "@import TPDirect;" <br><br>
![](./tutorial_images/Swift_Package_Tutorial_4.png)
