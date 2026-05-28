plugins {
    id("com.android.application")
    kotlin("android")
    id("org.jetbrains.compose")
    id("org.jetbrains.kotlin.plugin.compose")
    id("com.google.devtools.ksp")
}

android {
    namespace = "com.zanthus.showcase.compose.showkase"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.zanthus.showcase.compose.showkase"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

kotlin {
    jvmToolchain(17)
}

dependencies {
    implementation(project(":compose-lib"))
    implementation("androidx.activity:activity-compose:1.10.1")
    implementation(compose.runtime)
    implementation(compose.foundation)
    implementation(compose.material3)
    implementation(compose.materialIconsExtended)
    implementation(compose.ui)
    implementation(compose.components.uiToolingPreview)
    debugImplementation(compose.uiTooling)
    implementation("com.airbnb.android:showkase:1.0.5")
    ksp("com.airbnb.android:showkase-processor:1.0.5")
}
