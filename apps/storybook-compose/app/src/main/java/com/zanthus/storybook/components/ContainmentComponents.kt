package com.zanthus.storybook.components

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.airbnb.android.showkase.annotation.ShowkaseComposable

@ShowkaseComposable(name = "Card", group = "Containment")
@Composable
fun CardPreview() {
    Card(modifier = Modifier.padding(16.dp).width(200.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Card Title", style = MaterialTheme.typography.titleLarge)
            Spacer(modifier = Modifier.height(8.dp))
            Text("Card content goes here")
        }
    }
}

@ShowkaseComposable(name = "ElevatedCard", group = "Containment")
@Composable
fun ElevatedCardPreview() {
    ElevatedCard(modifier = Modifier.padding(16.dp).width(200.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Elevated Card", style = MaterialTheme.typography.titleLarge)
            Spacer(modifier = Modifier.height(8.dp))
            Text("Card with elevation")
        }
    }
}

@ShowkaseComposable(name = "OutlinedCard", group = "Containment")
@Composable
fun OutlinedCardPreview() {
    OutlinedCard(modifier = Modifier.padding(16.dp).width(200.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Outlined Card", style = MaterialTheme.typography.titleLarge)
            Spacer(modifier = Modifier.height(8.dp))
            Text("Card with border")
        }
    }
}

@ShowkaseComposable(name = "Divider", group = "Containment")
@Composable
fun DividerPreview() {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Item 1")
        Divider(modifier = Modifier.padding(vertical = 8.dp))
        Text("Item 2")
        Divider(modifier = Modifier.padding(vertical = 8.dp))
        Text("Item 3")
    }
}
