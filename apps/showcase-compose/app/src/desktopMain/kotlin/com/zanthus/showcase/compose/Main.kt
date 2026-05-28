package com.zanthus.showcase.compose

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Giro Compose Catalog") {
        GiroShowcaseApp()
    }
}
