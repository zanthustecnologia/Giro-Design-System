package com.zanthus.components

import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.PlainTooltip
import androidx.compose.material3.RichTooltip
import androidx.compose.material3.TooltipBox
import androidx.compose.material3.TooltipDefaults
import androidx.compose.material3.rememberTooltipState
import androidx.compose.runtime.Composable

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GiroPlainTooltipBox(
    tooltip: @Composable () -> Unit,
    content: @Composable () -> Unit,
) {
    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        state = rememberTooltipState(),
        tooltip = { PlainTooltip { tooltip() } },
        content = content,
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GiroRichTooltipBox(
    title: @Composable (() -> Unit)? = null,
    text: @Composable () -> Unit,
    action: @Composable (() -> Unit)? = null,
    content: @Composable () -> Unit,
) {
    TooltipBox(
        positionProvider = TooltipDefaults.rememberRichTooltipPositionProvider(),
        state = rememberTooltipState(),
        tooltip = {
            RichTooltip(
                title = title,
                action = action,
                text = text,
            )
        },
        content = content,
    )
}