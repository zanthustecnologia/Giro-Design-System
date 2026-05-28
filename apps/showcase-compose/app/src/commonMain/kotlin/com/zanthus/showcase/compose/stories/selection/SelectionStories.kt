package com.zanthus.showcase.compose.stories.selection

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Add
import androidx.compose.material.icons.outlined.MoreVert
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroAssistChip
import com.zanthus.components.GiroCheckbox
import com.zanthus.components.GiroDropdownField
import com.zanthus.components.GiroFilterChip
import com.zanthus.components.GiroInputChip
import com.zanthus.components.GiroMenu
import com.zanthus.components.GiroMenuItem
import com.zanthus.components.GiroRadioButton
import com.zanthus.components.GiroRangeSlider
import com.zanthus.components.GiroSlider
import com.zanthus.components.GiroSuggestionChip
import com.zanthus.components.GiroSwitch
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.model.CatalogStory

fun selectionCatalogSection(): CatalogSection = CatalogSection(
    title = "Selection",
    description = "Controles de escolha, chips e seletores nativos encapsulados pelo DS.",
    stories = listOf(
        CatalogStory("Chips", "Assist, filter, input e suggestion chips.") { ChipsStory() },
        CatalogStory("Selection Controls", "Checkbox, radio e switch em uma camada unica do sistema.") { SelectionControlsStory() },
        CatalogStory("Sliders", "Slider simples e de faixa para ajustes progressivos.") { SlidersStory() },
        CatalogStory("Menu & Dropdown", "Menus e dropdowns reais da biblioteca Compose do DS.") { MenuAndDropdownStory() },
    ),
)

@Composable
private fun ChipsStory() {
    var selected by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GiroAssistChip(onClick = {}, label = { Text("Assist") }, leadingIcon = {
                androidx.compose.material3.Icon(Icons.Outlined.Add, contentDescription = null)
            })
            GiroFilterChip(selected = selected, onClick = { selected = !selected }, label = { Text("Filter") })
        }
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GiroInputChip(selected = selected, onClick = { selected = !selected }, label = { Text("Input") })
            GiroSuggestionChip(onClick = {}, label = { Text("Suggestion") })
        }
    }
}

@Composable
private fun SelectionControlsStory() {
    var checked by remember { mutableStateOf(true) }
    var selected by remember { mutableStateOf(false) }
    var switched by remember { mutableStateOf(true) }

    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
        GiroCheckbox(checked = checked, onCheckedChange = { checked = it })
        GiroRadioButton(selected = selected, onClick = { selected = !selected })
        GiroSwitch(checked = switched, onCheckedChange = { switched = it })
    }
}

@Composable
private fun SlidersStory() {
    var sliderValue by remember { mutableFloatStateOf(0.35f) }
    var start by remember { mutableFloatStateOf(0.2f) }
    var end by remember { mutableFloatStateOf(0.8f) }

    Column(verticalArrangement = Arrangement.spacedBy(20.dp), modifier = Modifier.fillMaxWidth()) {
        GiroSlider(value = sliderValue, onValueChange = { sliderValue = it }, modifier = Modifier.fillMaxWidth())
        GiroRangeSlider(
            value = start..end,
            onValueChange = {
                start = it.start
                end = it.endInclusive
            },
            modifier = Modifier.fillMaxWidth(),
        )
    }
}

@Composable
private fun MenuAndDropdownStory() {
    var expanded by remember { mutableStateOf(false) }
    var selectedValue by remember { mutableStateOf("Produto") }

    Column(verticalArrangement = Arrangement.spacedBy(20.dp), modifier = Modifier.fillMaxWidth()) {
        GiroDropdownField(
            expanded = expanded,
            onExpandedChange = { expanded = it },
            value = selectedValue,
            label = "Categoria",
            modifier = Modifier.fillMaxWidth(),
        ) {
            listOf("Produto", "Pedidos", "Clientes").forEach { option ->
                GiroMenuItem(
                    text = { Text(option) },
                    onClick = {
                        selectedValue = option
                        expanded = false
                    },
                )
            }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Text("Menu contextual")
            androidx.compose.material3.IconButton(onClick = { expanded = !expanded }) {
                androidx.compose.material3.Icon(Icons.Outlined.MoreVert, contentDescription = null)
            }
            GiroMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                GiroMenuItem(text = { Text("Editar") }, onClick = { expanded = false })
                GiroMenuItem(text = { Text("Duplicar") }, onClick = { expanded = false })
                GiroMenuItem(text = { Text("Arquivar") }, onClick = { expanded = false })
            }
        }
    }
}
