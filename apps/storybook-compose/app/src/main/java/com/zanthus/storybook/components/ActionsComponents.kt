package com.zanthus.storybook.components

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.airbnb.android.showkase.annotation.ShowkaseComposable

@ShowkaseComposable(name = "Button", group = "Actions")
@Composable
fun ButtonPreview() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Button(onClick = { }) {
            Text("Button")
        }
    }
}

@ShowkaseComposable(name = "OutlinedButton", group = "Actions")
@Composable
fun OutlinedButtonPreview() {
    OutlinedButton(onClick = { }) {
        Text("Outlined Button")
    }
}

@ShowkaseComposable(name = "TextButton", group = "Actions")
@Composable
fun TextButtonPreview() {
    TextButton(onClick = { }) {
        Text("Text Button")
    }
}

@ShowkaseComposable(name = "ElevatedButton", group = "Actions")
@Composable
fun ElevatedButtonPreview() {
    ElevatedButton(onClick = { }) {
        Text("Elevated Button")
    }
}

@ShowkaseComposable(name = "FilledTonalButton", group = "Actions")
@Composable
fun FilledTonalButtonPreview() {
    FilledTonalButton(onClick = { }) {
        Text("Tonal Button")
    }
}

@ShowkaseComposable(name = "All Button Variants", group = "Actions")
@Composable
fun AllButtonsPreview() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Button(onClick = { }) { Text("Button") }
        OutlinedButton(onClick = { }) { Text("Outlined") }
        TextButton(onClick = { }) { Text("Text") }
        ElevatedButton(onClick = { }) { Text("Elevated") }
        FilledTonalButton(onClick = { }) { Text("Tonal") }
    }
}

@ShowkaseComposable(name = "FAB", group = "Actions")
@Composable
fun FABPreview() {
    FloatingActionButton(onClick = { }) {
        Icon(Icons.Default.Add, contentDescription = "Add")
    }
}

@ShowkaseComposable(name = "SmallFAB", group = "Actions")
@Composable
fun SmallFABPreview() {
    SmallFloatingActionButton(onClick = { }) {
        Icon(Icons.Default.Add, contentDescription = "Add")
    }
}

@ShowkaseComposable(name = "LargeFAB", group = "Actions")
@Composable
fun LargeFABPreview() {
    LargeFloatingActionButton(onClick = { }) {
        Icon(Icons.Default.Add, contentDescription = "Add", modifier = Modifier.size(36.dp))
    }
}

@ShowkaseComposable(name = "ExtendedFAB", group = "Actions")
@Composable
fun ExtendedFABPreview() {
    ExtendedFloatingActionButton(
        text = { Text("Create") },
        icon = { Icon(Icons.Default.Add, contentDescription = null) },
        onClick = { }
    )
}

@ShowkaseComposable(name = "IconButton", group = "Actions")
@Composable
fun IconButtonPreview() {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.padding(16.dp)
    ) {
        IconButton(onClick = { }) {
            Icon(Icons.Default.Add, contentDescription = null)
        }
        FilledIconButton(onClick = { }) {
            Icon(Icons.Default.Add, contentDescription = null)
        }
        FilledTonalIconButton(onClick = { }) {
            Icon(Icons.Default.Add, contentDescription = null)
        }
        OutlinedIconButton(onClick = { }) {
            Icon(Icons.Default.Add, contentDescription = null)
        }
    }
}
