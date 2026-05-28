package com.zanthus.showcase.compose.stories.data_display

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroBadge
import com.zanthus.components.GiroBadgedBox
import com.zanthus.components.GiroListItem
import com.zanthus.components.GiroPlainTooltipBox
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.model.CatalogStory

fun dataDisplayCatalogSection(): CatalogSection = CatalogSection(
    title = "Data Display",
    description = "Elementos de leitura, status e composicoes informativas do DS.",
    stories = listOf(
        CatalogStory("List Item", "List item para listas densas, menus e sumarios.") { ListItemStory() },
        CatalogStory("Badges", "Badge e badged box para contagem e destaque.") { BadgeStory() },
        CatalogStory("Tooltips", "Tooltips simples para ajuda contextual no catalogo web e desktop.") { TooltipStory() },
    ),
)

@Composable
private fun ListItemStory() {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
        GiroListItem(
            headlineContent = { Text("Conta principal") },
            supportingContent = { Text("Acesse seus atalhos e preferencias") },
            leadingContent = { Icon(Icons.Outlined.Person, contentDescription = null) },
            trailingContent = { Text("Ativa") },
        )
        GiroListItem(
            headlineContent = { Text("Alertas") },
            overlineContent = { Text("Sistema") },
            supportingContent = { Text("3 configuracoes exigem revisao") },
            leadingContent = { Icon(Icons.Outlined.Notifications, contentDescription = null) },
        )
    }
}

@Composable
private fun BadgeStory() {
    Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
        GiroBadge { Text("New") }
        GiroBadgedBox(
            badge = { GiroBadge { Text("8") } },
        ) {
            Icon(Icons.Outlined.Notifications, contentDescription = null)
        }
    }
}

@Composable
private fun TooltipStory() {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Passe o mouse ou foque o elemento para validar o tooltip.")
        GiroPlainTooltipBox(
            tooltip = { Text("Informacao contextual do componente") },
        ) {
            Icon(Icons.Outlined.Info, contentDescription = null)
        }
    }
}
