package com.zanthus.components

import androidx.compose.runtime.Composable

@Composable
fun GiroPopupMenu(
    expanded: Boolean,
    onDismissRequest: () -> Unit,
    content: @Composable () -> Unit,
) {
    GiroMenu(expanded = expanded, onDismissRequest = onDismissRequest, content = content)
}

@Composable
fun GiroPopupMenuItem(
    text: @Composable () -> Unit,
    onClick: () -> Unit,
) {
    GiroMenuItem(text = text, onClick = onClick)
}
