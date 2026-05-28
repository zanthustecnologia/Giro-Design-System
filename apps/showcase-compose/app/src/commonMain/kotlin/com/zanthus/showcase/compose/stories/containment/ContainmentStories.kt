@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.zanthus.showcase.compose.stories.containment

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroCard
import com.zanthus.components.GiroElevatedCard
import com.zanthus.components.GiroFilledButton
import com.zanthus.components.GiroModalBottomSheet
import com.zanthus.components.GiroModalNavigationDrawer
import com.zanthus.components.GiroOutlinedCard
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.model.CatalogStory
import kotlinx.coroutines.launch

fun containmentCatalogSection(): CatalogSection = CatalogSection(
    title = "Containment",
    description = "Superficies, cards, drawers e sheets que estruturam fluxos.",
    stories = listOf(
        CatalogStory("Cards", "Variantes basicas de card do DS.") { CardsStory() },
        CatalogStory("Drawer", "Modal drawer consumindo o wrapper da biblioteca.") { DrawerStory() },
        CatalogStory("Bottom Sheet", "Sheet modal para acoes contextuais e detalhes.") { BottomSheetStory() },
    ),
)

@Composable
private fun CardsStory() {
    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        GiroCard(modifier = Modifier.weight(1f)) {
            Text("Card", modifier = Modifier.padding(16.dp))
        }
        GiroElevatedCard(modifier = Modifier.weight(1f)) {
            Text("Elevated", modifier = Modifier.padding(16.dp))
        }
        GiroOutlinedCard(modifier = Modifier.weight(1f)) {
            Text("Outlined", modifier = Modifier.padding(16.dp))
        }
    }
}

@Composable
private fun DrawerStory() {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    GiroModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            Text("Navegacao do DS", modifier = Modifier.padding(16.dp))
            Text("Tokens entram depois, mas a estrutura ja esta separada.", modifier = Modifier.padding(16.dp))
        },
    ) {
        GiroFilledButton(onClick = { scope.launch { drawerState.open() } }) {
            Text("Abrir drawer")
        }
    }
}

@Composable
private fun BottomSheetStory() {
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    var visible by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        GiroFilledButton(onClick = { visible = true }) { Text("Abrir bottom sheet") }
        if (visible) {
            GiroModalBottomSheet(
                onDismissRequest = { visible = false },
                sheetState = sheetState,
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(24.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    Text("Conteudo do bottom sheet")
                    Text("O app de showcase usa exatamente o wrapper publicado pela biblioteca Compose.")
                }
            }
        }
    }
}
