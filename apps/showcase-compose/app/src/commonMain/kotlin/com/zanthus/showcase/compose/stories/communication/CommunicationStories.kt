package com.zanthus.showcase.compose.stories.communication

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroAlertDialog
import com.zanthus.components.GiroCircularProgressIndicator
import com.zanthus.components.GiroFilledButton
import com.zanthus.components.GiroLinearProgressIndicator
import com.zanthus.components.GiroScaffold
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.model.CatalogStory
import kotlinx.coroutines.launch

fun communicationCatalogSection(): CatalogSection = CatalogSection(
    title = "Communication",
    description = "Feedback, dialogs e progress indicators para estados da interface.",
    stories = listOf(
        CatalogStory("Dialog", "Alert dialog do DS com a mesma base do Material 3.") { DialogStory() },
        CatalogStory("Snackbar", "Fluxo de mensagens temporarias com host centralizado.") { SnackbarStory() },
        CatalogStory("Progress", "Indicadores linear e circular do sistema.") { ProgressStory() },
    ),
)

@Composable
private fun DialogStory() {
    var open by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        GiroFilledButton(onClick = { open = true }) { Text("Abrir dialog") }
        if (open) {
            GiroAlertDialog(
                onDismissRequest = { open = false },
                confirmButton = {
                    GiroFilledButton(onClick = { open = false }) { Text("Confirmar") }
                },
                dismissButton = {
                    GiroFilledButton(onClick = { open = false }) { Text("Fechar") }
                },
                title = { Text("Excluir item") },
                text = { Text("Esta story prova que o showcase consome o componente real da biblioteca.") },
            )
        }
    }
}

@Composable
private fun SnackbarStory() {
    val hostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    GiroScaffold(snackbarHostState = hostState) {
        Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
            GiroFilledButton(
                onClick = {
                    scope.launch {
                        hostState.showSnackbar("Mudanca aplicada no catalogo Compose")
                    }
                },
            ) {
                Text("Mostrar snackbar")
            }
        }
    }
}

@Composable
private fun ProgressStory() {
    FlowRow(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(20.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp),
    ) {
        GiroCircularProgressIndicator()
        GiroLinearProgressIndicator(progress = 0.65f, modifier = Modifier.fillMaxWidth())
    }
}
