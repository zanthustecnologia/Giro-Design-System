package com.zanthus.components

import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.DatePickerState
import androidx.compose.material3.DateRangePicker
import androidx.compose.material3.DateRangePickerState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GiroDatePicker(
    state: DatePickerState,
    modifier: Modifier = Modifier,
) {
    DatePicker(state = state, modifier = modifier)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GiroDateRangePicker(
    state: DateRangePickerState,
    modifier: Modifier = Modifier,
) {
    DateRangePicker(state = state, modifier = modifier)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GiroDatePickerDialog(
    onDismissRequest: () -> Unit,
    confirmButton: @Composable () -> Unit,
    dismissButton: @Composable (() -> Unit)? = null,
    content: @Composable () -> Unit,
) {
    DatePickerDialog(
        onDismissRequest = onDismissRequest,
        confirmButton = confirmButton,
        dismissButton = dismissButton,
        content = { content() },
    )
}