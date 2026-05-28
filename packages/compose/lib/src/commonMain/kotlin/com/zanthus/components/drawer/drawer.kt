package com.zanthus.components

import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.material3.DrawerState
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun GiroModalNavigationDrawer(
    drawerState: DrawerState,
    modifier: Modifier = Modifier,
    drawerContent: @Composable ColumnScope.() -> Unit,
    content: @Composable () -> Unit,
) {
    ModalNavigationDrawer(
        drawerState = drawerState,
        modifier = modifier,
        drawerContent = { GiroModalDrawerSheet(content = drawerContent) },
        content = content,
    )
}

@Composable
fun GiroModalDrawerSheet(
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit,
) {
    ModalDrawerSheet(modifier = modifier, content = content)
}