package com.zanthus.storybook.components

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.airbnb.android.showkase.annotation.ShowkaseComposable

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "ListItem", group = "Data Display")
@Composable
fun ListItemPreview() {
    Column(modifier = Modifier.padding(16.dp)) {
        ListItem(
            headlineContent = { Text("Headline") },
            supportingContent = { Text("Supporting text") },
            leadingContent = { Icon(Icons.Default.Person, contentDescription = null) }
        )
        Divider()
        ListItem(
            headlineContent = { Text("Two Line") },
            supportingContent = { Text("Supporting text line 2") }
        )
    }
}

@ShowkaseComposable(name = "Badge", group = "Data Display")
@Composable
fun BadgePreview() {
    Row(
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.padding(16.dp)
    ) {
        BadgedBox(badge = { Badge { Text("3") } }) {
            Icon(Icons.Default.Person, contentDescription = null)
        }
        BadgedBox(badge = { Badge() }) {
            Icon(Icons.Default.Person, contentDescription = null)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "CircularProgressIndicator", group = "Communication")
@Composable
fun CircularProgressIndicatorPreview() {
    Row(
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.padding(16.dp)
    ) {
        CircularProgressIndicator()
        CircularProgressIndicator(progress = 0.7f)
    }
}

@ShowkaseComposable(name = "LinearProgressIndicator", group = "Communication")
@Composable
fun LinearProgressIndicatorPreview() {
    Column(
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.padding(16.dp).width(200.dp)
    ) {
        LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
        LinearProgressIndicator(progress = 0.7f, modifier = Modifier.fillMaxWidth())
    }
}

@ShowkaseComposable(name = "Snackbar", group = "Communication")
@Composable
fun SnackbarPreview() {
    Snackbar(
        action = {
            TextButton(onClick = { }) {
                Text("Action")
            }
        },
        modifier = Modifier.padding(16.dp)
    ) {
        Text("This is a snackbar message")
    }
}

@ShowkaseComposable(name = "AlertDialog", group = "Communication")
@Composable
fun AlertDialogPreview() {
    var showDialog by remember { mutableStateOf(true) }
    
    Column(modifier = Modifier.padding(16.dp)) {
        Button(onClick = { showDialog = true }) {
            Text("Show Dialog")
        }
        
        if (showDialog) {
            AlertDialog(
                onDismissRequest = { showDialog = false },
                title = { Text("Dialog Title") },
                text = { Text("This is the dialog content") },
                confirmButton = {
                    TextButton(onClick = { showDialog = false }) {
                        Text("OK")
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showDialog = false }) {
                        Text("Cancel")
                    }
                }
            )
        }
    }
}
