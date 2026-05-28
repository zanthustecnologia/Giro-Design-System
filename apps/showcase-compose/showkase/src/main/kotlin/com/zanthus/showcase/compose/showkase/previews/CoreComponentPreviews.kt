package com.zanthus.showcase.compose.showkase.previews

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Add
import androidx.compose.material.icons.outlined.CalendarMonth
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.material3.rememberTimePickerState
import androidx.compose.runtime.Composable
import com.airbnb.android.showkase.annotation.ShowkaseComposable
import com.zanthus.components.GiroAssistChip
import com.zanthus.components.GiroBadge
import com.zanthus.components.GiroDatePicker
import com.zanthus.components.GiroDropdownField
import com.zanthus.components.GiroFilledButton
import com.zanthus.components.GiroMenuItem
import com.zanthus.components.GiroNavigationBar
import com.zanthus.components.GiroNavigationBarItem
import com.zanthus.components.GiroOutlinedTextField
import com.zanthus.components.GiroPlainTooltipBox
import com.zanthus.components.GiroTimePicker

@ShowkaseComposable(name = "Filled Button", group = "Actions")
@Composable
fun FilledButtonPreview() {
    GiroFilledButton(onClick = {}) { Text("Salvar") }
}

@ShowkaseComposable(name = "Assist Chip", group = "Selection")
@Composable
fun AssistChipPreview() {
    GiroAssistChip(onClick = {}, label = { Text("Filtro") }, leadingIcon = {
        Icon(Icons.Outlined.Add, contentDescription = null)
    })
}

@ShowkaseComposable(name = "Dropdown Field", group = "Selection")
@Composable
fun DropdownFieldPreview() {
    GiroDropdownField(
        expanded = true,
        onExpandedChange = {},
        value = "Produto",
        label = "Categoria",
    ) {
        GiroMenuItem(text = { Text("Produto") }, onClick = {})
        GiroMenuItem(text = { Text("Clientes") }, onClick = {})
    }
}

@ShowkaseComposable(name = "Outlined Text Field", group = "Input")
@Composable
fun OutlinedTextFieldPreview() {
    GiroOutlinedTextField(value = "design@zanthus.com", onValueChange = {}, label = "Email")
}

@ShowkaseComposable(name = "Date Picker", group = "Input")
@Composable
fun DatePickerPreview() {
    GiroDatePicker(state = rememberDatePickerState())
}

@ShowkaseComposable(name = "Time Picker", group = "Input")
@Composable
fun TimePickerPreview() {
    GiroTimePicker(state = rememberTimePickerState())
}

@ShowkaseComposable(name = "Navigation Bar", group = "Navigation")
@Composable
fun NavigationBarPreview() {
    GiroNavigationBar {
        GiroNavigationBarItem(selected = true, onClick = {}, icon = {
            Icon(Icons.Outlined.CalendarMonth, contentDescription = null)
        }, label = { Text("Inicio") })
        GiroNavigationBarItem(selected = false, onClick = {}, icon = {
            Icon(Icons.Outlined.Info, contentDescription = null)
        }, label = { Text("Alertas") })
    }
}

@ShowkaseComposable(name = "Badge", group = "Data Display")
@Composable
fun BadgePreview() {
    GiroBadge { Text("3") }
}

@ShowkaseComposable(name = "Tooltip", group = "Data Display")
@Composable
fun TooltipPreview() {
    GiroPlainTooltipBox(tooltip = { Text("Ajuda contextual") }) {
        Icon(Icons.Outlined.Info, contentDescription = null)
    }
}