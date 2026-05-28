package com.zanthus.components

import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.material3.NavigationRail
import androidx.compose.material3.NavigationRailItem
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun GiroNavigationRail(
    modifier: Modifier = Modifier,
    header: @Composable (ColumnScope.() -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit,
) {
    NavigationRail(modifier = modifier, header = header, content = content)
}

@Composable
fun GiroNavigationRailItem(
    selected: Boolean,
    onClick: () -> Unit,
    icon: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    label: @Composable (() -> Unit)? = null,
    alwaysShowLabel: Boolean = true,
    enabled: Boolean = true,
) {
    NavigationRailItem(
        selected = selected,
        onClick = onClick,
        icon = icon,
        modifier = modifier,
        label = label,
        alwaysShowLabel = alwaysShowLabel,
        enabled = enabled,
    )
}