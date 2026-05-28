package com.zanthus.showcase.compose.stories

import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.stories.actions.actionsCatalogSection
import com.zanthus.showcase.compose.stories.communication.communicationCatalogSection
import com.zanthus.showcase.compose.stories.containment.containmentCatalogSection
import com.zanthus.showcase.compose.stories.data_display.dataDisplayCatalogSection
import com.zanthus.showcase.compose.stories.extended.extendedCatalogSection
import com.zanthus.showcase.compose.stories.input.inputCatalogSection
import com.zanthus.showcase.compose.stories.navigation.navigationCatalogSection
import com.zanthus.showcase.compose.stories.selection.selectionCatalogSection

fun composeCatalogSections(): List<CatalogSection> = listOf(
    actionsCatalogSection(),
    communicationCatalogSection(),
    containmentCatalogSection(),
    navigationCatalogSection(),
    selectionCatalogSection(),
    inputCatalogSection(),
    dataDisplayCatalogSection(),
    extendedCatalogSection(),
)
