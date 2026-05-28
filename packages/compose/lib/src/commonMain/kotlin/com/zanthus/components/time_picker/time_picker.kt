package com.zanthus.components

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.TimeInput
import androidx.compose.material3.TimePicker
import androidx.compose.material3.TimePickerState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GiroTimePicker(
    state: TimePickerState,
    modifier: Modifier = Modifier,
) {
    TimePicker(state = state, modifier = modifier)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GiroTimeInput(
    state: TimePickerState,
    modifier: Modifier = Modifier,
) {
    TimeInput(state = state, modifier = modifier)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GiroTimePickerDialog(
    onDismissRequest: () -> Unit,
    confirmButton: @Composable () -> Unit,
    dismissButton: @Composable (() -> Unit)? = null,
    content: @Composable () -> Unit,
) {
    AlertDialog(
        onDismissRequest = onDismissRequest,
        confirmButton = confirmButton,
        dismissButton = dismissButton,
        text = { content() },
    )
}