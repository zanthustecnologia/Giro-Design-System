package com.zanthus.showcase.compose.stories.actions

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Add
import androidx.compose.material.icons.outlined.Edit
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroExtendedFloatingActionButton
import com.zanthus.components.GiroFilledButton
import com.zanthus.components.GiroFilledIconButton
import com.zanthus.components.GiroFloatingActionButton
import com.zanthus.components.GiroIconButton
import com.zanthus.components.GiroLargeFloatingActionButton
import com.zanthus.components.GiroOutlinedButton
import com.zanthus.components.GiroOutlinedIconButton
import com.zanthus.components.GiroSmallFloatingActionButton
import com.zanthus.components.GiroTextButton
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.model.CatalogStory

fun actionsCatalogSection(): CatalogSection = CatalogSection(
    title = "Actions",
    description = "Controles primarios do sistema para CTA, acoes rapidas e iconografia.",
    stories = listOf(
        CatalogStory("Buttons", "Botoes filled, outlined e text do DS.") { ButtonsStory() },
        CatalogStory("Floating Action Buttons", "Variantes padrao do Material 3 encapsuladas pelo DS.") { FabStory() },
        CatalogStory("Icon Buttons", "Estados e estilos de icon buttons do sistema.") { IconButtonsStory() },
    ),
)

@Composable
private fun ButtonsStory() {
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        GiroFilledButton(onClick = {}) { Text("Filled") }
        GiroOutlinedButton(onClick = {}) { Text("Outlined") }
        GiroTextButton(onClick = {}) { Text("Text") }
    }
}

@Composable
private fun FabStory() {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            GiroFloatingActionButton(onClick = {}) { Icon(Icons.Outlined.Add, contentDescription = null) }
            GiroSmallFloatingActionButton(onClick = {}) { Icon(Icons.Outlined.Add, contentDescription = null) }
            GiroLargeFloatingActionButton(onClick = {}) { Icon(Icons.Outlined.Add, contentDescription = null) }
        }
        GiroExtendedFloatingActionButton(
            onClick = {},
            icon = { Icon(Icons.Outlined.Edit, contentDescription = null) },
        ) {
            Text("Criar")
        }
    }
}

@Composable
private fun IconButtonsStory() {
    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        GiroIconButton(onClick = {}) { Icon(Icons.Outlined.Edit, contentDescription = null) }
        GiroFilledIconButton(onClick = {}) { Icon(Icons.Outlined.Edit, contentDescription = null) }
        GiroOutlinedIconButton(onClick = {}) { Icon(Icons.Outlined.Edit, contentDescription = null) }
    }
}
