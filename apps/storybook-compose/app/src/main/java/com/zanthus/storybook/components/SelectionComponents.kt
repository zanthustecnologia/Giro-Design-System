package com.zanthus.storybook.components

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.airbnb.android.showkase.annotation.ShowkaseComposable

@ShowkaseComposable(name = "Checkbox", group = "Selection")
@Composable
fun CheckboxPreview() {
    var checked by remember { mutableStateOf(true) }
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(16.dp)
    ) {
        Checkbox(
            checked = checked,
            onCheckedChange = { checked = it }
        )
        Text("Checkbox", modifier = Modifier.padding(start = 8.dp))
    }
}

@ShowkaseComposable(name = "Switch", group = "Selection")
@Composable
fun SwitchPreview() {
    var checked by remember { mutableStateOf(true) }
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(16.dp)
    ) {
        Switch(
            checked = checked,
            onCheckedChange = { checked = it }
        )
        Text("Switch", modifier = Modifier.padding(start = 8.dp))
    }
}

@ShowkaseComposable(name = "RadioButton", group = "Selection")
@Composable
fun RadioButtonPreview() {
    var selectedOption by remember { mutableIntStateOf(0) }
    Column(modifier = Modifier.padding(16.dp)) {
        repeat(3) { index ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(vertical = 4.dp)
            ) {
                RadioButton(
                    selected = selectedOption == index,
                    onClick = { selectedOption = index }
                )
                Text("Option ${index + 1}", modifier = Modifier.padding(start = 8.dp))
            }
        }
    }
}

@ShowkaseComposable(name = "Slider", group = "Selection")
@Composable
fun SliderPreview() {
    var sliderValue by remember { mutableFloatStateOf(0.5f) }
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Value: ${(sliderValue * 100).toInt()}%")
        Slider(
            value = sliderValue,
            onValueChange = { sliderValue = it }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "RangeSlider", group = "Selection")
@Composable
fun RangeSliderPreview() {
    var rangeValues by remember { mutableStateOf(0.2f..0.8f) }
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Range: ${(rangeValues.start * 100).toInt()}% - ${(rangeValues.endInclusive * 100).toInt()}%")
        RangeSlider(
            value = rangeValues,
            onValueChange = { rangeValues = it }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "AssistChip", group = "Selection")
@Composable
fun AssistChipPreview() {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.padding(16.dp)
    ) {
        AssistChip(
            onClick = { },
            label = { Text("Assist") }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "FilterChip", group = "Selection")
@Composable
fun FilterChipPreview() {
    var selected by remember { mutableStateOf(false) }
    FilterChip(
        selected = selected,
        onClick = { selected = !selected },
        label = { Text("Filter") },
        leadingIcon = if (selected) {
            { Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(18.dp)) }
        } else null,
        modifier = Modifier.padding(16.dp)
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "InputChip", group = "Selection")
@Composable
fun InputChipPreview() {
    InputChip(
        selected = false,
        onClick = { },
        label = { Text("Input") },
        modifier = Modifier.padding(16.dp)
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "SuggestionChip", group = "Selection")
@Composable
fun SuggestionChipPreview() {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.padding(16.dp)
    ) {
        SuggestionChip(
            onClick = { },
            label = { Text("Suggestion") }
        )
        SuggestionChip(
            onClick = { },
            label = { Text("Option 2") }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "All Chips", group = "Selection")
@Composable
fun AllChipsPreview() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            AssistChip(onClick = { }, label = { Text("Assist") })
            FilterChip(selected = true, onClick = { }, label = { Text("Filter") })
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            InputChip(selected = false, onClick = { }, label = { Text("Input") })
            SuggestionChip(onClick = { }, label = { Text("Suggestion") })
        }
    }
}
