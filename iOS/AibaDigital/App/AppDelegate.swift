//
//  AppDelegate.swift
//  Aiba Digital
//
//  Created by Andy Wu on 2023/12/28.
//

import UIKit
import FirebaseAppCheck
import FirebaseCore
import FirebaseMessaging
import GoogleSignIn
import LineSDK
import SDWebImage
import FirebaseFunctions
import TPDirect

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        LoginManager.shared.setup(channelID: Config.Line.channelId, universalLinkURL: nil)
        TPDSetup.setWithAppId(
            Int32(Config.TapPay.appId)!,
            withAppKey: Config.TapPay.appKey,
            with: Config.environment == "Production" ? .production : .sandBox)
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        var handled = false
        // return LoginManager.shared.application(app, open: url, options: options)
        if url.absoluteString.contains("google") { // fb sign in
            handled = GIDSignIn.sharedInstance.handle(url)
        }
        return handled
    }
}

