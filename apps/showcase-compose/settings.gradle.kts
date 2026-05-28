pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "showcase-compose"

include(":app")
include(":showkase")
include(":compose-lib")

project(":compose-lib").projectDir = file("../../packages/compose/lib")
