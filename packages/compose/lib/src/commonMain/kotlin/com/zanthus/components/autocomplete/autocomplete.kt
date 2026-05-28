package com.zanthus.components

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun GiroAutocompleteField(
    expanded: Boolean,
    onExpandedChange: (Boolean) -> Unit,
    value: String,
    label: String,
    modifier: Modifier = Modifier,
    suggestions: @Composable () -> Unit,
) {
    GiroDropdownField(
        expanded = expanded,
        onExpandedChange = onExpandedChange,
        value = value,
        label = label,
        modifier = modifier,
        menuContent = suggestions,
    )
}
