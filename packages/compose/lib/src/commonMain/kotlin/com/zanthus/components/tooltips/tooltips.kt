package com.zanthus.components

import androidx.compose.runtime.Composable

@Composable
fun GiroTooltips(
    tooltip: @Composable () -> Unit,
    content: @Composable () -> Unit,
) {
    GiroPlainTooltipBox(tooltip = tooltip, content = content)
}
