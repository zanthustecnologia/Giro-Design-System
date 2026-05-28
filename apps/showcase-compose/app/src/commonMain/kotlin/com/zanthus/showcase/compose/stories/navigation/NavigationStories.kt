package com.zanthus.showcase.compose.stories.navigation

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroBottomAppBar
import com.zanthus.components.GiroCenterAlignedTopAppBar
import com.zanthus.components.GiroFilledIconButton
import com.zanthus.components.GiroNavigationBar
import com.zanthus.components.GiroNavigationBarItem
import com.zanthus.components.GiroNavigationRail
import com.zanthus.components.GiroNavigationRailItem
import com.zanthus.components.GiroTab
import com.zanthus.components.GiroTabRow
import com.zanthus.components.GiroTopAppBar
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.model.CatalogStory

fun navigationCatalogSection(): CatalogSection = CatalogSection(
    title = "Navigation",
    description = "Estruturas de navegacao e descoberta do Compose DS.",
    stories = listOf(
        CatalogStory("App Bars", "Top app bar, center aligned app bar e bottom app bar.") { AppBarStory() },
        CatalogStory("Navigation Bar", "Bottom navigation do sistema com itens reais da biblioteca.") { NavigationBarStory() },
        CatalogStory("Navigation Rail & Tabs", "Navegacao lateral e abas para desktop e fluxos mais densos.") { NavigationRailAndTabsStory() },
    ),
)

@Composable
private fun AppBarStory() {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        GiroTopAppBar(title = { Text("Top app bar") })
        GiroCenterAlignedTopAppBar(title = { Text("Center aligned") })
        GiroBottomAppBar(actions = {
            GiroFilledIconButton(onClick = {}) { androidx.compose.material3.Icon(Icons.Outlined.Home, contentDescription = null) }
            GiroFilledIconButton(onClick = {}) { androidx.compose.material3.Icon(Icons.Outlined.Notifications, contentDescription = null) }
        })
    }
}

@Composable
private fun NavigationBarStory() {
    var selected by remember { mutableIntStateOf(0) }

    GiroNavigationBar(modifier = Modifier.fillMaxWidth()) {
        GiroNavigationBarItem(
            selected = selected == 0,
            onClick = { selected = 0 },
            icon = { androidx.compose.material3.Icon(Icons.Outlined.Home, contentDescription = null) },
            label = { Text("Inicio") },
        )
        GiroNavigationBarItem(
            selected = selected == 1,
            onClick = { selected = 1 },
            icon = { androidx.compose.material3.Icon(Icons.Outlined.Notifications, contentDescription = null) },
            label = { Text("Alertas") },
        )
        GiroNavigationBarItem(
            selected = selected == 2,
            onClick = { selected = 2 },
            icon = { androidx.compose.material3.Icon(Icons.Outlined.Person, contentDescription = null) },
            label = { Text("Conta") },
        )
    }
}

@Composable
private fun NavigationRailAndTabsStory() {
    var selectedRail by remember { mutableIntStateOf(0) }
    var selectedTab by remember { mutableIntStateOf(0) }

    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            GiroNavigationRail {
                GiroNavigationRailItem(
                    selected = selectedRail == 0,
                    onClick = { selectedRail = 0 },
                    icon = { androidx.compose.material3.Icon(Icons.Outlined.Home, contentDescription = null) },
                    label = { Text("Inicio") },
                )
                GiroNavigationRailItem(
                    selected = selectedRail == 1,
                    onClick = { selectedRail = 1 },
                    icon = { androidx.compose.material3.Icon(Icons.Outlined.Notifications, contentDescription = null) },
                    label = { Text("Alertas") },
                )
            }
            Text("Conteudo lateral para fluxos desktop.")
        }

        GiroTabRow(selectedTabIndex = selectedTab, modifier = Modifier.fillMaxWidth()) {
            GiroTab(selected = selectedTab == 0, onClick = { selectedTab = 0 }, text = { Text("Visao geral") })
            GiroTab(selected = selectedTab == 1, onClick = { selectedTab = 1 }, text = { Text("Detalhes") })
            GiroTab(selected = selectedTab == 2, onClick = { selectedTab = 2 }, text = { Text("Historico") })
        }
    }
}
