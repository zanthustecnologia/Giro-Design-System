@file:OptIn(androidx.compose.ui.ExperimentalComposeUiApi::class)

package com.zanthus.showcase.compose

import androidx.compose.ui.window.ComposeViewport
import kotlinx.browser.document

fun main() {
    ComposeViewport(document.body!!) {
        GiroShowcaseApp()
    }
}
