package com.zanthus.components

import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun GiroTabRow(
    selectedTabIndex: Int,
    modifier: Modifier = Modifier,
    tabs: @Composable () -> Unit,
) {
    TabRow(selectedTabIndex = selectedTabIndex, modifier = modifier, tabs = tabs)
}

@Composable
fun GiroScrollableTabRow(
    selectedTabIndex: Int,
    modifier: Modifier = Modifier,
    tabs: @Composable () -> Unit,
) {
    ScrollableTabRow(selectedTabIndex = selectedTabIndex, modifier = modifier, tabs = tabs)
}

@Composable
fun GiroTab(
    selected: Boolean,
    onClick: () -> Unit,
    text: @Composable (() -> Unit)? = null,
    icon: @Composable (() -> Unit)? = null,
) {
    Tab(selected = selected, onClick = onClick, text = text, icon = icon)
}