@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.zanthus.showcase.compose.stories.input

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.CalendarMonth
import androidx.compose.material.icons.outlined.Email
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.material3.rememberDateRangePickerState
import androidx.compose.material3.rememberTimePickerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroDatePicker
import com.zanthus.components.GiroDatePickerDialog
import com.zanthus.components.GiroDateRangePicker
import com.zanthus.components.GiroFilledButton
import com.zanthus.components.GiroOutlinedTextField
import com.zanthus.components.GiroTextField
import com.zanthus.components.GiroTimeInput
import com.zanthus.components.GiroTimePicker
import com.zanthus.components.GiroTimePickerDialog
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.model.CatalogStory

fun inputCatalogSection(): CatalogSection = CatalogSection(
    title = "Input",
    description = "Campos de entrada do DS organizados para virar a base dos formularios multiplataforma.",
    stories = listOf(
        CatalogStory("Text Fields", "TextField e OutlinedTextField com API do design system.") { TextFieldsStory() },
        CatalogStory("Date Pickers", "Seletores de data e periodo do Material 3 encapsulados pelo DS.") { DatePickersStory() },
        CatalogStory("Time Pickers", "Seletores de horario e time input com API do design system.") { TimePickersStory() },
    ),
)

@Composable
private fun TextFieldsStory() {
    var email by remember { mutableStateOf("design@zanthus.com") }
    var password by remember { mutableStateOf("") }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp), modifier = Modifier.fillMaxWidth()) {
        GiroTextField(
            value = email,
            onValueChange = { email = it },
            modifier = Modifier.fillMaxWidth(),
            label = "E-mail",
            placeholder = "nome@empresa.com",
            leadingIcon = { Icon(Icons.Outlined.Email, contentDescription = null) },
            singleLine = true,
        )
        GiroOutlinedTextField(
            value = password,
            onValueChange = { password = it },
            modifier = Modifier.fillMaxWidth(),
            label = "Senha",
            placeholder = "Digite sua senha",
            leadingIcon = { Icon(Icons.Outlined.Lock, contentDescription = null) },
            singleLine = true,
        )
    }
}

@Composable
private fun DatePickersStory() {
    val datePickerState = rememberDatePickerState()
    val rangeState = rememberDateRangePickerState()
    var openDialog by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp), modifier = Modifier.fillMaxWidth()) {
        GiroFilledButton(onClick = { openDialog = true }) {
            Icon(Icons.Outlined.CalendarMonth, contentDescription = null)
            Text("Abrir date picker")
        }

        GiroDateRangePicker(state = rangeState, modifier = Modifier.fillMaxWidth())

        if (openDialog) {
            GiroDatePickerDialog(
                onDismissRequest = { openDialog = false },
                confirmButton = {
                    GiroFilledButton(onClick = { openDialog = false }) { Text("Aplicar") }
                },
                dismissButton = {
                    GiroFilledButton(onClick = { openDialog = false }) { Text("Cancelar") }
                },
            ) {
                GiroDatePicker(state = datePickerState)
            }
        }
    }
}

@Composable
private fun TimePickersStory() {
    val timePickerState = rememberTimePickerState()
    var openDialog by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp), modifier = Modifier.fillMaxWidth()) {
        GiroFilledButton(onClick = { openDialog = true }) {
            Text("Abrir time picker")
        }

        GiroTimeInput(state = timePickerState, modifier = Modifier.fillMaxWidth())

        if (openDialog) {
            GiroTimePickerDialog(
                onDismissRequest = { openDialog = false },
                confirmButton = {
                    GiroFilledButton(onClick = { openDialog = false }) { Text("Confirmar") }
                },
                dismissButton = {
                    GiroFilledButton(onClick = { openDialog = false }) { Text("Fechar") }
                },
            ) {
                GiroTimePicker(state = timePickerState)
            }
        }
    }
}
