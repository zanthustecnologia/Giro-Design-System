package com.zanthus.storybook.components

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.airbnb.android.showkase.annotation.ShowkaseComposable

@ShowkaseComposable(name = "TextField", group = "Input")
@Composable
fun TextFieldPreview() {
    var text by remember { mutableStateOf("") }
    TextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Label") },
        modifier = Modifier.padding(16.dp)
    )
}

@ShowkaseComposable(name = "OutlinedTextField", group = "Input")
@Composable
fun OutlinedTextFieldPreview() {
    var text by remember { mutableStateOf("") }
    OutlinedTextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Label") },
        modifier = Modifier.padding(16.dp)
    )
}

@ShowkaseComposable(name = "TextField with Icon", group = "Input")
@Composable
fun TextFieldWithIconPreview() {
    var text by remember { mutableStateOf("") }
    OutlinedTextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Email") },
        leadingIcon = { Icon(Icons.Default.Email, contentDescription = null) },
        modifier = Modifier.padding(16.dp)
    )
}

@ShowkaseComposable(name = "TextField Password", group = "Input")
@Composable
fun TextFieldPasswordPreview() {
    var text by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }
    
    OutlinedTextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Password") },
        visualTransformation = if (passwordVisible) {
            androidx.compose.ui.text.input.VisualTransformation.None
        } else {
            androidx.compose.ui.text.input.PasswordVisualTransformation()
        },
        modifier = Modifier.padding(16.dp)
    )
}
