# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Preserve Fresco animated classes
-keep class com.facebook.imagepipeline.** { *; }
-keep class com.facebook.fresco.animation.** { *; }
-keep class com.facebook.fresco.animation.factory.** { *; }
-keep class com.facebook.imagepipeline.animated.factory.** { *; }
-dontwarn com.facebook.imagepipeline.**
-dontwarn com.facebook.fresco.animation.**