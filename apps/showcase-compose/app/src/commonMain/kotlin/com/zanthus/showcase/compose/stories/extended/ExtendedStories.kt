package com.zanthus.showcase.compose.stories.extended

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.AccountCircle
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.MoreVert
import androidx.compose.material.icons.outlined.Search
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroAvatar
import com.zanthus.components.GiroBanner
import com.zanthus.components.GiroBottomNavigationBar
import com.zanthus.components.GiroBottomNavigationBarItem
import com.zanthus.components.GiroButtonBar
import com.zanthus.components.GiroDataTable
import com.zanthus.components.GiroExpansion
import com.zanthus.components.GiroFilledButton
import com.zanthus.components.GiroForm
import com.zanthus.components.GiroHorizontalDivider
import com.zanthus.components.GiroListTile
import com.zanthus.components.GiroPopupMenu
import com.zanthus.components.GiroPopupMenuItem
import com.zanthus.components.GiroRefreshIndicator
import com.zanthus.components.GiroSearchBar
import com.zanthus.components.GiroSegmentedButton
import com.zanthus.components.GiroStepper
import com.zanthus.components.GiroAutocompleteField
import com.zanthus.components.GiroDropdownButton
import com.zanthus.components.GiroTooltips
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.model.CatalogStory

fun extendedCatalogSection(): CatalogSection = CatalogSection(
    title = "Extended M3",
    description = "Componentes extras mapeados para manter paridade com o catálogo Flutter.",
    stories = listOf(
        CatalogStory("Avatars & Banner", "Avatares e banner de informação.") { AvatarsAndBannerStory() },
        CatalogStory("Search & Segmented", "Busca e escolha segmentada.") { SearchAndSegmentedStory() },
        CatalogStory("Data Table & Stepper", "Tabela simples e indicador de etapas.") { DataTableAndStepperStory() },
        CatalogStory("Legacy Aliases", "Bottom navigation, popup menu, button bar e refresh wrapper.") { LegacyAliasesStory() },
        CatalogStory("Coverage Extras", "Dividers, form, list tile, autocomplete, dropdown_button e tooltips.") { CoverageExtrasStory() },
    ),
)

@Composable
private fun AvatarsAndBannerStory() {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp), modifier = Modifier.fillMaxWidth()) {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
            GiroAvatar { Text("GA") }
            GiroAvatar { Icon(Icons.Outlined.AccountCircle, contentDescription = null) }
            GiroAvatar { Icon(Icons.Outlined.Settings, contentDescription = null) }
        }
        GiroBanner(
            leading = { Icon(Icons.Outlined.Info, contentDescription = null) },
            content = { Text("Você pode evoluir estes componentes com tokens e temas específicos do DS.") },
            actions = {
                GiroFilledButton(onClick = {}) {
                    Text("Entendi")
                }
            },
        )
    }
}

@Composable
private fun SearchAndSegmentedStory() {
    var query by remember { mutableStateOf("") }
    var selected by remember { mutableStateOf("Dia") }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp), modifier = Modifier.fillMaxWidth()) {
        GiroSearchBar(
            query = query,
            onQueryChange = { query = it },
            modifier = Modifier.fillMaxWidth(),
            placeholder = "Pesquisar componentes",
            leadingIcon = { Icon(Icons.Outlined.Search, contentDescription = null) },
        )

        GiroSegmentedButton(
            options = listOf("Dia", "Semana", "Mês"),
            selected = selected,
            onSelect = { selected = it },
            modifier = Modifier.fillMaxWidth(),
        ) { option ->
            Text(option)
        }
    }
}

@Composable
private fun DataTableAndStepperStory() {
    var expanded by remember { mutableStateOf(true) }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp), modifier = Modifier.fillMaxWidth()) {
        GiroExpansion(
            expanded = expanded,
            onExpandedChange = { expanded = it },
            title = { Text("Pipeline de revisão") },
        ) {
            GiroStepper(
                steps = listOf("Mapeamento", "Implementação", "Validação"),
                currentStep = 1,
            )
        }

        GiroDataTable(
            columns = listOf("Componente", "Status", "Plataforma"),
            rows = listOf(
                listOf("SearchBar", "OK", "Compose"),
                listOf("Segmented", "OK", "Compose"),
                listOf("Stepper", "OK", "Compose"),
            ),
        )
    }
}

@Composable
private fun LegacyAliasesStory() {
    var selected by remember { mutableIntStateOf(0) }
    var menuOpen by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp), modifier = Modifier.fillMaxWidth()) {
        GiroButtonBar {
            GiroFilledButton(onClick = { menuOpen = true }) { Text("Abrir menu") }
            GiroFilledButton(onClick = {}) { Text("Ação") }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            Text("Menu")
            androidx.compose.material3.IconButton(onClick = { menuOpen = true }) {
                Icon(Icons.Outlined.MoreVert, contentDescription = null)
            }
            GiroPopupMenu(expanded = menuOpen, onDismissRequest = { menuOpen = false }) {
                GiroPopupMenuItem(text = { Text("Editar") }, onClick = { menuOpen = false })
                GiroPopupMenuItem(text = { Text("Remover") }, onClick = { menuOpen = false })
            }
        }

        GiroBottomNavigationBar(modifier = Modifier.fillMaxWidth()) {
            GiroBottomNavigationBarItem(
                selected = selected == 0,
                onClick = { selected = 0 },
                icon = { Icon(Icons.Outlined.AccountCircle, contentDescription = null) },
                label = { Text("Conta") },
            )
            GiroBottomNavigationBarItem(
                selected = selected == 1,
                onClick = { selected = 1 },
                icon = { Icon(Icons.Outlined.Settings, contentDescription = null) },
                label = { Text("Config") },
            )
        }

        GiroRefreshIndicator(refreshing = false, onRefresh = {}) {
            Text("Wrapper de refresh pronto para integração com PullToRefresh quando necessário.")
        }
    }
}

@Composable
private fun CoverageExtrasStory() {
    var expanded by remember { mutableStateOf(false) }
    var value by remember { mutableStateOf("Produto") }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp), modifier = Modifier.fillMaxWidth()) {
        GiroForm(modifier = Modifier.fillMaxWidth()) {
            GiroSearchBar(
                query = value,
                onQueryChange = { value = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = "Campo de formulário",
            )

            GiroAutocompleteField(
                expanded = expanded,
                onExpandedChange = { expanded = it },
                value = value,
                label = "Autocomplete",
                modifier = Modifier.fillMaxWidth(),
            ) {
                listOf("Produto", "Pedido", "Cliente").forEach { option ->
                    GiroPopupMenuItem(text = { Text(option) }, onClick = {
                        value = option
                        expanded = false
                    })
                }
            }

            GiroDropdownButton(
                expanded = expanded,
                onExpandedChange = { expanded = it },
                value = value,
                label = "Dropdown Button",
                modifier = Modifier.fillMaxWidth(),
            ) {
                GiroPopupMenuItem(text = { Text("A") }, onClick = { expanded = false })
                GiroPopupMenuItem(text = { Text("B") }, onClick = { expanded = false })
            }
        }

        GiroHorizontalDivider()

        GiroListTile(
            headlineContent = { Text("List tile mapeado") },
            supportingContent = { Text("Alias do list item para paridade com Flutter") },
            trailingContent = { Text("OK") },
        )

        GiroTooltips(
            tooltip = { Text("Tooltip alias ativo") },
            content = { Text("Passe o mouse aqui para ver tooltip") },
        )
    }
}
