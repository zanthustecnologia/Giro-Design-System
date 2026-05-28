package com.zanthus.showcase.compose.model

import androidx.compose.runtime.Composable

data class CatalogStory(
    val title: String,
    val description: String,
    val content: @Composable () -> Unit,
)

data class CatalogSection(
    val title: String,
    val description: String,
    val stories: List<CatalogStory>,
)
