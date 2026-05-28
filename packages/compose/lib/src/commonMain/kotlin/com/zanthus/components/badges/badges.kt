package com.zanthus.components

import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.RowScope
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.runtime.Composable

@Composable
fun GiroBadge(content: @Composable RowScope.() -> Unit = {}) {
    Badge(content = content)
}

@Composable
fun GiroBadgedBox(
    badge: @Composable BoxScope.() -> Unit,
    content: @Composable BoxScope.() -> Unit,
) {
    BadgedBox(badge = badge, content = content)
}