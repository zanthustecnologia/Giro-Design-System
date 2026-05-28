package com.zanthus.components

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ColorScheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Surface
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Immutable
data class GiroThemeSpec(
    val lightColorScheme: ColorScheme = lightColorScheme(),
    val darkColorScheme: ColorScheme = darkColorScheme(),
    val typography: Typography = Typography(),
    val shapes: Shapes = Shapes(),
)

@Composable
fun GiroTheme(
    darkTheme: Boolean = false,
    spec: GiroThemeSpec = GiroThemeSpec(),
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = if (darkTheme) spec.darkColorScheme else spec.lightColorScheme,
        typography = spec.typography,
        shapes = spec.shapes,
        content = content,
    )
}

@Composable
fun GiroPreviewSurface(
    modifier: Modifier = Modifier,
    contentAlignment: Alignment = Alignment.TopStart,
    content: @Composable BoxScope.() -> Unit,
) {
    Surface(modifier = modifier.fillMaxSize()) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            contentAlignment = contentAlignment,
            content = content,
        )
    }
}