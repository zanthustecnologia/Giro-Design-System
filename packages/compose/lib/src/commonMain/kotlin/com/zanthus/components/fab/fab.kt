package com.zanthus.components

import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.LargeFloatingActionButton
import androidx.compose.material3.SmallFloatingActionButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun GiroFloatingActionButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    FloatingActionButton(onClick = onClick, modifier = modifier, content = content)
}

@Composable
fun GiroSmallFloatingActionButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    SmallFloatingActionButton(onClick = onClick, modifier = modifier, content = content)
}

@Composable
fun GiroLargeFloatingActionButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    LargeFloatingActionButton(onClick = onClick, modifier = modifier, content = content)
}

@Composable
fun GiroExtendedFloatingActionButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    icon: @Composable (() -> Unit)? = null,
    text: @Composable () -> Unit,
) {
    if (icon == null) {
        ExtendedFloatingActionButton(
            onClick = onClick,
            modifier = modifier,
            content = { text() },
        )
    } else {
        ExtendedFloatingActionButton(
            text = text,
            icon = icon,
            onClick = onClick,
            modifier = modifier,
        )
    }
}