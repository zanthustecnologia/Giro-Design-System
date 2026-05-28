package com.zanthus.components

import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun GiroCircularProgressIndicator(modifier: Modifier = Modifier) {
    CircularProgressIndicator(modifier = modifier)
}

@Composable
fun GiroLinearProgressIndicator(
    progress: Float,
    modifier: Modifier = Modifier,
) {
    LinearProgressIndicator(progress = { progress }, modifier = modifier)
}