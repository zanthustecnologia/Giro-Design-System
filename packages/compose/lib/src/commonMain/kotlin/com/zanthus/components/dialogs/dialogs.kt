package com.zanthus.components

import androidx.compose.material3.AlertDialog
import androidx.compose.runtime.Composable

@Composable
fun GiroAlertDialog(
    onDismissRequest: () -> Unit,
    confirmButton: @Composable () -> Unit,
    title: @Composable (() -> Unit)? = null,
    text: @Composable (() -> Unit)? = null,
    dismissButton: @Composable (() -> Unit)? = null,
) {
    AlertDialog(
        onDismissRequest = onDismissRequest,
        confirmButton = confirmButton,
        title = title,
        text = text,
        dismissButton = dismissButton,
    )
}