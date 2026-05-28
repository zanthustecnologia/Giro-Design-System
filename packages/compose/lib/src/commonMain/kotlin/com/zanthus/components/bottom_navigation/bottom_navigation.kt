package com.zanthus.components

import androidx.compose.foundation.layout.RowScope
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.Dp

@Composable
fun GiroBottomNavigationBar(
    modifier: Modifier = Modifier,
    tonalElevation: Dp = androidx.compose.material3.NavigationBarDefaults.Elevation,
    content: @Composable RowScope.() -> Unit,
) {
    GiroNavigationBar(modifier = modifier, tonalElevation = tonalElevation, content = content)
}

@Composable
fun RowScope.GiroBottomNavigationBarItem(
    selected: Boolean,
    onClick: () -> Unit,
    icon: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    label: @Composable (() -> Unit)? = null,
    alwaysShowLabel: Boolean = true,
    enabled: Boolean = true,
) {
    GiroNavigationBarItem(
        selected = selected,
        onClick = onClick,
        icon = icon,
        modifier = modifier,
        label = label,
        alwaysShowLabel = alwaysShowLabel,
        enabled = enabled,
    )
}
